"use server";

import { neon } from "@neondatabase/serverless";
import crypto from "crypto";

export interface AppointmentInput {
  clientName: string;
  phone: string;
  serviceName: string;
  serviceId?: string;
  date: string;
  time: string;
  notes?: string;
  price?: number;
  branchId?: string;
  category: "treatment" | "consultation";
}

export async function submitAppointment(input: AppointmentInput) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set in environment variables.");
    return {
      success: false,
      error:
        "Database configuration is missing. Please contact clinic support or set DATABASE_URL in environment.",
    };
  }

  try {
    // Normalize DATABASE_URL for the Neon serverless client
    let normalizedUrl = databaseUrl
      .replace(/^postgresql\+asyncpg:\/\//, "postgresql://")
      .trim();
    if (normalizedUrl.endsWith("?")) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }

    const sql = neon(normalizedUrl);

    // 1. Generate unique Appointment ID matching dashboard convention (APT-XXXXXX, 6 hex chars)
    let appointmentId = `APT-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    let idCollision = true;
    let collisionChecks = 0;
    while (idCollision && collisionChecks < 5) {
      try {
        const existing = await sql`
          SELECT id FROM appointments WHERE id = ${appointmentId} LIMIT 1
        `;
        if (existing.length === 0) {
          idCollision = false;
        } else {
          appointmentId = `APT-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
          collisionChecks++;
        }
      } catch {
        idCollision = false;
      }
    }

    // 2. Resolve or Auto-Register Client in clients table
    const rawPhone = (input.phone || "").trim();
    const clientName = (input.clientName || "").trim();
    const phoneDigits = rawPhone.replace(/\D/g, "");
    const searchPhone = phoneDigits.length >= 7 ? phoneDigits.slice(-7) : phoneDigits;

    let clientId = `CLT-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    try {
      if (searchPhone) {
        const foundClient = await sql`
          SELECT id FROM clients 
          WHERE phone LIKE ${"%" + searchPhone + "%"}
          LIMIT 1
        `;
        if (foundClient.length > 0) {
          clientId = foundClient[0].id;
        }
      }

      // If not an existing client, create client record so the dashboard profile links seamlessly
      if (!clientId.startsWith("CLT-") || clientId.length !== 10) {
        clientId = `CLT-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
      }

      const existingCheck = await sql`
        SELECT id FROM clients WHERE id = ${clientId} LIMIT 1
      `;
      if (existingCheck.length === 0) {
        const todayDate = new Date().toISOString().split("T")[0];
        await sql`
          INSERT INTO clients (
            id,
            name,
            phone,
            cnic,
            gender,
            age,
            address,
            assigned_staff_id,
            assigned_staff_name,
            preferred_service,
            total_spent,
            visits_count,
            notes,
            history,
            joined_date,
            branch_id,
            outstanding_balance
          ) VALUES (
            ${clientId},
            ${clientName || "Website Guest"},
            ${rawPhone || "N/A"},
            'N/A',
            'Female',
            25,
            'N/A',
            null,
            null,
            ${input.serviceName || null},
            0,
            0,
            'Auto-registered via website booking',
            '[]'::json,
            ${todayDate},
            ${input.branchId || "BR-001"},
            0
          )
        `;
      }
    } catch (clientErr) {
      console.warn("Client resolution/auto-registration skipped or failed:", clientErr);
    }

    // 3. Resolve Service ID and Price from database if available
    let serviceId = input.serviceId || "SRV-WEB";
    let finalPrice = typeof input.price === "number" ? input.price : 0;

    try {
      if (input.serviceName) {
        const serviceMatch = await sql`
          SELECT id, price FROM services 
          WHERE LOWER(TRIM(name)) = LOWER(TRIM(${input.serviceName}))
          LIMIT 1
        `;
        if (serviceMatch.length > 0) {
          serviceId = serviceMatch[0].id;
          if (finalPrice === 0 && serviceMatch[0].price) {
            finalPrice = Number(serviceMatch[0].price);
          }
        }
      }
    } catch (srvErr) {
      console.warn("Service lookup skipped:", srvErr);
    }

    // Default staff is "ST-001" ("Default Staff") as used in the clinic working panel
    const staffId = "ST-001";
    const staffName = "Default Staff";
    const status = "Pending";
    const reminderStatus = "Pending";
    const paymentStatus = "Unpaid";
    const branchId = input.branchId || "BR-001";

    // 4. Insert into the appointments table
    await sql`
      INSERT INTO appointments (
        id,
        client_id,
        client_name,
        phone,
        service_id,
        service_name,
        staff_id,
        staff_name,
        date,
        time,
        status,
        reminder_status,
        notes,
        price,
        branch_id,
        category,
        payment_status,
        transaction_id
      ) VALUES (
        ${appointmentId},
        ${clientId},
        ${clientName},
        ${rawPhone},
        ${serviceId},
        ${input.serviceName},
        ${staffId},
        ${staffName},
        ${input.date},
        ${input.time},
        ${status},
        ${reminderStatus},
        ${input.notes || null},
        ${finalPrice},
        ${branchId},
        ${input.category || "treatment"},
        ${paymentStatus},
        null
      )
    `;

    // 5. Also push a notification into the working panel's notifications table
    try {
      const notifId = `NOT-APT-${Date.now()}`;
      const nowStr = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      await sql`
        INSERT INTO notifications (
          id,
          title,
          message,
          time,
          type,
          read
        ) VALUES (
          ${notifId},
          ${`New Online Booking: ${clientName}`},
          ${`${input.serviceName} booked for ${input.date} at ${input.time}. Phone: ${rawPhone}`},
          ${nowStr},
          'appointment',
          false
        )
      `;
    } catch (notifErr) {
      console.warn("Could not insert panel notification:", notifErr);
    }

    return {
      success: true,
      appointmentId,
    };
  } catch (error: any) {
    console.error("Database insertion failed:", error);
    return {
      success: false,
      error:
        error.message ||
        "An unexpected error occurred while saving the appointment.",
    };
  }
}

"use server";

import { neon } from "@neondatabase/serverless";

export interface AppointmentInput {
  clientName: string;
  phone: string;
  serviceName: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
  price: number;
  branchId?: string;
  category: "treatment" | "consultation";
}

export async function submitAppointment(input: AppointmentInput) {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error("DATABASE_URL is not set in environment variables.");
    return {
      success: false,
      error: "Database configuration is missing. Please contact clinic support or set DATABASE_URL in environment.",
    };
  }

  try {
    // Normalize DATABASE_URL for the Neon serverless client (replace postgresql+asyncpg with postgresql)
    const normalizedUrl = databaseUrl.replace(/^postgresql\+asyncpg:\/\//, "postgresql://");
    const sql = neon(normalizedUrl);

    // Fetch the highest existing appointment ID matching 'APT-%' to increment sequentially
    let appointmentId = "APT-1001";
    try {
      const highestApt = await sql`
        SELECT id FROM appointments 
        WHERE id LIKE 'APT-%' 
        ORDER BY id DESC 
        LIMIT 1
      `;
      if (highestApt.length > 0) {
        const match = highestApt[0].id.match(/^APT-(\d+)$/);
        if (match) {
          const num = parseInt(match[1], 10);
          appointmentId = `APT-${num + 1}`;
        }
      }
    } catch (dbError) {
      console.warn("Could not query highest appointment ID, using default APT-1001", dbError);
    }

    const clientId = `guest_${Math.random().toString(36).substring(2, 9)}`;
    const staffId = "unassigned";
    const staffName = "Any Available Staff";
    const status = "Pending";
    const reminderStatus = "Pending";

    // Insert into the database
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
        category
      ) VALUES (
        ${appointmentId},
        ${clientId},
        ${input.clientName},
        ${input.phone},
        ${input.serviceId},
        ${input.serviceName},
        ${staffId},
        ${staffName},
        ${input.date},
        ${input.time},
        ${status},
        ${reminderStatus},
        ${input.notes || null},
        ${input.price},
        ${input.branchId || null},
        ${input.category}
      )
    `;

    return { success: true };
  } catch (error: any) {
    console.error("Database insertion failed:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred while saving the appointment.",
    };
  }
}

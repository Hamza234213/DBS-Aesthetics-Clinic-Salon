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

    // Generate a unique appointment ID and a guest client ID
    const appointmentId = `apt_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
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

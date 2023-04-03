import connection from "../config/database.js";

async function create(date, doctorId) {
  return await connection.query(
    `
        INSERT INTO appointments (date, "doctorId") VALUES ($1, $2)
        `,
    [date, doctorId]
  );
}

async function confirmed(appointmentId) {
  return await connection.query(
    `
        UPDATE appointments SET status = 'confirmada' WHERE id=$1
        `,
    [appointmentId]
  );
}

async function canceled(appointmentId) {
  return await connection.query(
    `
        UPDATE appointments SET status = 'cancelada' WHERE id=$1
        `,
    [appointmentId]
  );
}

async function selectAll({ doctor, specialty, date, status }) {
  return await connection.query(
    `
        SELECT appointments *, doctor.name AS doctor, doctor.specialty 
        FROM appointments JOIN doctors ON appointments."doctorId 
        WHERE status = "pendente" AND (doctor.name = $1) 
        AND (doctors.specialty = $2)
        AND (appointments.date = $3)
        AND (appointments.status = $4)
        ORDER BY appointments.id ASC;
        `,
    [doctor, specialty, date, status]
  );
}

async function selectAppointmentsPatient({ patientId, status }) {
  return await connection.query(
    `
        SELECT appointments *, patients.name AS patient, doctors.name AS doctor, doctors.specialty, patient.name 
        FROM appointments JOIN doctors ON appointments."doctorId 
        JOIN patients ON appointments."patientId
        WHERE appointments."patientId" = $1 
        AND status = $2 
        ORDER BY appointments.id ASC;
        `[(patientId, status)]
  );
}

async function selectAppointmentsDoctor(doctorId, status) {
  return await connection.query(
    `
        SELECT appointments *, patients.name AS patient, doctors.name AS doctor, doctors.specialty 
        FROM appointments JOIN doctors ON appointments."doctorId 
        JOIN patients ON appointments."patientId
        WHERE appointments."doctorId" = $1 
        AND status = $2 
        ORDER BY appointments.id ASC;
        `[(doctorId, status)]
  );
}

export default {
  create,
  confirmed,
  canceled,
  selectAll,
  selectAppointmentsPatient,
  selectAppointmentsDoctor,
};

import appointmentsRepository from "../repositories/appointmentsRepository.js";

async function create(date, doctorId) {
  const { rows: appointment } = await appointmentsRepository.findById({
    date,
    doctorId,
  });
  if (appointment) throw new Error("Esse horário já está em uso");

  await appointmentsRepository.create({ date, doctorId });
}

async function confirmed({ appointmentId }) {
  const { rowCount, rows: appointment } = await appointmentsRepository.findById(
    appointmentId
  );
  if (!rowCount) {
    throw new Error("Não existe consulta marcada para os dados informados");
  }
  if (
    appointment.status === "confirmada" ||
    appointment.status === "pendente"
  ) {
    throw new Error("Consulta confirmada");
  }
  if (appointment.status === "cancelada") {
    throw new Error("A consulta foi cancelada");
  }
  if (appointment.status === "concluida") {
    throw new Error("A consulta já foi realizada");
  }
  await appointmentsRepository.confirmed({ appointmentId });
}

async function canceled({ appointmentId }) {
  const { rowCount, rows: appointment } = await appointmentsRepository.findById(
    appointmentId
  );
  if (!rowCount) {
    throw new Error("Não existe consulta marcada para os dados informados");
  }
  /*       if (
        appointment.status === "confirmada" ||
        appointment.status === "pendente"
      ) {
        throw new Error("Consulta confirmada");
      } */
  if (appointment.status === "cancelada") {
    throw new Error("A consulta foi cancelada");
  }
  if (appointment.status === "concluida") {
    throw new Error("A consulta já foi realizada");
  }
  await appointmentsRepository.confirmed({ appointmentId });
}

async function selectAll({ doctor, specialty, date, status }) {
  const { rows: appointments } = await appointmentsRepository.selectAll({
    doctor,
    specialty,
    date,
    status,
  });
  return appointments;
}

async function selectAppointmentsPatient(patientId, status) {
  const { rows: appointments } =
    await appointmentsRepository.selectAppointmentsPatient({
      patientId,
      status,
    });
  return appointments;
}

async function selectAppointmentsDoctor(doctorId, status) {
  const { rows: appointments } =
    await appointmentsRepository.selectAppointmentsDoctor({ doctorId, status });
  return appointments;
}

export default {
  create,
  confirmed,
  canceled,
  selectAll,
  selectAppointmentsPatient,
  selectAppointmentsDoctor,
};

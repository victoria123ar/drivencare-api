import appointmentsService from "../services/appointmentsService.js";

async function create(req, res, next) {
  const { date } = req.body;

  const { id } = res.locals.userDoctor;

  try {
    await appointmentsService.create({ date, doctorId: id });
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function confirmed(req, res, next) {
  const { appointmentId } = req?.params;

  try {
    await appointmentsService.confirmed({ appointmentId });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function canceled(req, res, next) {
  const { appointmentId } = req?.params;

  try {
    await appointmentsService.canceled({ appointmentId });
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

async function selectAll(req, res, next) {
  const { doctor, specialty, date, status } = req.query;

  try {
    const appointments = await appointmentsService.selectAll({
      doctor,
      specialty,
      date,
      status,
    });
    return res.send(appointments)
  } catch (error) {
    next(error);
  }
}

async function selectAppointmentsPatient(req, res, next) {
  const { id } = res.locals.userPatient;
  const { status } = req.query;

  try {
    const appointments = await appointmentsService.selectAppointmentsPatient({
      patientId: id,
      status,
    });
    return res.send(appointments);
  } catch (error) {
    next(error);
  }
}

async function selectAppointmentsDoctor(req, res, next) {
  const { id } = res.locals.userDoctor;
  const { status } = req.query;

  try {
    const appointments = await appointmentsService.selectAppointmentsDoctor({
      doctorId: id,
      status,
    });
    return res.send(appointments);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  confirmed,
  canceled,
  selectAll,
  selectAppointmentsPatient,
  selectAppointmentsDoctor,
};

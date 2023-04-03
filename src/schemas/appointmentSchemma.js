import joi from "joi";

export const appointmentSchemma = joi.object({
  patientID: joi.number(),
  doctorID: joi.number(),
  date: joi.date().formate('YYYY-MM-DDTHH:mm:ss').required(),
  status: joi.string().required(),
});
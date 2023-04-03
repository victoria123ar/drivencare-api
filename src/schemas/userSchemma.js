import joi from "joi";

export const patientSchemma = joi.object({
  name: joi.string().min(10).max(50).required(),
  cpf: joi.string().min(11).max(11).regex(/[0-9]{11}/).required(),
  dateOfBirth: joi.date().iso().messages({ "date.format": `Date format is YYYY-MM-DD` }).required(),
  phone: joi.string().regex(/^[0-9]+$/)
  .min(10)
  .max(11).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
    password: joi
    .string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*_-]{6,30}$/)
    .required(),
});

export const doctorSchemma = joi.object({
  name: joi.string().min(10).max(50).required(),
  specialty: joi.string().min(5).required(),
  location: joi.string().min(5).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
    password: joi
    .string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*_-]{6,30}$/)
    .required(),
});
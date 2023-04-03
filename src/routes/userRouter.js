import { Router } from "express";
import userController from "../controllers/userController.js";
import {validateSchema} from "../middlewares/schemmaValidationMiddleware.js";
import { doctorSchemma, patientSchemma } from "../schemas/userSchemma.js";

const userRoutes = Router();

userRoutes.post('/signup-patients', validateSchema(patientSchemma) , userController.signupPatients)
userRoutes.post('/signup-doctors', validateSchema(doctorSchemma) , userController.signupDoctors)
userRoutes.post("/signin-patients", userController.signinPatients)
userRoutes.post("/signin-doctors", userController.signinDoctors)

export default userRoutes;
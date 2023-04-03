import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js"
import { appointmentSchemma } from "../schemas/appointmentSchemma.js";
import appointmentsController from "../controllers/appointmentsController.js";

const bookRoutes = Router();

bookRoutes.post("/",validateSchema(appointmentSchemma));
bookRoutes.get("/appointments-history",validateSchema(appointmentSchemma));

export default bookRoutes;
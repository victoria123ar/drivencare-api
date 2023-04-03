import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRouter from "./routes/userRouter.js"

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`));

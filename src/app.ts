import express, { json } from "express";
import helmet from "helmet";
import { categoryRouter } from "./routes/categories.routes";
import { tasksRouter } from "./routes/tasks.routes";

export const app = express();

const PORT = 3000;

app.use(helmet())

app.use(json());

app.use("/categories", categoryRouter);
app.use("/tasks", tasksRouter);

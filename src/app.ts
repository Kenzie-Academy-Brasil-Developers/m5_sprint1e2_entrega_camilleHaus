import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { categoryRouter } from "./routes/categories.routes";
import { tasksRouter } from "./routes/tasks.routes";
import { HandleErros } from "./middleware/handleErrors";

export const app = express();

const PORT = 3000;

app.use(helmet())

app.use(json());

app.use("/tasks", tasksRouter);
app.use("/categories", categoryRouter);

app.use(HandleErros.execute);

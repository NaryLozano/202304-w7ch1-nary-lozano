import "../loadEnvironments.js";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import robotsRouter from "../routers/robots/robotsRouters.js";
import {
  genericError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";
import auth from "../middlewares/authMiddleware.js";
import usersRouters from "../routers/users/usersRouters.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://202304-w7ch1-tirmary-reyes-front.netlify.app/",
  "https://202304-w7ch1-nary-lozano-front.netlify.app/",
];
const app = express();

app.use(cors({ origin: allowedOrigins }));

app.disable("x-powered-by");

app.use(morgan("combined"));
app.use(express.json());

app.use("/login", usersRouters);
app.use("/robots", auth, robotsRouter);

app.use(notFoundError);
app.use(genericError);

export default app;

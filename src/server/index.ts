import express from "express";
import morgan from "morgan";
import robotsRouter from "../routers/robots/robotsRouters.js";
import {
  genericError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";
import auth from "../middlewares/authMiddleware.js";
import usersRouters from "../routers/users/usersRouters.js";

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.disable("x-powered-by");

app.use(morgan("combined"));
app.use(express.json());

app.use("/robots", auth, robotsRouter);
app.use("/login", usersRouters);

app.use(notFoundError);
app.use(genericError);

export default app;

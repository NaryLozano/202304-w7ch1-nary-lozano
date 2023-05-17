import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controllers/users/usersControllers.js";
import loginSchema from "../../schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  "/",
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;

import { Router } from "express";
import { loginUser } from "../../controllers/users/usersControllers.js";

const userRouter = Router();

userRouter.post("/", loginUser);

export default userRouter;

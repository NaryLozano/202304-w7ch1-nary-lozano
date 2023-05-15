import "../../loadEnvironments.js";
import { type NextFunction, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jsw, { type JwtPayload } from "jsonwebtoken";
import User from "../../database/models/Users.js";
import RobotError from "../../routers/RobotError.js";

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export const loginUser = async (
  req: UserCredentialsRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const authError = new RobotError(401, "Wrong Credentials");
      throw authError;
    }

    const tokenpayload: JwtPayload = {
      sub: user._id.toString(),
      name: user.username,
    };
    const token = jsw.sign(tokenpayload, process.env.JWS_SECRET2!);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

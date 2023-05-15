import { type Request, type Response, type NextFunction } from "express";
import jsw from "jsonwebtoken";
import RobotError from "../routers/RobotError.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.header("Authorization");
  try {
    if (!authHeader?.includes("Bearer ")) {
      const authError = new RobotError(401, "Missing token");
      throw authError;
    }

    const token = authHeader.replace("Bearer ", "");
    jsw.verify(token, process.env.JWS_SECRET!);
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;

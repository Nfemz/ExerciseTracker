import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { RequestWithMiddleware } from "../types/auth.types";

export const jwtSecret = "j9NAF4jgd5M973bvshlay3AHDUPA42j6";

export const authenticateJWT = (
  req: RequestWithMiddleware,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];

    jwt.verify(token, jwtSecret, (error, user) => {
      if (error) {
        return res.status(403).send(error.message);
      }

      req["user"] = user;
      next();
    });
  } else {
    return res.sendStatus(401);
  }
};

import { Request } from "express";

export interface RequestWithMiddleware extends Request {
  user?: any;
}

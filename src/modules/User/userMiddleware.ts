import { Request, Response } from "express";

export class UserMiddleware {
  constructor() {}
  public signUp = async (req: Request, res: Response, next: any) => {
    try {
      next();
    } catch (error) {
      console.log(error);
    }
  };
}

import chatModel from "../model/chat.model";
import { Request, Response, NextFunction } from "express";

export async function getChat(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await chatModel.find({});
    return res.status(200).json({
      response: "success",
      message: "success",
      data: data,
    });
  } catch (err: any) {
    next(err);
  }
}

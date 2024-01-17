import express, { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as database from "../users/user.database";

export const userRouter = express.Router();

userRouter.get("/users", async (req: Request, res: Response) => {
  try {
    const allUsers: any = await database.loadUsers();
    if (!allUsers) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `No users at this time..` });
    }
    return res.status(StatusCodes.OK).json({ status: 200, data: allUsers });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
});

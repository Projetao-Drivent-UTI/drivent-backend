import authenticationService, { SignInParams } from "@/services/authentication-service";
import axios from "axios";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function githubSignin(req: Request, res: Response) {
  const { code } = req.body;

  try {
    const result = await authenticationService.getGitHubToken(code);
    return res.status(httpStatus.OK).send(result);  
  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

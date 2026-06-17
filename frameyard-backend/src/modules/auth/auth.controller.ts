import { Request, Response } from "express";
import { getProfile, loginUser, registerUser, updateProfile } from "./auth.service";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const register = async (
  req: Request,
  res: Response
) => {
  const result = await registerUser(req.body);

  return res.status(200).json(result);
};

export const login = async (
  req: Request,
  res: Response
) => {
  const result = await loginUser(req.body);

  return res.status(200).json(result);
};

export const profile = async (
  req: AuthRequest,
  res: Response
) => {
  const result = await getProfile(
    req.user!.id
  );

  return res.status(200).json(result);
};

export const updateUserProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const result = await updateProfile(
    req.user!.id,
    req.body
  );

  return res.status(200).json(result);
};
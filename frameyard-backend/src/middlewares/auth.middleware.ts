import { Request, Response, NextFunction } from "express";
import { User } from "@supabase/supabase-js";
import { supabase } from "../config/supabase";

export interface AuthRequest extends Request {
  user?: User;
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access token missing",
    });
  }

  const token = authHeader.replace("Bearer ", "");

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  req.user = user;

  next();
};
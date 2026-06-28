// customer.controller.ts

import { Request, Response } from "express";
import { getAllCustomers, getCustomerById } from "./customer.service";

export const getCustomerDetails = async (
  req: Request,
  res: Response
) => {

  const id = String(req.params.id);
  const customer =
    await getCustomerById(id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }

  return res.status(200).json({
    success: true,
    customer,
  });
};

export const getCustomers = async (
  req: Request,
  res: Response
) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await getAllCustomers(
    page,
    limit
  );

  return res.status(200).json({
    success: true,
    ...result,
  });
};;

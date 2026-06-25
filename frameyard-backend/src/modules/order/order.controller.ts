import { AuthRequest } from "../../middlewares/auth.middleware";
import { createOrder, getAllOrders, getMyOrders, getOrderById, updateOrderStatus } from "./order.service";
import { Response } from "express";

export const checkout = async (
  req: AuthRequest,
  res: Response
) => {
  const result =await createOrder(req.user!.id);
  return res.status(200).json(result);
};

export const fetchMyOrders =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const result =await getMyOrders(req.user!.id);
    return res.status(200).json(result);
};
export const fetchOrderById =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    const result =await getOrderById(String(req.params.id),req.user!.id);
    return res.status(200).json(result);
};

export const fetchAllOrders = async (
  req: AuthRequest,
  res: Response
) => {

  const result =
    await getAllOrders();

  return res.status(200).json(result);
};
export const changeOrderStatus = async (
  req: AuthRequest,
  res: Response
) => {

  const result =
    await updateOrderStatus(
      String(req.params.id),
      req.body.orderStatus
    );

  return res.status(200).json(result);
};
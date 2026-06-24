// customer.controller.ts

import { Request, Response } from "express";
import { getAllCustomers } from "./customer.service";

export const getCustomers = async (
    req: Request,
    res: Response
) => {
    const result = await getAllCustomers();

    return res.status(200).json({
        success: true,
        data: result,
    });
};
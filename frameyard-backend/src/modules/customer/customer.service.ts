// customer.service.ts

import prisma from "../../config/prisma";

export const getAllCustomers = async () => {
    return await prisma.user.findMany({
        where: {
            role: "CUSTOMER",
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            orders: {
                select: {
                    id: true,
                    orderStatus: true,
                    totalAmount: true,
                    createdAt: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
};
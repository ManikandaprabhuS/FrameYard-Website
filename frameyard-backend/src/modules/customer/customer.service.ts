import prisma from "../../config/prisma";

export const getAllCustomers = async (
  page: number = 1,
  limit: number = 10
) => {

  const skip = (page - 1) * limit;

  const [customers, total] = await Promise.all([
    prisma.user.findMany({
      where: {
        role: "CUSTOMER",
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
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
    }),

    prisma.user.count({
      where: {
        role: "CUSTOMER",
      },
    }),
  ]);

  return {
    customers,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getCustomerById = async (
  customerId: string
) => {

  const customer =
    await prisma.user.findFirst({
      where: {
        id: customerId,
        role: "CUSTOMER",
      },
      include: {
        orders: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            orderItems: true,
          },
        },
      },
    });

  return customer;
};
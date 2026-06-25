
import prisma from "../../config/prisma";

export const createOrder = async (
  userId: string
) => {

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User not found",
    };
  }
if (user.role !== "CUSTOMER") {
  return {
    success: false,
    message: "Only customers can place orders",
  };
}
  if (
    !user.phoneNumber ||
    !user.addressLine ||
    !user.postalCode ||
    !user.cityName ||
    !user.stateName ||
    !user.countryName
  ) {
    return {
      success: false,
      message: "Please complete your profile before placing an order",
    };
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      cartItems: {
        include: {
          variant: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart || cart.cartItems.length === 0) {
    return {
      success: false,
      message: "Cart is empty",
    };
  }

  let totalAmount = 0;

  for (const item of cart.cartItems) {

    if (
      item.quantity >
      item.variant.stockQuantity
    ) {
      return {
        success: false,
        message: `Insufficient stock for ${item.variant.product.name}`,
      };
    }

    const price = Number(
      item.variant.offerPrice ??
      item.variant.price
    );

    totalAmount +=
      price * item.quantity;
  }
  const orderNumber = `FY-${Date.now().toString().slice(-8)}`;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      orderNumber,
      totalAmount,
      phoneNumber: user.phoneNumber,
      addressLine: user.addressLine,
      postalCode: user.postalCode,
      cityName: user.cityName,
      stateName: user.stateName,
      countryName: user.countryName,
    },
  });

  for (const item of cart.cartItems) {

    const price = Number(
      item.variant.offerPrice ??
      item.variant.price
    );

    const subtotal =
      price * item.quantity;

    await prisma.orderItem.create({
      data: {
        orderId: order.id,
        productId:
          item.variant.product.id,
        variantId:
          item.variant.id,
        productName:
          item.variant.product.name,
        frameSize:
          item.variant.frameSize,
        mountType:
          item.variant.mountType,
        glassType:
          item.variant.glassType,
        price,
        quantity:
          item.quantity,
        subtotal,
      },
    });

    await prisma.productVariant.update({
      where: {
        id: item.variant.id,
      },
      data: {
        stockQuantity: {
          decrement:
            item.quantity,
        },
      },
    });
  }

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  return {
    success: true,
    message: "Order placed successfully",
    orderId: order.id,
    orderNumber: order.orderNumber,
  };
};

export const getMyOrders = async (
  userId: string
) => {

  const orders =
    await prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        orderItems: true,
      },
    });

  return {
    success: true,
    orders,
  };
};

export const getOrderById = async (
  orderId: string,
  userId: string
) => {

  const order =
    await prisma.order.findFirst({
      where: {
        id: orderId,
        userId,
      },
      include: {
        orderItems: true,
      },
    });

  if (!order) {
    return {
      success: false,
      message: "Order not found",
    };
  }

  return {
    success: true,
    order,
  };
};

export const getAllOrders = async () => {
  const orders =
    await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phoneNumber: true,
          },
        },
        orderItems: true,
      },
    });

  return {
    success: true,
    orders,
  };
};

export const updateOrderStatus = async (
  orderId: string,
  orderStatus: string
) => {

  const order =
    await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

  if (!order) {
    return {
      success: false,
      message: "Order not found",
    };
  }

  const updatedOrder =
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        orderStatus: orderStatus as any,
      },
    });

  return {
    success: true,
    message: "Order status updated",
    order: updatedOrder,
  };
};
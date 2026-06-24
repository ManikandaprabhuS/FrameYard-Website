import prisma from "../../config/prisma";

export const getAllProducts = async () => {

  const products =
    await prisma.product.findMany({
      include: {
        variants: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });

  return {
    success: true,
    products,
  };
};

export const getProductById = async (
  productId: string
) => {

  const product =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        variants: true,
        images: true,
      },
    });

  if (!product) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  return {
    success: true,
    product,
  };
};

export const createProduct = async (
  data: any
) => {

  const product = await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      material: data.material,
      availableColors: data.availableColors
    }
  });

  return {
    success: true,
    message: "Product created successfully",
    product
  };
};

export const createVariant = async (
  productId: string,
  data: any
) => {

  const existingProduct =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

  if (!existingProduct) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  const variant =
    await prisma.productVariant.create({
      data: {
        productId,
        frameSize: data.frameSize,
        hasBorder: data.hasBorder,
        hasGlass: data.hasGlass,
        price: data.price,
        offerPrice: data.offerPrice,
        stockQuantity: data.stockQuantity,
        priceValidUntil: data.priceValidUntil,
      },
    });

  return {
    success: true,
    message: "Variant created successfully",
    variant,
  };
};

export const updateProduct = async (
  productId: string,
  data: any
) => {

  const existingProduct =
    await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

  if (!existingProduct) {
    return {
      success: false,
      message: "Product not found",
    };
  }

  const product =
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: data.name,
        description: data.description,
        material: data.material,
        availableColors: data.availableColors,
        isActive: data.isActive,
      },
      include: {
        variants: true,
        images: true,
      },
    });

  return {
    success: true,
    message: "Product updated successfully",
    product,
  };
};

export const updateVariant = async (
  variantId: string,
  data: any
) => {

  const existingVariant =
    await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
    });

  if (!existingVariant) {
    return {
      success: false,
      message: "Variant not found",
    };
  }

  const variant =
    await prisma.productVariant.update({
      where: {
        id: variantId,
      },
      data: {
        frameSize: data.frameSize,
        hasBorder: data.hasBorder,
        hasGlass: data.hasGlass,
        price: data.price,
        offerPrice: data.offerPrice,
        stockQuantity: data.stockQuantity,
        priceValidUntil: data.priceValidUntil,
      },
    });

  return {
    success: true,
    message: "Variant updated successfully",
    variant,
  };
};

export const deleteVariant = async (
  variantId: string
) => {

  const existingVariant =
    await prisma.productVariant.findUnique({
      where: {
        id: variantId,
      },
    });

  if (!existingVariant) {
    return {
      success: false,
      message: "Variant not found",
    };
  }

  await prisma.productVariant.delete({
    where: {
      id: variantId,
    },
  });

  return {
    success: true,
    message: "Variant deleted successfully",
  };
};

export const getInventoryForExport = async () => {
  return await prisma.product.findMany({
    include: {
      variants: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
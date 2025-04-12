import { db } from "../../prisma/prisma";

export async function getProduct(productId: number) {
    const response = await db.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (!response) {
        return null;
    }

    return response;
}

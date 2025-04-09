import { db } from "../../prisma/prisma";

export async function getProductsCategory(category: string) {
    const menuCategory = await db.menuCategory.findFirst({
        where: {
            name: category,
        },

        include: {
            products: true,
        },
    });

    return menuCategory?.products ?? [];
}

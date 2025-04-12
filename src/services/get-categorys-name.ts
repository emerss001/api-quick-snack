import { db } from "../../prisma/prisma";

export async function getCategorysNames() {
    const categorysNames = await db.menuCategory.findMany({
        select: {
            name: true,
        },
    });

    return categorysNames ?? [];
}

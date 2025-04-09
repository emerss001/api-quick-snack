import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getProductsCategory } from "../services/get-products-category";

export const getProductsByCategory: FastifyPluginAsyncZod = async (app) => {
    console.log("🔁 Rota de produtos por categoria registrada");

    app.get(
        "/products/category/:category",
        {
            schema: {
                params: z.object({
                    category: z.string(),
                }),
                response: {
                    200: z.object({
                        products: z.array(
                            z.object({
                                id: z.number(),
                                name: z.string(),
                                description: z.string(),
                                price: z.number(),
                                imageUrl: z.string(),
                                ingredients: z.array(z.string()),
                                createdAt: z.date(),
                                updatedAt: z.date(),
                                menuCategoryId: z.number(),
                            })
                        ),
                    }),
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { category } = request.params;

            const products = await getProductsCategory(category);
            if (!products || products.length === 0) {
                return reply.status(404).send({
                    message: "Category not found",
                });
            }

            return reply.status(200).send({ products });
        }
    );
};

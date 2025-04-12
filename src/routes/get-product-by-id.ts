import { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { getProduct } from "../services/get-product";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const getProductById: FastifyPluginAsyncZod = async (app) => {
    console.log("🔁 Rota de produtos");

    app.get(
        "/products/:productId",
        {
            schema: {
                params: z.object({
                    productId: z.coerce.number(),
                }),
                response: {
                    200: z.object({
                        name: z.string(),
                        id: z.number(),
                        createdAt: z.date(),
                        updatedAt: z.date(),
                        description: z.string(),
                        price: z.number(),
                        imageUrl: z.string(),
                        ingredients: z.array(z.string()),
                        menuCategoryId: z.number(),
                    }),
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { productId } = request.params;
            const product = await getProduct(productId);

            if (!product) {
                return reply.status(404).send({
                    message: "Product not found",
                });
            }

            return reply.status(200).send(product);
        }
    );
};

import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getCategorysNames } from "../services/get-categorys-name";

export const getCategoryNamesRoute: FastifyPluginAsyncZod = async (app) => {
    app.get(
        "/categories",
        {
            schema: {
                response: {
                    200: z.object({
                        categorysNames: z.array(z.object({ name: z.string() })),
                    }),
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const categorysNames = await getCategorysNames();

            if (!categorysNames || categorysNames.length === 0) {
                return reply.status(404).send({
                    message: "No categories found",
                });
            }

            return reply.status(200).send({ categorysNames });
        }
    );
};

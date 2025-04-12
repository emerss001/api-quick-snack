import Fastify from "fastify";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { getProductsByCategory } from "./routes/get-products-by-category";
import { getCategoryNamesRoute } from "./routes/get-category-names";
import fastifyCors from "@fastify/cors";
import { getProductById } from "./routes/get-product-by-id";

const app = Fastify({
    // logger: true,
}).withTypeProvider<ZodTypeProvider>();
app.register(fastifyCors, {
    origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// routes by application
app.register(getProductsByCategory);
app.register(getCategoryNamesRoute);
app.register(getProductById);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});

import { GraphQLServer } from "graphql-yoga";
import { importSchema } from "graphql-import";
import { resolvers } from "./graphql/resolvers";
import * as path from "path";
import { createTypeORMConnection } from "./utils/createTypeORMConnection";

export const server = async () => {
  const typeDefs = importSchema(
    path.join(__dirname, "./graphql/schema.graphql")
  );
  const server = new GraphQLServer({ typeDefs, resolvers });
  await createTypeORMConnection();
  const app = await server.start({
    port: process.env.NODE_ENV === "test" ? 0 : process.env.PORT,
  });
  console.log(
    `Server is running on localhost:${
      process.env.NODE_ENV === "test" ? 0 : process.env.PORT
    }`
  );
  return app;
};

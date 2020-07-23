import { ResolverMap } from "../types/graphql";
import { User } from "../entity/User";

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments) =>
      `Hello ${name || "World"}`,
  },
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ) => {
      const user = User.create({ email, password });
      await user.save();
      return true;
    },
  },
};

import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { TweetResolver } from "./resolvers/TweetResolver";
import { FollowResolver } from "./resolvers/FollowResolver";
import { User } from "./entity/User";
import rest from "./rest";

async function getCurrentUser() {
  let user = await User.findOne({ name: "mewtru" });
  if (!user) {
    user = User.create({
      name: "mewtru",
    });
    await user.save();
  }
  return user;
}

async function main() {
  await createConnection();
  const currentUser = await getCurrentUser();

  const schema = await buildSchema({
    resolvers: [UserResolver, TweetResolver, FollowResolver],
    emitSchemaFile: true,
  });

  const app = express();
  app.use(bodyParser.json());
  app.use("/api", rest(currentUser));

  const server = new ApolloServer({
    schema,
    playground: true,
    context: () => ({ user: currentUser }),
  });

  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(`Twitter Backend is running`);
  });
}

main();

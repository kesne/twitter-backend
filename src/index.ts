import "reflect-metadata";
import { createConnection, In } from "typeorm";
import { ApolloServer } from 'apollo-server';
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/TestResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { TweetResolver } from "./resolvers/TweetResolver";
import { FollowResolver } from "./resolvers/FollowResolver";

async function main() {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [TestResolver, UserResolver, TweetResolver, FollowResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
    playground: true,
  });

  // Start the server
  const { url } = await server.listen(4000);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

}

main();

// createConnection()
//   .then(async (connection) => {
//     const [mewtru, vapejuicejim] = await User.find();

//     await vapejuicejim.follow(mewtru);

// const usersForTimeline = await Follow.find({
//   where: {
//     fromUser: user,
//   },
//   relations: ["toUser"],
// });

// console.log(
//   await Tweet.find({
//     where: {
// 	  user: In(usersForTimeline.map((follow) => follow.toUser.id)),
// 	  type: In([TweetType.NONE, TweetType.RETWEET])
//     },
//   })
// );

//   const follow = Follow.create({
// 	  fromUser: users[0],
// 	  toUser: users[1]
//   });

//   follow.save();
//   const user = await User.create({ name: 'vapejuicejim' }).save();
//   const tweet = await Tweet.create({ text: 'I love TypeScript.', user }).save();

// const user = await User.findOneOrFail({});
// const tweet = await Tweet.findOneOrFail({});

// const reply = await Tweet.create({
// 	type: TweetType.RETWEET,
// 	parent: tweet,
// 	user,
// }).save();

// const tweets = await Tweet.find({
//   type: In([TweetType.NONE, TweetType.RETWEET]),
// });

// console.log(await tweets);

// await reply.save();
// })
// .catch((error) => console.log(error));

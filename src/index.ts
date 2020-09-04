import "reflect-metadata";
import { createConnection, In } from "typeorm";
import { User } from "./entity/User";
import { Tweet, TweetType } from "./entity/Tweet";
import { Favorite } from "./entity/Favorite";
import { Follow } from "./entity/Follow";

createConnection()
  .then(async (connection) => {
	const [mewtru, vapejuicejim] = await User.find();

	await vapejuicejim.follow(mewtru);

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
  })
  .catch((error) => console.log(error));

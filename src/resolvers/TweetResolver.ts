import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Tweet, TweetType } from "../entity/Tweet";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { In } from "typeorm";

@Resolver()
export class TweetResolver {
  @Query(() => [Tweet])
  async timeline() {
    const user = await User.findOneOrFail(1);
    const usersForTimeline = await Follow.find({
      where: {
        fromUser: user,
      },
      relations: ["toUser"],
    });

    const tweets = await Tweet.find({
      where: {
        user: In(usersForTimeline.map((follow) => follow.toUser.id)),
        type: In([TweetType.NONE, TweetType.RETWEET]),
      },
    });
    return tweets;
  }

  @Mutation(() => Tweet)
  async createTweet(@Arg("text") text: string) {
    const tweet = Tweet.create({
      text,
      user: await User.findOneOrFail(1),
    });

    await tweet.save();

    return tweet;
  }
}

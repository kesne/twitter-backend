import { Resolver, Arg, Mutation, Ctx } from "type-graphql";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";
import { Context } from "../types";

@Resolver()
export class FollowResolver {
  @Mutation(() => Follow)
  async followUser(@Arg("user") toUserName: string, @Ctx() { user }: Context) {
    const toUser = await User.findOne({ where: { name: toUserName } });

    const follow = Follow.create({ fromUser: user, toUser });
    await follow.save();

    return follow;
  }
}

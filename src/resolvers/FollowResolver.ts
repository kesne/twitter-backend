import { Resolver, Arg, Mutation } from "type-graphql";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";

@Resolver()
export class FollowResolver {
  @Mutation(() => Follow)
  async followUser(@Arg("user") user: string) {
	const toUser = await User.findOne({where: {name: user}});
	const fromUser = await User.findOne({where: {id: 1}});

	const follow = Follow.create({fromUser, toUser})
	await follow.save();

	return follow;
  }
}

import {Resolver, Query, Arg, FieldResolver} from "type-graphql";
import { User } from "../entity/User";
import { Follow } from "../entity/Follow";

@Resolver(() => User)
export class UserResolver {
	@Query(() => [User])
	async users() {
		return await User.find({});
	}

	@Query(() => User)
	async user(@Arg('id') id: string) {
		return await User.findOne(id);
	}

	@FieldResolver(() => [User])
	async following() {
		const user = await User.findOne(1);

		const follows =  await Follow.find({
			where: {
				fromUser: user
			},
			relations: ['toUser']
		});

		return follows.map(follow => follow.toUser);
	}


	@FieldResolver(() => [User])
	async followers() {
		const user = await User.findOne(1);

		const follows =  await Follow.find({
			where: {
				toUser: user
			},
			relations: ['fromUser']
		});

		return follows.map(follow => follow.fromUser);
	}

}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Tweet } from "./Tweet";
import { Lazy } from "../types";
import { Favorite } from "./Favorite";
import { Follow } from "./Follow";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ unique: true })
  name!: string;

  @Field(() => [Tweet])
  @OneToMany(() => Tweet, (tweet) => tweet.user, { lazy: true })
  tweets!: Lazy<Tweet[]>;

  @OneToMany(() => Favorite, (favorite) => favorite.user, { lazy: true })
  favorites!: Lazy<Favorite[]>;

  @OneToMany(() => Follow, (follow) => follow.toUser, { lazy: true })
  followers!: Lazy<Follow[]>;

  @OneToMany(() => Follow, (follow) => follow.fromUser, { lazy: true })
  following!: Lazy<Follow[]>;

  follow(user: User) {
    const follow = Follow.create({
      fromUser: this,
      toUser: user,
    });

    return follow.save();
  }
}

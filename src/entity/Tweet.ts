import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  RelationCount,
} from "typeorm";
import { User } from "./User";
import { Lazy } from "../types";
import { Favorite } from "./Favorite";
import { ObjectType, Field, ID, registerEnumType, Int } from "type-graphql";

export enum TweetType {
  NONE,
  RETWEET,
  REPLY,
}

registerEnumType(TweetType, {
  name: "TweetType",
});

@ObjectType()
@Entity()
export class Tweet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  text?: string;

  @Field(() => TweetType)
  @Column("int", { default: TweetType.NONE })
  type!: TweetType;

  @ManyToOne(() => Tweet, (tweet) => tweet.children, {
    nullable: true,
    lazy: true,
  })
  parent?: Lazy<Tweet>;

  @OneToMany(() => Tweet, (tweet) => tweet.parent, { lazy: true })
  children!: Lazy<Tweet[]>;

  @Field(() => Date)
  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "datetime" })
  updatedAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tweets, { lazy: true })
  user!: Lazy<User>;

  @OneToMany(() => Favorite, (favorite) => favorite.tweet, { lazy: true })
  favorites!: Lazy<Favorite[]>;

  @Field(() => Int)
  @RelationCount("favorites")
  favoritesCount!: number;
}

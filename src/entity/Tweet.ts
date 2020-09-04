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

export enum TweetType {
  NONE,
  RETWEET,
  REPLY,
}

@Entity()
export class Tweet extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  text?: string;

  @Column("int", { default: TweetType.NONE })
  type!: TweetType;

  @ManyToOne(() => Tweet, (tweet) => tweet.children, { nullable: true, lazy: true })
  parent?: Lazy<Tweet>;

  @OneToMany(() => Tweet, (tweet) => tweet.parent, { lazy: true })
  children!: Lazy<Tweet[]>;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "datetime" })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.tweets, { lazy: true })
  user!: Lazy<User>;

  @OneToMany(() => Favorite, (favorite) => favorite.tweet, { lazy: true })
  favorites!: Lazy<Favorite[]>;

  @RelationCount("favorites")
  favoritesCount!: number;
}

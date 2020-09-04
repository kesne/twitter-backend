import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, CreateDateColumn, Unique} from "typeorm";
import { Tweet } from "./Tweet";
import { Lazy } from "../types";
import { User } from "./User";

@Entity()
@Unique(['user', 'tweet'])
export class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn({ type: 'datetime' })
	createdAt!: Date;

    @ManyToOne(() => User, (user) =>user.favorites, {lazy: true })
	user!: Lazy<User>;

    @ManyToOne(() => Tweet, (tweet) => tweet.favorites, {lazy: true })
    tweet!: Lazy<Tweet>;
}

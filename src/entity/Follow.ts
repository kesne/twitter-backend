import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  Unique,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { Lazy } from "../types";
import { User } from "./User";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
@Unique(["fromUser", "toUser"])
export class Follow extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.following)
  fromUser!: User;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.followers)
  toUser!: User;

  @BeforeInsert()
  async noFollowSelf() {
    if ((await this.fromUser).id === (await this.toUser).id) {
      throw new Error("You cannot follow yourself");
    }
  }
}

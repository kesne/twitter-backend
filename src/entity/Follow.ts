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

@Entity()
@Unique(["fromUser", "toUser"])
export class Follow extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn({ type: "datetime" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.following)
  fromUser!: User;

  @ManyToOne(() => User, (user) => user.followers)
  toUser!: User;

  @BeforeInsert()
  async noFollowSelf() {
    if ((await this.fromUser).id === (await this.toUser).id) {
      throw new Error("You cannot follow yourself");
    }
  }
}

import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  BaseEntity,
} from "typeorm";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcryptjs";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @BeforeInsert()
  addId() {
    this.id = uuid();
  }

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password);
  }
}

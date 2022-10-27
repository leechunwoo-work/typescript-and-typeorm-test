import { Entity, Column, ManyToOne } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Character extends DefaultEntity {
  @Column() exprience: number;

  @Column() type: number;

  @ManyToOne(() => User, user => user.characters, { nullable: false })
  user: User;
}

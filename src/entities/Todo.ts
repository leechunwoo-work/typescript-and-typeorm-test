import { Entity, Column, ManyToMany } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Todo extends DefaultEntity {
  @Column() context: string;

  @Column() category: string;

  @Column() exprience: number;

  @Column({ default: false }) isCompleted: boolean;

  @ManyToMany(() => User, user => user.todos) users: User[];
}

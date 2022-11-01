import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { Character } from './Character';
import { Todo } from './Todo';

@Entity()
export class User extends DefaultEntity {
  @Column({ length: 16 }) loginId: string;

  @Column({ length: 64, nullable: true }) password: string;

  @Column({ nullable: true }) email: string;

  @Column({ length: 16 }) name: string;

  @Column({ length: 16 }) nickname: string;

  @Column({ length: 163, nullable: true, unique: true }) pushToken: string;

  @Column({ length: 7, nullable: true }) os: string;

  @Column() authenticationType: number;

  @Column() authenticationLevel: number;

  @Column({ default: 0 }) newNotificationCount: number;

  @Column({ default: true }) isChallengeNotificationEnabled: boolean;

  @Column({ default: true }) isUltrafineDustNotificationEnabled: boolean;

  @OneToMany(() => Character, character => character.user)
  characters: Character[];

  @ManyToMany(() => Todo, todo => todo.users, { cascade: true })
  @JoinTable()
  todos: Todo[];
}

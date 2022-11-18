import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { Todo, Character, Bookmark, Notification } from './';

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

  @OneToMany(() => Bookmark, bookmark => bookmark.user)
  bookmarks: Bookmark[];

  @OneToMany(() => Notification, notification => notification.user)
  notifications: Notification[];

  @ManyToMany(() => Todo, { cascade: true })
  @JoinTable()
  todos: Todo[];
}

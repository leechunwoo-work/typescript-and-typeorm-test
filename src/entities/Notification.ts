import { Entity, Column, ManyToOne } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Notification extends DefaultEntity {
  @Column() context: string;

  @Column({ default: false }) isDeleted: boolean;

  @Column({ default: false }) isRead: boolean;

  @ManyToOne(() => User, user => user.notifications)
  user: User;
}

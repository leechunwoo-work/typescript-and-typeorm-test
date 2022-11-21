import { Entity, Column, ManyToOne } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Notification extends DefaultEntity {
  // 알림 내용
  @Column() context: string;

  // 삭제 여부
  @Column({ default: false }) isDeleted: boolean;

  // 읽음 여부
  @Column({ default: false }) isRead: boolean;

  @ManyToOne(() => User, user => user.notifications)
  user: User;
}

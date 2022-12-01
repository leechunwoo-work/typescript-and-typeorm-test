import { Entity, Column, ManyToOne } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Notification extends DefaultEntity {
    // 알림 내용
    @Column('varchar') context: string;

    // 읽음 여부
    @Column('boolean', { default: false }) isRead: boolean;

    @ManyToOne(() => User, user => user.notifications)
    user: User;
}

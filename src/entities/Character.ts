import { Entity, Column, ManyToOne } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './User';

@Entity()
export class Character extends DefaultEntity {
  // 누적 경험치
  @Column('int', { default: 0 }) experience: number;

  // 캐릭터 종류 (미정)
  @Column('int') type: number;

  @ManyToOne(() => User, user => user.characters, { nullable: false })
  user: User;
}

import { Entity, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User_Character } from './';

@Entity()
export class Character extends DefaultEntity {
  // 누적 경험치
  @Column('int', { default: 0 }) experience: number;

  // 캐릭터 종류 (미정)
  @Column('int') type: number;

  @OneToMany(() => User_Character, user_character => user_character.user) users: User_Character[];
}

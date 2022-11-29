import { Entity, Column, OneToMany } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User, User_Character } from './';

@Entity()
export class Character extends DefaultEntity {
  // 이름
  @Column('varchar') name: string;

  // 레벨당 최대 경험치
  @Column('simple-array') levelMaxExperience: number[];

  // 캐릭터 종류 (미정)
  @Column('int') type: number;

  @OneToMany(() => User_Character, user_character => user_character.user) user_characters: User_Character[];
}

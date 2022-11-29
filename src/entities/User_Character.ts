import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User, Character } from './';

@Entity()
export class User_Character extends DefaultEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.user_characters)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  characterId: number;

  @ManyToOne(() => Character, character => character.user_characters)
  @JoinColumn({ name: 'characterId' })
  character: Character;

  // 누적 경험치
  @Column('int', { default: 0 })
  experience: number;

  // 대표 캐릭터 여부
  @Column('boolean', { default: false })
  isRepresent: boolean;
}

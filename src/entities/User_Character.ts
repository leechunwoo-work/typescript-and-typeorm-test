import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User, Character } from './';

@Entity()
export class User_Character extends DefaultEntity {
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, user => user.characters)
  @JoinColumn({ name: 'userId' })
  user: User;

  @PrimaryColumn()
  characterId: number;

  @ManyToOne(() => Character, character => character.users)
  @JoinColumn({ name: 'characterId' })
  character: Character;

  @Column()
  experience: number;
}

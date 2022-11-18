import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './Abstract';

@Entity()
export class Todo extends DefaultEntity {
  @Column() context: string;

  @Column() category: string;

  @Column() experience: number;

  @Column({ default: false }) isCompleted: boolean;
}

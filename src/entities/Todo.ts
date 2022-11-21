import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './Abstract';

@Entity()
export class Todo extends DefaultEntity {
  // 내용
  @Column() context: string;

  // 카테고리
  @Column() category: string;

  // 완료시 획득 경험치
  @Column({ default: 0 }) experience: number;

  // 사용하고 있는 유저 수
  @Column({ default: 0 }) useCount: number;

  // 완료 여부
  @Column({ default: false }) isCompleted: boolean;
}

import { Entity, Column } from 'typeorm';
import { DefaultEntity } from './Abstract';

@Entity()
export class Todo extends DefaultEntity {
  // 내용
  @Column('varchar') context: string;

  // 카테고리
  @Column('varchar') category: string;

  // 완료시 획득 경험치
  @Column('int', { default: 0 }) experience: number;

  // 사용하고 있는 유저 수
  @Column('int', { default: 0 }) useCount: number;

  // 완료 여부
  @Column('boolean', { default: false }) isCompleted: boolean;

  // 추천 여부
  @Column('boolean', { default: false }) isRecommended: boolean;
}

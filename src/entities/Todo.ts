import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { DefaultEntity } from './Abstract';
import { User } from './';

@Entity()
export class Todo extends DefaultEntity {
    // 내용
    @Column('varchar')
    context: string;

    // 카테고리
    @Column('varchar')
    category: string;

    // 완료시 획득 경험치
    @Column('int', { default: 0 })
    experience: number;

    // 사용하고 있는 유저 수
    @Column('int', { default: 0 })
    useCount: number;

    // 완료 여부
    @Column('boolean', { default: false })
    isCompleted: boolean;

    // 추천 여부
    @Column('boolean', { default: false })
    isRecommended: boolean;

    // 하나의 Todo는 여러 유저를 가질 수 있다.
    @ManyToMany(() => User)
    @JoinTable({ name: 'user_todo' })
    users: User[];
}

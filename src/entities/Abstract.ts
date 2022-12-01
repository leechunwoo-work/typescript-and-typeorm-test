import { DeleteDateColumn, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class DefaultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

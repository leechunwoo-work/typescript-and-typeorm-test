import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTodoTable1669099827949 implements MigrationInterface {
    name = 'updateTodoTable1669099827949'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "isRecommended" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "isRecommended"`);
    }

}

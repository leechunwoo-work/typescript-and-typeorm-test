import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUsercharacterTable1669774627440 implements MigrationInterface {
    name = 'updateUsercharacterTable1669774627440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_character" ADD "isRepresent" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "user_character" DROP COLUMN "isRepresent"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserCharacterTable1669687771976 implements MigrationInterface {
    name = 'updateUserCharacterTable1669687771976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "character" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "character" ADD "levelMaxExperience" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "levelMaxExperience"`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "character" ADD "experience" integer NOT NULL DEFAULT '0'`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDatabase1669686413557 implements MigrationInterface {
    name = 'updateDatabase1669686413557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_04c2fb52adfa5265763de8c4464"`);
        await queryRunner.query(`ALTER TABLE "user_character" RENAME COLUMN "anyOtherColumnYouWant" TO "experience"`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "user_character" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "user_character" ADD "experience" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_character" DROP COLUMN "experience"`);
        await queryRunner.query(`ALTER TABLE "user_character" ADD "experience" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "character" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_character" RENAME COLUMN "experience" TO "anyOtherColumnYouWant"`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_04c2fb52adfa5265763de8c4464" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

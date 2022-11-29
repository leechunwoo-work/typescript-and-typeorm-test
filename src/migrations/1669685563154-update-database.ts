import { MigrationInterface, QueryRunner } from "typeorm";

export class updateDatabase1669685563154 implements MigrationInterface {
    name = 'updateDatabase1669685563154'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "character" DROP CONSTRAINT "FK_04c2fb52adfa5265763de8c4464"`);
        await queryRunner.query(`CREATE TABLE "user_character" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" integer NOT NULL, "characterId" integer NOT NULL, "anyOtherColumnYouWant" character varying NOT NULL, CONSTRAINT "PK_b1960c1d3a4776fab7981bb405a" PRIMARY KEY ("id", "userId", "characterId"))`);
        await queryRunner.query(`ALTER TABLE "character" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "bookmark" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "user_character" ADD CONSTRAINT "FK_62b9afb2f4cd125742f99ae7027" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_character" ADD CONSTRAINT "FK_7ce08a433374e9edbe16528e657" FOREIGN KEY ("characterId") REFERENCES "character"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_character" DROP CONSTRAINT "FK_7ce08a433374e9edbe16528e657"`);
        await queryRunner.query(`ALTER TABLE "user_character" DROP CONSTRAINT "FK_62b9afb2f4cd125742f99ae7027"`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bookmark" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "character" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_character"`);
        await queryRunner.query(`ALTER TABLE "character" ADD CONSTRAINT "FK_04c2fb52adfa5265763de8c4464" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}

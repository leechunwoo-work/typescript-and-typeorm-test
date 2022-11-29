import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserCharacterTable1669691425723 implements MigrationInterface {
    name = 'updateUserCharacterTable1669691425723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
        await queryRunner.query(`ALTER TABLE "user_character" ALTER COLUMN "experience" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_character" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

}

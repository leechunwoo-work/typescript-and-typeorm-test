import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserCharacterTable1669696781563 implements MigrationInterface {
    name = 'updateUserCharacterTable1669696781563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

}

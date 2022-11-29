import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserCharacterTable1669697310456 implements MigrationInterface {
    name = 'updateUserCharacterTable1669697310456'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

}

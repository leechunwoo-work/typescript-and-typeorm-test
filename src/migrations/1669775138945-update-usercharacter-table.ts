import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUsercharacterTable1669775138945 implements MigrationInterface {
    name = 'updateUsercharacterTable1669775138945'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bookmark" ALTER COLUMN "geoPoint" TYPE point`);
    }

}

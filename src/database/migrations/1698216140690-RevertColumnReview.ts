import { MigrationInterface, QueryRunner } from "typeorm";

export class RevertColumnReview1698216140690 implements MigrationInterface {
    name = 'RevertColumnReview1698216140690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD \`order_detail_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP COLUMN \`order_detail_id\``);
    }

}

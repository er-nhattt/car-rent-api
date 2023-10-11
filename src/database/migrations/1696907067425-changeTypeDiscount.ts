import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeDiscount1696907067425 implements MigrationInterface {
    name = 'ChangeTypeDiscount1696907067425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discount\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discount\` varchar(255) NULL`);
    }

}

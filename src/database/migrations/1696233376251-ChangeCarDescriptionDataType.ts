import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCarDescriptionDataType1696233376251 implements MigrationInterface {
    name = 'ChangeCarDescriptionDataType1696233376251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_languages\` DROP COLUMN \`car_description\``);
        await queryRunner.query(`ALTER TABLE \`car_languages\` ADD \`car_description\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`car_languages\` DROP COLUMN \`car_description\``);
        await queryRunner.query(`ALTER TABLE \`car_languages\` ADD \`car_description\` varchar(255) NULL`);
    }

}

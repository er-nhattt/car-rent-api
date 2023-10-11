import { MigrationInterface, QueryRunner } from "typeorm";

export class DropColumnPyamentMethodType1696840920455 implements MigrationInterface {
    name = 'DropColumnPyamentMethodType1696840920455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`payment_method_type\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`payment_method_type\` varchar(255) NULL`);
    }

}

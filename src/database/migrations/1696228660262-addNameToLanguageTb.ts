import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNameToLanguageTb1696228660262 implements MigrationInterface {
    name = 'AddNameToLanguageTb1696228660262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`languages\` ADD \`name\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`languages\` DROP COLUMN \`name\``);
    }

}

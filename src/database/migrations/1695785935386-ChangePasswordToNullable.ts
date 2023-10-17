import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangePasswordToNullable1695785935386 implements MigrationInterface {
    name = 'ChangePasswordToNullable1695785935386'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`hashed_password\` \`hashed_password\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`hashed_password\` \`hashed_password\` varchar(255) NOT NULL`);
    }

}

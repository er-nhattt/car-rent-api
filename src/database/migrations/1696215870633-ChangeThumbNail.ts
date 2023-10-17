import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeThumbNail1696215870633 implements MigrationInterface {
    name = 'ChangeThumbNail1696215870633'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`thumbnailUrl\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`thumbnail_url\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`old_price\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`old_price\` float NULL`);
        await queryRunner.query(`DROP INDEX \`idx_cars_new_price\` ON \`cars\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`new_price\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`new_price\` float NULL`);
        await queryRunner.query(`CREATE INDEX \`idx_cars_new_price\` ON \`cars\` (\`new_price\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_cars_new_price\` ON \`cars\``);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`new_price\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`new_price\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`idx_cars_new_price\` ON \`cars\` (\`new_price\`)`);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`old_price\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`old_price\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` DROP COLUMN \`thumbnail_url\``);
        await queryRunner.query(`ALTER TABLE \`cars\` ADD \`thumbnailUrl\` varchar(255) NOT NULL`);
    }

}

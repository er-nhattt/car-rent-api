import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeColumnInReviewTable1698205721567 implements MigrationInterface {
    name = 'ChangeColumnInReviewTable1698205721567'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`order_detail_id\` \`car_id\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`car_id\` \`order_detail_id\` int NULL`);
    }

}

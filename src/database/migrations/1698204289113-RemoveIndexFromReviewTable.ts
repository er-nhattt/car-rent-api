import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveIndexFromReviewTable1698204289113 implements MigrationInterface {
    name = 'RemoveIndexFromReviewTable1698204289113'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`idx_reviews_order_detail_id\` ON \`reviews\``);
        await queryRunner.query(`DROP INDEX \`idx_reviews_user_id\` ON \`reviews\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX \`idx_reviews_user_id\` ON \`reviews\` (\`user_id\`)`);
        await queryRunner.query(`CREATE INDEX \`idx_reviews_order_detail_id\` ON \`reviews\` (\`order_detail_id\`)`);
    }

}

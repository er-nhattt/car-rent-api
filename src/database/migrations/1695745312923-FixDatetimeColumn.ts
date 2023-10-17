import { MigrationInterface, QueryRunner } from "typeorm";

export class FixDatetimeColumn1695745312923 implements MigrationInterface {
    name = 'FixDatetimeColumn1695745312923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`createdAt\` \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`promos\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_types\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_car_types\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cars\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`images\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_type_languages\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`favourites\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order-details\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cities\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`car_cities\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payment_methods\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`updatedAt\` \`updatedAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`createdAt\` \`createdAt\` timestamp(0) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tokens\` CHANGE \`deletedAt\` \`deletedAt\` timestamp(0) NOT NULL`);
    }

}

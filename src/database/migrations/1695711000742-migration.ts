import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1695711000742 implements MigrationInterface {
  name = 'Migration1695711000742';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tokens\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`payment_methods\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`code\` varchar(255) NULL, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`car_id\` int NULL, \`pick_up_city_id\` int NULL, \`drop_off_city_id\` int NULL, INDEX \`idx_car_cities_car_id\` (\`car_id\`), INDEX \`idx_car_cities_pick_up_city_id\` (\`pick_up_city_id\`), INDEX \`idx_car_cities_drop_off_city_id\` (\`drop_off_city_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cities\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`name\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`reviews\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`user_id\` int NULL, \`order_detail_id\` int NULL, \`content\` text NULL, \`rating\` tinyint NULL, INDEX \`idx_reviews_user_id\` (\`user_id\`), INDEX \`idx_reviews_order_detail_id\` (\`order_detail_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order-details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`order_id\` int NULL, \`car_id\` int NULL, \`pick_up_city_id\` int NULL, \`drop_off_city_id\` int NULL, \`pick_up_at\` datetime NULL, \`drop_off_at\` datetime NULL, \`price\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`user_id\` int NOT NULL, \`order_name\` varchar(255) NULL, \`order_address\` varchar(255) NULL, \`order_phone_number\` varchar(255) NULL, \`order_city\` varchar(255) NULL, \`promo_code\` varchar(255) NULL, \`promo_type\` varchar(255) NULL, \`discount\` varchar(255) NULL, \`payment_method_code\` varchar(255) NULL, \`payment_method_type\` varchar(255) NULL, \`total_price\` int NULL, \`status\` enum ('inProgress', 'paid', 'unPaid') NULL, INDEX \`idx_orders_user_id\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`username\` varchar(255) NOT NULL, \`avatar_url\` varchar(255) NULL, \`first_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`email\` varchar(255) NULL, \`hashed_password\` varchar(255) NOT NULL, UNIQUE INDEX \`idx_users_username\` (\`username\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`favourites\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`user_id\` int NULL, \`car_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_type_languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`language_code\` varchar(255) NULL, \`car_type_id\` int NULL, \`car_type_name\` varchar(255) NULL, INDEX \`idx_car_type_languages_car_type_name\` (\`car_type_name\`), INDEX \`idx_car_type_languages_languages_code_car_type_id\` (\`language_code\`, \`car_type_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`code\` varchar(255) NULL, UNIQUE INDEX \`idx_languages_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_languages\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`language_code\` varchar(255) NULL, \`car_id\` int NULL, \`car_name\` varchar(255) NULL, \`car_description\` varchar(255) NULL, \`steering\` enum ('manual', 'auto', 'electric', 'hybrid') NULL, INDEX \`idx_car_languages_car_name\` (\`car_name\`), INDEX \`idx_car_languages_language_code_car_id\` (\`language_code\`, \`car_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`images\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`object_id\` int NULL, \`url\` varchar(255) NULL, \`object_type\` varchar(255) NULL, INDEX \`idx_images_object_id_object_type\` (\`object_id\`, \`object_type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`cars\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`thumbnailUrl\` varchar(255) NOT NULL, \`capacity\` int NULL, \`gasoline\` int NULL, \`old_price\` int NULL, \`new_price\` int NULL, \`avg_rating\` float NULL, \`total_reviewer\` int NULL, INDEX \`idx_cars_capacity\` (\`capacity\`), INDEX \`idx_cars_new_price\` (\`new_price\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_car_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`car_id\` int NULL, \`car_type_id\` int NULL, INDEX \`idx_car_car_types_car_id\` (\`car_id\`), INDEX \`idx_car_car_types_car_type_id\` (\`car_type_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`car_types\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`promos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp NOT NULL, \`updatedAt\` timestamp NOT NULL, \`deletedAt\` timestamp NOT NULL, \`code\` varchar(255) NULL, \`type\` enum ('absolute', 'percentage') NULL, \`discount\` float NULL, \`quantity\` int NULL, INDEX \`idx_promos_code\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX \`idx_promos_code\` ON \`promos\``);
    await queryRunner.query(`DROP TABLE \`promos\``);
    await queryRunner.query(`DROP TABLE \`car_types\``);
    await queryRunner.query(
      `DROP INDEX \`idx_car_car_types_car_type_id\` ON \`car_car_types\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_car_car_types_car_id\` ON \`car_car_types\``,
    );
    await queryRunner.query(`DROP TABLE \`car_car_types\``);
    await queryRunner.query(`DROP INDEX \`idx_cars_new_price\` ON \`cars\``);
    await queryRunner.query(`DROP INDEX \`idx_cars_capacity\` ON \`cars\``);
    await queryRunner.query(`DROP TABLE \`cars\``);
    await queryRunner.query(
      `DROP INDEX \`idx_images_object_id_object_type\` ON \`images\``,
    );
    await queryRunner.query(`DROP TABLE \`images\``);
    await queryRunner.query(
      `DROP INDEX \`idx_car_languages_language_code_car_id\` ON \`car_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_car_languages_car_name\` ON \`car_languages\``,
    );
    await queryRunner.query(`DROP TABLE \`car_languages\``);
    await queryRunner.query(
      `DROP INDEX \`idx_languages_code\` ON \`languages\``,
    );
    await queryRunner.query(`DROP TABLE \`languages\``);
    await queryRunner.query(
      `DROP INDEX \`idx_car_type_languages_languages_code_car_type_id\` ON \`car_type_languages\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_car_type_languages_car_type_name\` ON \`car_type_languages\``,
    );
    await queryRunner.query(`DROP TABLE \`car_type_languages\``);
    await queryRunner.query(`DROP TABLE \`favourites\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``,
    );
    await queryRunner.query(`DROP INDEX \`idx_users_username\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP INDEX \`idx_orders_user_id\` ON \`orders\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`order-details\``);
    await queryRunner.query(
      `DROP INDEX \`idx_reviews_order_detail_id\` ON \`reviews\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_reviews_user_id\` ON \`reviews\``,
    );
    await queryRunner.query(`DROP TABLE \`reviews\``);
    await queryRunner.query(`DROP TABLE \`cities\``);
    await queryRunner.query(
      `DROP INDEX \`idx_car_cities_drop_off_city_id\` ON \`car_cities\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_car_cities_pick_up_city_id\` ON \`car_cities\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_car_cities_car_id\` ON \`car_cities\``,
    );
    await queryRunner.query(`DROP TABLE \`car_cities\``);
    await queryRunner.query(`DROP TABLE \`payment_methods\``);
    await queryRunner.query(`DROP TABLE \`tokens\``);
  }
}

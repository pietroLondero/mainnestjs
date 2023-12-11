import { MigrationInterface, QueryRunner } from "typeorm";

export class Bootstrap1702035928206 implements MigrationInterface {
    name = 'Bootstrap1702035928206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), UNIQUE INDEX \`IDX_ee999bb389d7ac0fd967172c41\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`parentId\` int NULL, UNIQUE INDEX \`IDX_8a45300fd825918f3b40195fbd\` (\`name\`), UNIQUE INDEX \`IDX_b5759f9b6fd2e375e906b9abb8\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_2ac8bd2785d91b8abeffa2d6d2\` (\`title\`), UNIQUE INDEX \`IDX_edf95ce9d000453ec028f02bf5\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` text NOT NULL, \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`user_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`group_roles\` (\`roleId\` int NOT NULL, \`groupId\` int NOT NULL, INDEX \`IDX_69f84cc2625ddd7555de6ee745\` (\`roleId\`), INDEX \`IDX_2b5f930e296a7d2bf3b14e59f4\` (\`groupId\`), PRIMARY KEY (\`roleId\`, \`groupId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_groups\` (\`userId\` bigint NOT NULL, \`groupId\` int NOT NULL, INDEX \`IDX_99d01ff7f143377c044f3d6c95\` (\`userId\`), INDEX \`IDX_4dcea3f5c6f04650517d9dc475\` (\`groupId\`), PRIMARY KEY (\`userId\`, \`groupId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post_categories\` (\`postId\` int NOT NULL, \`postCategoryId\` int NOT NULL, INDEX \`IDX_d9837aecaf223e3cadb55fed67\` (\`postId\`), INDEX \`IDX_d9cada24c100ba724c8145fb6f\` (\`postCategoryId\`), PRIMARY KEY (\`postId\`, \`postCategoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`group\` ADD CONSTRAINT \`FK_105c4fcefc250c0e90f3677993b\` FOREIGN KEY (\`parentId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_52378a74ae3724bcab44036645b\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`group_roles\` ADD CONSTRAINT \`FK_69f84cc2625ddd7555de6ee7458\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`group_roles\` ADD CONSTRAINT \`FK_2b5f930e296a7d2bf3b14e59f42\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_99d01ff7f143377c044f3d6c955\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_groups\` ADD CONSTRAINT \`FK_4dcea3f5c6f04650517d9dc4750\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post_categories\` ADD CONSTRAINT \`FK_d9837aecaf223e3cadb55fed677\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`post_categories\` ADD CONSTRAINT \`FK_d9cada24c100ba724c8145fb6fc\` FOREIGN KEY (\`postCategoryId\`) REFERENCES \`post_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post_categories\` DROP FOREIGN KEY \`FK_d9cada24c100ba724c8145fb6fc\``);
        await queryRunner.query(`ALTER TABLE \`post_categories\` DROP FOREIGN KEY \`FK_d9837aecaf223e3cadb55fed677\``);
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_4dcea3f5c6f04650517d9dc4750\``);
        await queryRunner.query(`ALTER TABLE \`user_groups\` DROP FOREIGN KEY \`FK_99d01ff7f143377c044f3d6c955\``);
        await queryRunner.query(`ALTER TABLE \`group_roles\` DROP FOREIGN KEY \`FK_2b5f930e296a7d2bf3b14e59f42\``);
        await queryRunner.query(`ALTER TABLE \`group_roles\` DROP FOREIGN KEY \`FK_69f84cc2625ddd7555de6ee7458\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_52378a74ae3724bcab44036645b\``);
        await queryRunner.query(`ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_105c4fcefc250c0e90f3677993b\``);
        await queryRunner.query(`DROP INDEX \`IDX_d9cada24c100ba724c8145fb6f\` ON \`post_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_d9837aecaf223e3cadb55fed67\` ON \`post_categories\``);
        await queryRunner.query(`DROP TABLE \`post_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_4dcea3f5c6f04650517d9dc475\` ON \`user_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_99d01ff7f143377c044f3d6c95\` ON \`user_groups\``);
        await queryRunner.query(`DROP TABLE \`user_groups\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b5f930e296a7d2bf3b14e59f4\` ON \`group_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_69f84cc2625ddd7555de6ee745\` ON \`group_roles\``);
        await queryRunner.query(`DROP TABLE \`group_roles\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP INDEX \`IDX_edf95ce9d000453ec028f02bf5\` ON \`post_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ac8bd2785d91b8abeffa2d6d2\` ON \`post_category\``);
        await queryRunner.query(`DROP TABLE \`post_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b5759f9b6fd2e375e906b9abb8\` ON \`group\``);
        await queryRunner.query(`DROP INDEX \`IDX_8a45300fd825918f3b40195fbd\` ON \`group\``);
        await queryRunner.query(`DROP TABLE \`group\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee999bb389d7ac0fd967172c41\` ON \`role\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}

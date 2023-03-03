import { MigrationInterface, QueryRunner } from "typeorm";

export class NewerMigration1677859473635 implements MigrationInterface {
    name = 'NewerMigration1677859473635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`note\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`content\` longtext NULL, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` text NOT NULL, \`isDone\` tinyint NOT NULL DEFAULT 0, \`description\` text NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`projectId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`project\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` text NOT NULL, \`description\` text NULL, \`isArchive\` tinyint NOT NULL DEFAULT 0, \`handledObejct\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`isConfirm\` tinyint NOT NULL, \`lastname\` text NULL, \`firstname\` text NULL, \`email\` text NOT NULL, \`password\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`session\` (\`id\` int NOT NULL AUTO_INCREMENT, \`token\` text NOT NULL, \`expirationDate\` date NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD CONSTRAINT \`FK_62eff03c08cd08ac0cde9bf4c0d\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3797a20ef5553ae87af126bc2fe\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`project\` ADD CONSTRAINT \`FK_7c4b0d3b77eaf26f8b4da879e63\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`session\` ADD CONSTRAINT \`FK_3d2f174ef04fb312fdebd0ddc53\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`session\` DROP FOREIGN KEY \`FK_3d2f174ef04fb312fdebd0ddc53\``);
        await queryRunner.query(`ALTER TABLE \`project\` DROP FOREIGN KEY \`FK_7c4b0d3b77eaf26f8b4da879e63\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3797a20ef5553ae87af126bc2fe\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP FOREIGN KEY \`FK_62eff03c08cd08ac0cde9bf4c0d\``);
        await queryRunner.query(`DROP TABLE \`session\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`project\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`note\``);
    }

}

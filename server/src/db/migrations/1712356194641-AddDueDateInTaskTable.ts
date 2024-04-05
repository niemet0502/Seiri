import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateInTaskTable1712356194641 implements MigrationInterface {
    name = 'AddDueDateInTaskTable1712356194641'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`dueDate\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`content\` longtext COLLATE "utf8mb4_unicode_ci" NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`content\` text CHARACTER SET "utf8mb4" COLLATE "utf8mb4_unicode_ci" NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`dueDate\``);
    }

}

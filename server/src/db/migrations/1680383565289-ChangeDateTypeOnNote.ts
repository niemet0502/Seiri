import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeDateTypeOnNote1680383565289 implements MigrationInterface {
    name = 'ChangeDateTypeOnNote1680383565289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`createdAt\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`updatedAt\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`updatedAt\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`createdAt\` date NULL`);
    }

}

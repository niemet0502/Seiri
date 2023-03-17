import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDatesInNote1678551911142 implements MigrationInterface {
    name = 'AddDatesInNote1678551911142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`createdAt\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`note\` ADD \`updatedAt\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`createdAt\``);
    }

}

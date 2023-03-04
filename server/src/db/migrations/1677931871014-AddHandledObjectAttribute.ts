import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHandledObjectAttribute1677931871014 implements MigrationInterface {
    name = 'AddHandledObjectAttribute1677931871014'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` ADD \`handledObject\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`project\` DROP COLUMN \`handledObject\``);
    }

}

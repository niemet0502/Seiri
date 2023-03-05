import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParentIdInTask1677944947110 implements MigrationInterface {
    name = 'AddParentIdInTask1677944947110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`parentId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_8c9920b5fb32c3d8453f64b705c\` FOREIGN KEY (\`parentId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_8c9920b5fb32c3d8453f64b705c\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`parentId\``);
    }

}

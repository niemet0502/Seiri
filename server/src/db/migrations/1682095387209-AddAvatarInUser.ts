import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarInUser1682095387209 implements MigrationInterface {
    name = 'AddAvatarInUser1682095387209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` text NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}

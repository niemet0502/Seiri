import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAvatarTypeToLongText1682098932947 implements MigrationInterface {
    name = 'ChangeAvatarTypeToLongText1682098932947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

}

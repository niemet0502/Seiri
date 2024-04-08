import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreateByColumnInTaskTable1712464874908
  implements MigrationInterface
{
  name = 'AddCreateByColumnInTaskTable1712464874908';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` ADD \`createdBy\` int NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`createdBy\``);
  }
}

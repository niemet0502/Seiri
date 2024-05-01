import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCompletedAtInTaskTable1712437655436
  implements MigrationInterface
{
  name = 'AddCompletedAtInTaskTable1712437655436';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`task\` ADD \`completedAt\` date NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`completedAt\``);
  }
}

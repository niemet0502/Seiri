import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsDefautColumnInProject1712616104431
  implements MigrationInterface
{
  name = 'AddIsDefautColumnInProject1712616104431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` ADD \`isDefault\` tinyint DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project\` DROP COLUMN \`isDefault\``,
    );
  }
}

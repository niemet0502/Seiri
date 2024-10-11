import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsFanInNoteTable1728648707885 implements MigrationInterface {
  name = 'AddIsFanInNoteTable1728648707885';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`note\` ADD \`isFav\` tinyint DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`note\` DROP COLUMN \`isFav\``);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDueDateInTaskTable1712356194641 implements MigrationInterface {
  name = 'AddDueDateInTaskTable1712356194641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` ADD \`dueDate\` date NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`dueDate\``);
  }
}

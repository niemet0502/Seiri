import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProjectIdToTracking1739227654000 implements MigrationInterface {
  name = 'AddProjectIdToTracking1739227654000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tracking\` ADD \`projectId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_tracking_project\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_tracking_project\``,
    );
    await queryRunner.query(`ALTER TABLE \`tracking\` DROP COLUMN \`projectId\``);
  }
}

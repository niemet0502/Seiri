import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrackingTable1739227000000 implements MigrationInterface {
  name = 'CreateTrackingTable1739227000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create tracking table
    await queryRunner.query(
      `CREATE TABLE \`tracking\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`title\` text NOT NULL,
        \`description\` text NULL,
        \`dueDate\` date NULL,
        \`target\` decimal(10,2) NOT NULL,
        \`balance\` decimal(10,2) NOT NULL DEFAULT 0,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`isDeleted\` tinyint NOT NULL DEFAULT 0,
        \`userId\` int NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    // Create tracking_history table
    await queryRunner.query(
      `CREATE TABLE \`tracking_history\` (
        \`id\` int NOT NULL AUTO_INCREMENT,
        \`amount\` decimal(10,2) NOT NULL,
        \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`trackingId\` int NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB`,
    );

    // Add foreign key for tracking -> user
    await queryRunner.query(
      `ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_tracking_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    // Add foreign key for tracking_history -> tracking
    await queryRunner.query(
      `ALTER TABLE \`tracking_history\` ADD CONSTRAINT \`FK_tracking_history_tracking\` FOREIGN KEY (\`trackingId\`) REFERENCES \`tracking\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(
      `ALTER TABLE \`tracking_history\` DROP FOREIGN KEY \`FK_tracking_history_tracking\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_tracking_user\``,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE \`tracking_history\``);
    await queryRunner.query(`DROP TABLE \`tracking\``);
  }
}

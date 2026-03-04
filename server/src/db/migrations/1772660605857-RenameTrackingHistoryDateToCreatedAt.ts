import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameTrackingHistoryDateToCreatedAt1772660605857 implements MigrationInterface {
    name = 'RenameTrackingHistoryDateToCreatedAt1772660605857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tracking_history\` DROP FOREIGN KEY \`FK_tracking_history_tracking\``);
        await queryRunner.query(`ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_tracking_project\``);
        await queryRunner.query(`ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_tracking_user\``);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`isFav\` \`isFav\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`isDefault\` \`isDefault\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`tracking_history\` ADD CONSTRAINT \`FK_9724c7fcad3a875fb15fc61af4c\` FOREIGN KEY (\`trackingId\`) REFERENCES \`tracking\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_f8ebfed851c59339b56222a479e\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_6b44e83762829ed1d3a67c86567\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_6b44e83762829ed1d3a67c86567\``);
        await queryRunner.query(`ALTER TABLE \`tracking\` DROP FOREIGN KEY \`FK_f8ebfed851c59339b56222a479e\``);
        await queryRunner.query(`ALTER TABLE \`tracking_history\` DROP FOREIGN KEY \`FK_9724c7fcad3a875fb15fc61af4c\``);
        await queryRunner.query(`ALTER TABLE \`project\` CHANGE \`isDefault\` \`isDefault\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`note\` CHANGE \`isFav\` \`isFav\` tinyint NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_tracking_user\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracking\` ADD CONSTRAINT \`FK_tracking_project\` FOREIGN KEY (\`projectId\`) REFERENCES \`project\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tracking_history\` ADD CONSTRAINT \`FK_tracking_history_tracking\` FOREIGN KEY (\`trackingId\`) REFERENCES \`tracking\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}

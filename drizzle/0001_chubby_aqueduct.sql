ALTER TABLE `project` MODIFY COLUMN `status` varchar(30) NOT NULL DEFAULT 'ongoing';--> statement-breakpoint
ALTER TABLE `task` MODIFY COLUMN `description` varchar(2000);--> statement-breakpoint
ALTER TABLE `task` MODIFY COLUMN `priority` varchar(30) NOT NULL DEFAULT 'default';--> statement-breakpoint
ALTER TABLE `project` DROP COLUMN `autodeletion`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `timezone`;
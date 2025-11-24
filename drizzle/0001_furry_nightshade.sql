CREATE TABLE `comment` (
	`id` varchar(255) NOT NULL,
	`task_id` varchar(255) NOT NULL,
	`parent_id` varchar(255),
	`left_by` varchar(255) NOT NULL,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comment_attachment` (
	`id` varchar(255) NOT NULL,
	`link` varchar(255) NOT NULL,
	`file_type` varchar(30) NOT NULL,
	CONSTRAINT `comment_attachment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` varchar(255) NOT NULL,
	`name` varchar(30) NOT NULL,
	`description` varchar(255),
	`status` varchar(30) DEFAULT 'ongoing',
	`deadline` datetime,
	`autodeletion` datetime,
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_member` (
	`project_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`role` varchar(30) DEFAULT 'member'
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` varchar(255) NOT NULL,
	`project_id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(2000) NOT NULL,
	`deadline` datetime,
	`priority` varchar(30) DEFAULT 'default',
	`created_by` varchar(255) NOT NULL,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task_status` (
	`task_id` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`status` varchar(30) DEFAULT 'ongoing'
);
--> statement-breakpoint
ALTER TABLE `session` DROP FOREIGN KEY `session_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `user` ADD `first_name` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD `email` varchar(255);--> statement-breakpoint
ALTER TABLE `user` ADD `role` varchar(30) DEFAULT 'user' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `profile_picture` varchar(255) DEFAULT '/assets/images/profile.svg' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `theme` varchar(255) DEFAULT 'default' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `language` varchar(5) DEFAULT 'ru-RU' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `timezone` varchar(255) DEFAULT 'Europe/Moscow' NOT NULL;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_left_by_user_id_fk` FOREIGN KEY (`left_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `selfref_comment_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `comment`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_member` ADD CONSTRAINT `project_member_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_member` ADD CONSTRAINT `project_member_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_status` ADD CONSTRAINT `task_status_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_status` ADD CONSTRAINT `task_status_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `age`;
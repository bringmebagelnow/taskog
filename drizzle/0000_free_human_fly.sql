CREATE TABLE `comment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`task_id` int NOT NULL,
	`parent_id` int,
	`left_by` int NOT NULL,
	CONSTRAINT `comment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `comment_attachment` (
	`id` int AUTO_INCREMENT NOT NULL,
	`link` varchar(255) NOT NULL,
	`file_type` varchar(30) NOT NULL,
	CONSTRAINT `comment_attachment_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(30) NOT NULL,
	`description` varchar(255),
	`status` varchar(30) DEFAULT 'ongoing' NOT NULL,
	`deadline` datetime,
	`autodeletion` datetime,
	CONSTRAINT `project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_member` (
	`project_id` int NOT NULL,
	`user_id` int NOT NULL,
	`role` varchar(30) DEFAULT 'member'
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	`expires_at` datetime NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(2000) NOT NULL,
	`deadline` datetime,
	`priority` varchar(30) DEFAULT 'default',
	`created_by` int NOT NULL,
	CONSTRAINT `task_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `task_status` (
	`task_id` int NOT NULL,
	`user_id` int NOT NULL,
	`status` varchar(30) DEFAULT 'ongoing'
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`first_name` varchar(255),
	`last_name` varchar(255),
	`username` varchar(32) NOT NULL,
	`email` varchar(255),
	`password_hash` varchar(255) NOT NULL,
	`role` varchar(30) NOT NULL DEFAULT 'user',
	`profile_picture` varchar(255) NOT NULL DEFAULT '/assets/images/profile.svg',
	`timezone` varchar(255) NOT NULL DEFAULT 'Europe/Moscow',
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `comment_left_by_user_id_fk` FOREIGN KEY (`left_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comment` ADD CONSTRAINT `selfref_comment_parent_id` FOREIGN KEY (`parent_id`) REFERENCES `comment`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_member` ADD CONSTRAINT `project_member_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_member` ADD CONSTRAINT `project_member_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_project_id_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `project`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task` ADD CONSTRAINT `task_created_by_user_id_fk` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_status` ADD CONSTRAINT `task_status_task_id_task_id_fk` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `task_status` ADD CONSTRAINT `task_status_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;
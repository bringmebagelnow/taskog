import { mysqlTable, serial, int, varchar, datetime, foreignKey } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: varchar('id', { length: 255 }).primaryKey(),
	firstName: varchar('first_name', { length: 255 }),
	lastName: varchar('first_name', { length: 255 }),
	username: varchar('username', { length: 32 }).notNull().unique(),
	email: varchar('email', { length: 255 }),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	role: varchar('role', { length: 30 }).default('user').notNull(),
	profilePicture: varchar('profile_picture', { length: 255 }).default('/assets/images/profile.svg').notNull(),
	theme: varchar('theme', { length: 255 }).default("default").notNull(),
	language: varchar('language', { length: 5 }).default('ru-RU').notNull(),
	timezone: varchar('timezone', { length: 255 }).default('Europe/Moscow').notNull(),
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: datetime('expires_at').notNull()
});

export const project = mysqlTable('project', {
	id: varchar('id', { length: 255 }).primaryKey(),
	name: varchar('name', { length: 30 }).notNull(),
	description: varchar('description', { length: 255 }),
	status: varchar('status', { length: 30 }).default('ongoing'),
	deadline: datetime('deadline'),
	autodeletion: datetime('autodeletion'),
});

export const projectMember = mysqlTable('project_member', {
	projectId: varchar('project_id', { length: 255 }).notNull().references(() => project.id, { onDelete: 'cascade' }), 
	userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
	role: varchar('role', { length: 30 }).default('member')
});

export const task = mysqlTable('task', {
	id: varchar('id', { length: 255 }).primaryKey(),
	projectId: varchar('project_id', { length: 255 }).notNull().references(() => project.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 2000 }).notNull(),
	deadline: datetime('deadline'),
	priority: varchar('priority', { length: 30 }).default('default'),
	createdBy: varchar('created_by', { length: 255 }).notNull().references(() => user.id),
});

export const taskStatus = mysqlTable('task_status', {
	taskId: varchar('task_id', { length: 255 }).notNull().references(() => task.id, { onDelete: 'cascade' }),
	userId: varchar('user_id', { length: 255 }).notNull().references(() => user.id, { onDelete: 'cascade' }),
	status: varchar('status', { length: 30 }).default('ongoing'),
});

/* 	Из-за ограничений в TypeScript по документации Drizzle - внешние ключи отслыающиеся на
	свою же таблицу создаются через отдельный оператор: */
export const comment = mysqlTable('comment', {
	id: varchar('id', { length: 255 }).primaryKey(),
	taskId: varchar('task_id', { length: 255 }).notNull().references(() => task.id),
	parentId: varchar('parent_id', { length: 255 }),
	leftBy: varchar('left_by', { length: 255 }).notNull().references(() => user.id),
}, (table) => [
	foreignKey({
		columns: [table.parentId],
		foreignColumns: [table.id],
		name: 'selfref_comment_parent_id'
	})
]);

export const commentAttachment = mysqlTable('comment_attachment', {
	id: varchar('id', { length: 255 }).primaryKey(),
	link: varchar('link', { length: 255 }).notNull(),
	fileType: varchar('file_type', { length: 30 }).notNull(),
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Project = typeof project.$inferSelect;

export type ProjectMember = typeof projectMember.$inferSelect;

export type Task = typeof task.$inferSelect;

export type TaskStatus = typeof taskStatus.$inferSelect;

export type Comment = typeof comment.$inferSelect;

export type CommentAttachment = typeof commentAttachment.$inferSelect;
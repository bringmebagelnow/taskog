import { relations } from 'drizzle-orm';
import { mysqlTable, int, varchar, datetime, foreignKey } from 'drizzle-orm/mysql-core';

export const user = mysqlTable('user', {
	id: int('id').primaryKey().autoincrement(),
	firstName: varchar('first_name', { length: 255 }),
	lastName: varchar('last_name', { length: 255 }),
	username: varchar('username', { length: 32 }).notNull().unique(),
	email: varchar('email', { length: 255 }),
	passwordHash: varchar('password_hash', { length: 255 }).notNull(),
	role: varchar('role', { length: 30 }).default('user').notNull(),
	profilePicture: varchar('profile_picture', { length: 255 }).default('/assets/images/profile.svg').notNull(),
});

export const session = mysqlTable('session', {
	id: varchar('id', { length: 255 }).primaryKey(),
	userId: int('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	expiresAt: datetime('expires_at').notNull()
});

export const project = mysqlTable('project', {
	id: int('id').primaryKey().autoincrement(),
	name: varchar('name', { length: 30 }).notNull(),
	description: varchar('description', { length: 255 }),
	status: varchar('status', { length: 30 }).default('ongoing').notNull(),
	deadline: datetime('deadline'),
	autodeletion: datetime('autodeletion'),
});

export const projectMember = mysqlTable('project_member', {
	projectId: int('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }), 
	userId: int('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	role: varchar('role', { length: 30 }).default('member')
});

export const task = mysqlTable('task', {
	id: int('id').primaryKey().autoincrement(),
	projectId: int('project_id').notNull().references(() => project.id, { onDelete: 'cascade' }),
	name: varchar('name', { length: 255 }).notNull(),
	description: varchar('description', { length: 2000 }).notNull(),
	deadline: datetime('deadline'),
	priority: varchar('priority', { length: 30 }).default('default'),
	createdBy: int('created_by').notNull().references(() => user.id),
});

export const taskStatus = mysqlTable('task_status', {
	taskId: int('task_id').notNull().references(() => task.id, { onDelete: 'cascade' }),
	userId: int('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
	status: varchar('status', { length: 30 }).default('ongoing'),
});

/* 	Из-за ограничений в TypeScript по документации Drizzle - внешние ключи отслыающиеся на
	свою же таблицу создаются через отдельный оператор: */
export const comment = mysqlTable('comment', {
	id: int('id').primaryKey().autoincrement(),
	taskId: int('task_id').notNull().references(() => task.id),
	parentId: int('parent_id'),
	leftBy: int('left_by').notNull().references(() => user.id),
}, (table) => [
	foreignKey({
		columns: [table.parentId],
		foreignColumns: [table.id],
		name: 'selfref_comment_parent_id'
	})
]);

export const commentParentRelation = relations(comment, ({ one }) => ({
	comment: one(comment, {
		fields: [comment.parentId],
		references: [comment.id],
	}),
}));

export const commentAttachment = mysqlTable('comment_attachment', {
	id: int('id').primaryKey().autoincrement(),
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
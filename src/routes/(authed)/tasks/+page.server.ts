import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from '../../$types';
import { asc, eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {;
    const user = event.locals.user;
    if (!user) redirect(403, "/login");

    const getTasksPage = event.url.searchParams.get("tp");

    let tasksPage = 1;

    if (getTasksPage) {
        tasksPage = Number(getTasksPage);
    }

    let taskList;

    if (user.role === "admin") {
        taskList = await db.select({
            id: table.task.id,
            name: table.task.name,
            description: table.task.description,
            priority: table.task.priority,
            deadline: table.task.deadline
        })
            .from(table.task)
            .orderBy(asc(sql`deadline IS NULL`), asc(table.task.deadline))
            .limit(10).offset((tasksPage * 10) - 10);

        return {
            isAdmin: user.role === "admin",
            taskList
        };
    } else {
        taskList = await db.select({
            id: table.task.id,
            name: table.task.name,
            description: table.task.description,
            priority: table.task.priority,
            deadline: table.task.deadline,
            projectId: table.task.projectId,
            userId: table.projectMember.userId,
        })
            .from(table.task)
            .leftJoin(table.projectMember, eq(table.task.projectId, table.projectMember.projectId))
            .where(eq(table.projectMember.userId, user.id))
            .orderBy(asc(sql`deadline IS NULL`), asc(table.task.deadline))
            .limit(10).offset((tasksPage * 10) - 10);
        console.log(taskList);
        return {
            isAdmin: user.role === "admin",
            taskList
        };
    }
};
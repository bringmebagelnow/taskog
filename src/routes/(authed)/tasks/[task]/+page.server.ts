import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { asc, eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;
    if (!user) redirect(403, "/login");

    const getCommentsPage = event.url.searchParams.get("tp");

    let commentsPage = 1;

    if (getCommentsPage) {
        commentsPage = Number(getCommentsPage);
    }

    let task;
    let commentList;

    let userPartOfProject = true;

    if (user.role === "admin" || userPartOfProject) {
        task = await db.select().from(table.project).where(eq(table.project.id, Number(event.params.task)));

        commentList = await db.select({
            id: table.task.id,
            name: table.task.name,
            description: table.task.description,
            priority: table.task.priority,
            deadline: table.task.deadline
        })
            .from(table.task)
            .where(eq(table.task.projectId, Number(event.params.task)))
            .orderBy(asc(sql`deadline IS NULL`), asc(table.task.deadline))
            .limit(10).offset((commentsPage * 10) - 10);

        return {
            isAdmin: user.role === "admin",
            task,
            commentList
        };
    } else {
        redirect(404, "/");
    }
};



// export const actions: Actions = {
//     createTask: async (event) => {
//         const projectId = Number(event.params.project);
//         const formData = await event.request.formData();
//         const name = formData.get('name');
//         const description = formData.get('description');
//         const priority = formData.get("priority");
//         const deadline = formData.get("deadline");
//         const createdBy = Number(event.locals.user?.id);

//         // TODO: add projectId validation by if user's role allows him to create a task for that project
//         if (!validateName(name)) {
//             return fail(400, { message: 'Название не должно превышать 30 символов' });
//         }
//         let values = { name: name, projectId: projectId, createdBy: createdBy };
//         if (description) {
//             if (!validateDescription(description)) {
//                 return fail(400, { message: 'Описание не должно превышать 255 символов' });
//             }
//             values = Object.assign({ description: description }, values);
//         }
//         if (!validatePriority(priority)) {
//             return fail(400, { message: 'Некорректный статус' });
//         }
//         values = Object.assign({ priority: priority }, values);
//         if (deadline) {
//             if (!validateDate(deadline)) {
//                 return fail(400, { message: 'Неверно указана дата дедлайна' });
//             }
//             values = Object.assign({ deadline: new Date(deadline) }, values);
//         }
//         try {
//             const [task] = await db.insert(table.task).values(values).$returningId();
//         } catch {
//             return fail(500, { message: 'Возникла ошибка, попробуйте снова позже' });
//         }
//         return redirect(302, event.url.pathname);
//     },
// };

// function validateName(name: unknown): name is string {
//     return (
//         typeof name === 'string' &&
//         name.length <= 30
//     );
// }

// function validateDescription(description: unknown): description is string {
//     return (
//         typeof description === 'string' &&
//         description.length <= 255
//     );
// }

// function validatePriority(priority: unknown): priority is string {
//     return (
//         typeof priority === 'string' &&
//         (
//             priority == "default" ||
//             priority == "trivial" ||
//             priority == "low" ||
//             priority == "medium" ||
//             priority == "high" ||
//             priority == "critical" 
//         )
//     );
// }

// function validateDate(date: unknown): date is string {
//     const tomorrowDate = new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
//     const gotDate = new Date(String(date));
//     return (
//         !isNaN(gotDate.getTime()) &&
//         gotDate >= tomorrowDate
//     )
// }
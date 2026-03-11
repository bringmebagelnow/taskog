import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { asc, eq, like } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {;
    const user = event.locals.user;
    if (!user) redirect(403, "/login");

    const getMembersPage = event.url.searchParams.get("mp");

    let membersPage = 1;

    if (getMembersPage) {
        membersPage = Number(getMembersPage);
    }

    let project;
    let membersList;

    const userPartOfProject = true;

    if (user.role === "admin" || userPartOfProject) {
        project = await db.select().from(table.project).where(eq(table.project.id, Number(event.params.project)));

        const pagination = 10;
        const getPage = event.url.searchParams.get("p");
        let page = 1;
        if (getPage) {
            page = Number(getPage);
        }

        const getSearch = event.url.searchParams.get("s");
        let search = '';
        if (getSearch) {
            search = String(getSearch);
        }

        let userList;

        userList = await db.select({
            firstName: table.user.firstName,
            lastName: table.user.lastName,
            username: table.user.username,
            email: table.user.email,
            role: table.user.role,
            profilePicture: table.user.profilePicture,
        }).from(table.user).where(like(table.user.username, `%${search}%`)).limit(pagination).offset((page * pagination) - pagination);
        
        let userAmount = Number(await db.$count(table.user, like(table.user.username, `%${search}%`)));
        let pages = 0;
        if (userAmount > pagination) {
            pages = (Math.ceil(userAmount / pagination));
        }

        membersList = await db.select({
            id: table.user.id,
            username: table.user.username,
            profilePicture: table.user.profilePicture
        })
            .from(table.user)
            .orderBy(asc(table.user.username))
            .limit(10).offset((membersPage * 10) - 10);
        return {
            isAdmin: user.role === "admin",
            project,
            membersList,
            pages
        };
    } else {
        redirect(403, "/");
    }
};



export const actions: Actions = {
    addUser: async (event) => {
        const projectId = Number(event.params.project);
        const formData = await event.request.formData();
        const username = formData.get("username");
        const role = formData.get("role");

        const findUser = await db.select({id: table.user.id}).from(table.user).where(like(table.user.username, String(username)));
        let userId;
        findUser.forEach(match => {
            userId = match.id;
        });

        if (!userId) {
            return fail(400, { message: 'Пользователь не найден' });
        }

        // TODO: add projectId validation by if user's role allows him to create a task for that project
        if (!validateRole(role)) {
            return fail(400, { message: 'Неверная роль' });
        }
        let values = { projectId: projectId, userId: userId, role: String(role) };
        try {
            const [task] = await db.insert(table.projectMember).values(values).$returningId();
        } catch {
            return fail(500, { message: 'Возникла ошибка, попробуйте снова позже' });
        }
        return redirect(302, event.url.pathname);
    },
};

function validateRole(role: unknown): role is string {
    return (
        typeof role === 'string' &&
        (
            role == "member" ||
            role == "manager" 
        )
    );
}
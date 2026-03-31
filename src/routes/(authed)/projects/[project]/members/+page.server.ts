import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { asc, eq, like, and } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {;
    const user = event.locals.user;
    if (!user) redirect(403, "/login");

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
        console.log(search);

        membersList = await db.select({
            id: table.user.id,
            username: table.user.username,
            profilePicture: table.user.profilePicture,
            projectRole: table.projectMember.role
        })
            .from(table.user)
            .leftJoin(table.projectMember, eq(table.user.id, table.projectMember.userId))
            .where(and(
                    like(table.user.username, `%${search}%`),
                    eq(table.user.id, table.projectMember.userId)
                ))
            .orderBy(asc(table.user.username))
            .limit(pagination).offset((page * pagination) - pagination);
        let memberAmount = Number(await db.$count(table.projectMember, like(table.projectMember.userId, `%${search}%`)));
        let pages = 0;
        if (memberAmount > pagination) {
            pages = (Math.ceil(memberAmount / pagination));
        }

        
        return {
            isAdmin: user.role === "admin",
            project,
            membersList,
            pages,
            page
        };
    } else {
        redirect(403, "/");
    }
};



export const actions: Actions = {
    addUser: async (event) => {
        const projectId = Number(event.params.project);
        const formData = await event.request.formData();
        const userId = await getUserID(formData.get("username"));
        const role = formData.get("role");

        // TODO: add projectId validation by if user's role allows him to create a task for that project
        if (!validateRole(role)) {
            return fail(400, { message: 'Название не должно превышать 30 символов' });
        }
        let values = { projectId: projectId, userId: Number(userId), role: String(role) };
        console.log(values);
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

async function getUserID(username: unknown) {
    if (typeof(username) === 'string') {
        let user = await db.query.user.findFirst({
            where: (user, { eq }) => eq(user.username, username),
        });
        return (user?.id);
    }
    else {
        return ("nah");
    }
}
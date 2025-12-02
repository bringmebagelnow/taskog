import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {;
    const user = event.locals.user;
    if (!user) redirect(403, "/login");

    if (user.role === "admin") {
        const project = await db.select().from(table.project).where(eq(table.project.id, Number(event.params.project)));
        return {
            isAdmin: user.role === "admin",
            project: project
        };
    }
    else {
        const project = await db.select().from(table.project).where(eq(table.project.id, Number(event.params.project)));
        return {
            project: project
        };
    }
};

export const actions: Actions = {
    createProject: async (event) => {
        const formData = await event.request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const status = formData.get("status");
        const deadline = formData.get("deadline");
        const autodeletion = formData.get("autodeletion");
        
        if (!validateName(name)) {
            return fail(400, { message: 'Название не должно превышать 30 символов' });
        }
        let values = { name: name };
        if (description) {
            if (!validateDescription(description)) {
                return fail(400, { message: 'Описание не должно превышать 255 символов' });
            }
            values = Object.assign({ description: description }, values);
        }
        if (!validateStatus(status)) {
            return fail(400, { message: 'Некорректный статус' });
        }
        values = Object.assign({ status: status }, values);
        if (deadline) {
            if (!validateDate(deadline)) {
                return fail(400, { message: 'Неверно указана дата дедлайна' });
            }
            values = Object.assign({ deadline: new Date(deadline) }, values);
        }
        if (autodeletion) {
            if (!validateDate(autodeletion)) {
                return fail(400, { message: 'Неверно указана дата автоудаления' });
            }
            values = Object.assign({ autodeletion: new Date(autodeletion) }, values);
        }
        try {
            const [project] = await db.insert(table.project).values(values).$returningId();
        } catch {
            return fail(500, { message: 'Возникла ошибка, попробуйте снова позже' });
        }
        return redirect(302, '/projects');
    },
};

function validateName(name: unknown): name is string {
    return (
        typeof name === 'string' &&
        name.length <= 30
    );
}

function validateDescription(description: unknown): description is string {
    return (
        typeof description === 'string' &&
        description.length <= 255
    );
}

function validateStatus(status: unknown): status is string {
    return (
        typeof status === 'string' &&
        (
            status == "unbegun" ||
            status == "ongoing" ||
            status == "frozen" ||
            status == "stopped" ||
            status == "finished" 
        )
    );
}

function validateDate(date: unknown): date is string {
    const tomorrowDate = new Date(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
    const gotDate = new Date(String(date));
    return (
        !isNaN(gotDate.getTime()) &&
        gotDate >= tomorrowDate
    )
}
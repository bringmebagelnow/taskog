import { fail, redirect } from '@sveltejs/kit';
import * as table from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { hash } from '@node-rs/argon2';
import { like } from 'drizzle-orm';

export const load: PageServerLoad = async (event) => {
    if (event.locals.user) {
        if (event.locals.user.role == "admin") {
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
            return {
                userList,
                pages,
                page
            };
        } else {
            return redirect(403, '/');
        }
    } else {
        return redirect(403, '/');
    }
};

export const actions: Actions = {
    createUser: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get('username');
        const password = formData.get('password');
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const role = formData.get('role');
        if (!validateUsername(username)) {
            return fail(400, { message: 'Неверное имя пользователя' });
        }

        let values = {
            username: username,
            passwordHash: ''
        } satisfies typeof table.user.$inferInsert;;

        if (!validatePassword(password)) {
            return fail(400, { message: 'Неверный пароль' });
        }
        if (firstName) {
            if (!validateName(firstName)) {
                return fail(400, { message: 'Имя не прошло валидацию' });
            };
            values = Object.assign({ firstName: firstName }, values);
        };
        if (lastName) {
            if (!validateName(lastName)) {
                return fail(400, { message: 'Фамилия не прошла валидацию' });
            };
            values = Object.assign({ lastName: lastName }, values);
        };
        if (email) {
            if (!validateEmail(email)) {
                return fail(400, { message: 'Неверный адрес электронной почты' });
            }
            values = Object.assign({ email: email }, values);
        }
        if (!validateRole(role)) {
            return fail(400, { message: 'Неверная роль' });
        }
        values = Object.assign({ role: role }, values);

        const passwordHash = await hash(password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1,
        });
        values.passwordHash = passwordHash;

        try {
            const [user] = await db.insert(table.user).values(values).$returningId();
        } catch {
            return fail(500, { message: 'Возникла ошибка, попробуйте снова позже' });
        }
        return redirect(302, '/users');
    },
};

function validateUsername(username: unknown): username is string {
    return (
        typeof username === 'string' &&
        username.length >= 3 &&
        username.length <= 31 &&
        /^[a-z0-9_-]+$/.test(username)
    );
}

function validatePassword(password: unknown): password is string {
    return (
        typeof password === 'string' &&
        password.length >= 6 &&
        password.length <= 255
    );
}

function validateName(name: unknown): name is string {
    return (
        typeof name === 'string' &&
        name.length <= 254 &&
        /^[a-zA-Zа-яА-Я0-9_-]+$/.test(name)
    );
}

function validateEmail(email: unknown): email is string {
    return (
        typeof email === 'string' &&
        email.length <= 254 &&
        email.includes("@")
    );
}
function validateRole(role: unknown): role is string {
    return (
        typeof role === 'string' &&
        (
            role == "user" ||
            role == "admin"
        )
    );
}
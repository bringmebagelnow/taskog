<script lang="ts">
    import {
        PUBLIC_COMPANY_NAME,
    } from '$env/static/public';
    import toggleSidebar from "./SidebarButton";
    import { enhance } from '$app/forms';
    $effect(() => {
        const sidebarlinks = document.querySelectorAll("li a");
        sidebarlinks.forEach((el) => {
            el.addEventListener('click', (e) => {
                toggleSidebar();
            })
        })
    });

    const { user } = $props();
</script>


<div class="sidebar sidebar--hidden">
    <div class="sidebar--controls">
        <div class="logo">
            <img src="/assets/images/logo.svg" alt="Лого" width="40px" height="40px">
            { PUBLIC_COMPANY_NAME }
        </div>
        <button onclick={toggleSidebar}>
            <img src="/assets/images/burger_menu.svg" alt="Меню" width="40px" height="40px">
        </button>
    </div>
    <div class="sidebar--lists">
        <ul>
            <li>
                <a href="/">Главная</a>
            </li>
            <li>
                <a href="/tasks">Задачи</a>
            </li>
            <li>
                <a href="/projects">Проекты</a>
            </li>
            {#if user && user.role == "admin"}
                <li>
                    <a href="/users">Пользователи</a>
                </li>
            {/if}
        </ul>
        <ul>
            <li>
                <a href="/settings">Настройки</a>
            </li>
            <li>
                <form method='post' action='/logout' use:enhance>
                    <button>Выйти из аккаунта</button>
                </form>
            </li>
        </ul>
    </div>
    <p>
        Сделано с <a href="https://github.com/bringmebagelnow/taskog">Taskog</a>
    </p>
</div>

<style>
    .sidebar {
        z-index: 5;
        position: fixed;
        display: block;
        left: 0px;
        height: 100vh;
        width: 250px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        gap: 20px;
        background-color: var(--primaryBGColor);
        transition: left 0.5s, opacity 0.5s cubic-bezier(0.00, 1.00, 0.5, 1.0);
    }
    .sidebar--hidden {
        left: -250px;
    }
    .sidebar--lists {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .sidebar--controls {
        display: flex;
        justify-content: space-between;
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        user-select: none;
    }
    .sidebar--controls button {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        transition: opacity 0.5s cubic-bezier(0.00, 1.00, 0.5, 1.0);
    }
    ul {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    li {
        list-style: none;
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: var(--primaryUIColor);
        border-radius: 10px;
        transition: background-color 0.2s;
    }
    li:hover {
        background-color: var(--primaryHoverColor);
    }
    li:active {
        background-color: var(--primaryActiveColor);
    }
    li:hover a, li:hover button, li a:focus, li button:focus {
        padding-left: 30px;
        outline: none;
    }
    li form {
        width: 100%;
        height: 100%;
    }
    li a, li button {
        height: 100%;
        width: 100%;
        padding: 10px;
        transition: padding 0.2s;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 10px;
    }
    button {
        font-size: 16px;
        cursor: pointer;
    }
</style>
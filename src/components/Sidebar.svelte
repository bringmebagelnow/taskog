<script lang="ts">
    import toggleSidebar from "./SidebarButton";

    // document.addEventListener('DOMContentLoaded', () => {
    //     const sidebarlinks = document.querySelectorAll("li a");
    //     console.log(sidebarlinks);
    // })
</script>


<div class="sidebar sidebar--hidden">
    <div class="sidebar--controls">
        <div class="logo">
            <img src="assets/images/logo.svg" alt="Лого" width="40px" height="40px">
            Taskog.
        </div>
        <button onclick={toggleSidebar}>
            <img src="assets/images/burger_menu.svg" alt="Меню" width="40px" height="40px">
        </button>
    </div>
    <div class="sidebar--lists">
        <ul>
            <li>
                <a href="/">Главная</a>
            </li>
            <li>
                <a href="/tasks">Задания</a>
            </li>
            <li>
                <a href="/projects">Проекты</a>
            </li>
        </ul>
        <ul>
            <li>
                <a href="/tasks">Настройки</a>
            </li>
            <li>
                <a href="/tasks">Выйти из аккаунта</a>
            </li>
        </ul>
    </div>
    <p>
        Сделано с <a href="https://taskog.ru">Taskog</a>
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
        background-color: rgb(195, 255, 210);
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
        background-color: rgb(150, 255, 170);
        border-radius: 10px;
        transition: background-color 0.2s;
    }
    li:hover {
        background-color: rgb(170, 255, 185);
    }
    li:hover a {
        padding-left: 30px;
    }
    li a {
        height: 100%;
        width: 100%;
        padding: 10px;
        transition: padding 0.2s;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
</style>
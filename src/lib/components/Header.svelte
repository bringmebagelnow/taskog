<script lang="ts">
    import toggleSidebar from "./SidebarButton";
</script>

<header class="header">
    <div class="header--menu">
        <button onclick={toggleSidebar}>
            <img src="/assets/images/burger_menu.svg" alt="Меню" width="40px" height="40px">
        </button>
    </div>
    <div class="header--title">
        <p>
            Главная
        </p>
    </div>
    <div class="header--profile">
        <a href="/profile">
            <img src="/assets/images/profile.svg" alt="Профиль" width="40px" height="40px">
        </a>
    </div>
</header>

<style>
    .header {
        height: 80px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        gap: 20px;
        background-color: rgb(193, 255, 210);
    }
    .header:nth-child(1) {
        flex: 1;
    }
    .header--title {
        text-align: center;
        font-size: 20px;
        user-select: none;
    }
    .header--profile a, .header--menu button {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
    }
    .header--menu button {
        transition: opacity 0.5s cubic-bezier(0.00, 1.00, 0.5, 1.0);
    }
</style>
<script lang="ts">
    import { PUBLIC_COMPANY_NAME } from '$env/static/public';
</script>

<header class="header">
    <div class="header--title">
        <div class="logo">
            <img src="/assets/images/logo.svg" alt="Лого" width="40px" height="40px">
            {PUBLIC_COMPANY_NAME}
        </div>
    </div>
</header>

<style>
    .header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
        gap: 20px;
        background-color: var(--primaryBGColor);
    }
    .logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        user-select: none;
    }
    .header--title {
        text-align: center;
        font-size: 20px;
        user-select: none;
    }
</style>
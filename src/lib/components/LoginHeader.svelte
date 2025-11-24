<script lang="ts">
    import { env } from '$env/dynamic/public';
</script>

<header class="header">
    <div class="header--title">
        <p>
            { env.PUBLIC_ORG_NAME }
        </p>
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
    .header--title {
        text-align: center;
        font-size: 20px;
        user-select: none;
    }
</style>
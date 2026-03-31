<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';
    // import * as table from '$lib/server/db/schema';
    // import { db } from '$lib/server/db';
    // import { eq } from 'drizzle-orm';

    const { data, form } = $props();
    const project = data.project[0];

    $effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Участники " + project.name[0].toUpperCase() + project.name.slice(1);
    });
</script>

<svelte:head>
	<title>Участники {project.name[0].toUpperCase() + project.name.slice(1)}</title>
</svelte:head>

{#if data.isAdmin}
	<CreateModal action="addUser" actionData={ data.membersList }/>
{/if}

<a href={ "/projects/" + project.id } class="modal--button">Назад</a>

<h1>Участники</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Добавить участника</button>
{/if}
<p class="message">{form?.message ?? ''}</p>

<form method="get" class="searchbar">
    <input type="search" name="s">
    <button type="submit">Искать</button>
</form>
<div class="users">
    {#each data.membersList as user}
        <div class={user.projectRole == "manager"? "users--user manager" : "users--user"}>
            <div class="user--username">{user.username}</div>
            {#if user.projectRole == "manager"}
                Менеджер
            {/if}
			{#if data.isAdmin}
                <button class="user--edit" onclick={() => console.log("remove")}><img src="/assets/images/menu_close.svg" alt="Х" width="15px"></button>
			{/if}
        </div>
    {/each}
</div>
{#if data.pages == 2}
    <div class="pages">
        {#if data.page == 1}
            <div class="pages--current">1</div>
            <a href="?p=2" class="pages--selectable">2</a>
        {:else}
        <a href="?p=1" class="pages--selectable">1</a>
        <div class="pages--current">2</div>
        {/if}
    </div>
{/if}
{#if data.pages > 2}
    <div class="pages">
        {#if data.page - 1 >= 1}
            <a href="?p=1" class="pages--selectable">{"<<"}</a>
            <a href={"?p=" + (data.page - 1)} class="pages--selectable">{"<"}</a>
        {/if}
        {#if data.page - 3 >= 1}
            <a href={"?p=" + (data.page - 3)} class="pages--selectable">{Number(data.page) - 3}</a>
        {/if}
        {#if data.page - 2 >= 1}
            <a href={"?p=" + (data.page - 2)} class="pages--selectable">{Number(data.page) - 2}</a>
        {/if}
        {#if data.page - 1 >= 1}
            <a href={"?p=" + (data.page - 1)} class="pages--selectable">{Number(data.page) - 1}</a>
        {/if}
            <div class="pages--current">{Number(data.page)}</div>
        {#if data.page + 1 <= data.pages}
            <a href={"?p=" + (data.page + 1)} class="pages--selectable">{Number(data.page) + 1}</a>
        {/if}
        {#if data.page + 2 <= data.pages}
            <a href={"?p=" + (data.page + 2)} class="pages--selectable">{Number(data.page) + 2}</a>
        {/if}
        {#if data.page + 3 <= data.pages}
            <a href={"?p=" + (data.page + 3)} class="pages--selectable">{Number(data.page) + 3}</a>
        {/if}
        {#if data.page + 1 <= data.pages}
            <a href={"?p=" + (data.page + 1)} class="pages--selectable">{">"}</a>
            <a href={"?p=" + data.pages} class="pages--selectable">{">>"}</a>
        {/if}
    </div>
{/if}

<style>
    .searchbar {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }
    .searchbar * {
        border: solid 2px black;
        border-radius: 6px;
    }
    .searchbar *:hover {
        background-color: var(--inputHoverColor)
    }
    .searchbar *:active {
        background-color: var(--inputActiveColor)
    }
    .users {
        display: flex;
        flex-direction: column;
        gap: 19px;
        
    }
    .users--user {
        display: flex;
        justify-content: space-between;
        background-color: var(--primaryBGColor);
        padding: 10px;
        width: 300px;
        border-radius: 5px;
    }
    .manager {
        background-color: var(--primaryActiveColor);
    }
    .user--edit {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .pages {
        display: flex;
        gap: 20px;
    }
    .pages--current {
        padding: 0 10px;
        border-radius: 5px;
        border: solid 2px black;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
    }
    .pages--selectable {
        padding: 0 10px;
        border-radius: 5px;
        background-color: var(--primaryBGColor);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .pages--selectable:hover {
        background-color: var(--primaryHoverColor);
    }
    .pages--selectable:active {
        background-color: var(--primaryActiveColor);
    }
</style>
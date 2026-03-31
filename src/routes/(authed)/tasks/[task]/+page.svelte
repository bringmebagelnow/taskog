<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';

    const { data } = $props();
    const task = data.task[0];

    $effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = task.name[0].toUpperCase() + task.name.slice(1);
    });
</script>

<svelte:head>
	<title>{task.name[0].toUpperCase() + task.name.slice(1)}</title>
</svelte:head>

{#if data.isAdmin}
	<CreateModal action="createTask"/>
{/if}

<h1>{task.name}</h1>
<p>{task.description}</p>

<a href={ "/projects/" + task.id + "/members" } class="modal--button">Участники</a>

<h1>Задачи</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Создать задачу</button>
{/if}

{#each data.commentList as comment}
	<div class="comment">
		{comment}
	</div>
{/each}
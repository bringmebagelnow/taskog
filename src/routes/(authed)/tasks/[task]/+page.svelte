<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';

    const { data } = $props();
    const task = data.task[0];

    $effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = task.name;
    });
</script>

{#if data.isAdmin}
	<CreateModal action="createTask"/>
{/if}

<h1>{task.name}</h1>
<p>{task.description}</p>

<h1>Задачи</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Создать задачу</button>
{/if}

{#each data.commentList as comment}
	<a class="project" href={"/tasks/" + comment.id}>
		<div class="project--maininfo">
			<div class="maininfo--title">
				{comment.name}
			</div>
		</div>
	</a>
{/each}
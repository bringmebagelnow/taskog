<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';

    const { data } = $props();
    const project = data.project[0];

    $effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = project.name;
    });
</script>

{#if data.isAdmin}
	<CreateModal action="createTask"/>
{/if}

<h1>{project.name}</h1>
<p>{project.description}</p>
<h1>Задачи</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Создать проект</button>
{/if}
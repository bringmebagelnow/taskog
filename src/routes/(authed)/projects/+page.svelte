<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';

	let { data } = $props();

	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Проекты";
    })
</script>

<svelte:head>
	<title>Проекты</title>
</svelte:head>

{#if data.isAdmin}
	<CreateModal action="createProject"/>
{/if}

<h1>Ваши проекты</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Создать проект</button>
{/if}

{#each data.projectList as project}
	<a class="project" href={"/projects/" + project.id}>
		<div class="project--maininfo">
			<div class="maininfo--title">
				{project.name}
			</div>
			<!-- <div class="maininfo--completion">
				0/6
			</div> -->
		</div>
		<div class="project--statusinfo">
			<div class="statusinfo--status">
				{#if project.status == "unbegun"}
					Не начат
				{:else if project.status == "ongoing"}
					В прогрессе
				{:else if project.status == "frozen"}
					Заморожен
				{:else if project.status == "stopped"}
					Остановлен
				{:else if project.status == "finished"}
					Завершен
				{/if}
			</div>
			<div class="statusinfo--deadline">
				{project.deadline?.toLocaleDateString()}
			</div>
		</div>
	</a>
{/each}
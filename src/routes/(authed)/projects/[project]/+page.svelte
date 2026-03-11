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

<a href={ "/projects/" + project.id + "/members" } class="modal--button">Участники</a>

<h1>Задачи</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Создать задачу</button>
{/if}

{#each data.taskList as task}
	<a class="project" href={"/tasks/" + task.id}>
		<div class="project--maininfo">
			<div class="maininfo--title">
				{task.name}
			</div>
		</div>
		<div class="project--statusinfo">
			<div class="statusinfo--priority">
				{#if task.priority == "trivial"}
					Незначительный
				{:else if task.priority == "low"}
					Низкий
				{:else if task.priority == "medium"}
					Средний
				{:else if task.priority == "high"}
					Высокий
				{:else if task.priority == "critical"}
					Критический
				{/if}
			</div>
			<div class="statusinfo--deadline">
				{task.deadline?.toLocaleDateString()}
			</div>
		</div>
	</a>
{/each}
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
				{project.deadline?.toLocaleDateString()}
			</div>
		</div>
	</a>
{/each}

<style>
	.modal--button {
		background-color: var(--primaryBGColor);
		font-size: 24px;
		padding: 5px 50px;
		border-radius: 5px;
		text-align: center;
		transition: background-color 0.1s;
	}
	.modal--button:hover, .modal--button:focus {
		background-color: var(--primaryHoverColor);
	}
	.modal--button:active {
		background-color: var(--primaryActiveColor);
	}
</style>
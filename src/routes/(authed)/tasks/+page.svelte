<script lang="ts">
    const { data } = $props();
    
	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Задачи";
    })
</script>

<svelte:head>
	<title>Задачи</title>
</svelte:head>

<h1>Ваши задачи</h1>

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
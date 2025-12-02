<script lang="ts">
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
<p>ура ура ура</p>

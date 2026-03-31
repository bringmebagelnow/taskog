<script lang="ts">
    const { data } = $props();
	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Профиль";
    })
</script>


<svelte:head>
	<title>Профиль</title>
</svelte:head>

<h1>Привет, {data.user?.username}</h1>
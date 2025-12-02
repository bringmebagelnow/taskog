<script lang="ts">
	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Профиль";
    })
</script>


<svelte:head>
	<title>Профиль</title>
</svelte:head>

<h1>You</h1>
<p>uhhh its likee uhhhh its you i think</p>
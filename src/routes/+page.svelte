<script lang="ts">
    import {
		PUBLIC_COMPANY_NAME,
	} from '$env/static/public';
	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Главная";
    })
</script>

<svelte:head>
	<title>Главная</title>
</svelte:head>

<h1>{PUBLIC_COMPANY_NAME}</h1>
<p>woo!</p>
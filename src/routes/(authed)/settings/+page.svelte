<script lang="ts">
    import { enhance } from '$app/forms';

	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Настройки";
    })
</script>

<svelte:head>
	<title>Настройки</title>
</svelte:head>

<h1>Настройки</h1>
<p>ты уверен?</p>
<input type="checkbox" name="ye" id="ye">
<form method='post' action='/logout' use:enhance>
    <button>Выйти из аккаунта</button>
</form>
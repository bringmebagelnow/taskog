<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
    import LoginHeader from '$lib/components/LoginHeader.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';

	let { data, children } = $props();

	console.log(data.user);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if data.user}
	<Sidebar/>
	<Header/>
{:else}
	<LoginHeader/>
{/if}

{@render children()}

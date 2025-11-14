<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '../components/Header.svelte';
	import Sidebar from '../components/Sidebar.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Sidebar/>
<Header/>

{@render children()}

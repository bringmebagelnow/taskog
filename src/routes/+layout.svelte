<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
    import LoginHeader from '$lib/components/LoginHeader.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { LoadEvent } from '@sveltejs/kit';

	let { children } = $props();

	let authenticated: boolean = $state(false);

	export const load: LoadEvent = async (event) => {
		if (event.locals.user) {
			console.log("i dont think you're logged in...");
			return {};
		}
		console.log("oh hey i know you!");
		authenticated = true;
		return {};
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{console.log(authenticated)}
{#if authenticated}
	<Sidebar/>
	<Header/>
{:else}
	<LoginHeader/>
{/if}

{@render children()}

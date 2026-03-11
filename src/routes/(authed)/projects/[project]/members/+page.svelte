<script lang="ts">
    import { enhance } from '$app/forms';
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
	<CreateModal action="addUser" actionData={ data.membersList }/>
{/if}

<a href={ "/projects/" + project.id } class="modal--button">Назад</a>

<h1>Участники</h1>

{#if data.isAdmin}
	<button class="modal--button" onclick={toggleModal}>Добавить участника</button>
{/if}

{#each data.membersList as member}
	<div class="project">
		<div class="project--maininfo">
			<div class="maininfo--title">
				{member.username}
			</div>
		</div>
		<div class="project--statusinfo">
			{#if data.isAdmin}
				<form id="modalForm" method='post' action='?/removeUser' use:enhance>
					<button>Убрать</button>
				</form>
			{/if}
		</div>
	</div>
{/each}
<script lang="ts">
    import CreateModal from '$lib/components/CreateModal.svelte';
    import toggleModal from '$lib/components/ModalButton.js';
    

    const { data, form } = $props();

	$effect(() => {
        const headerTitle = document.querySelector(".header--title p");
        if (!headerTitle) return;
        headerTitle.textContent = "Пользователи";
    })

</script>

<svelte:head>
	<title>Пользователи</title>
</svelte:head>

<CreateModal action="createUser"/>

<h1>Пользователи</h1>

<button class="modal--button" onclick={toggleModal}>Создать пользователя</button>
<p class="message">{form?.message ?? ''}</p>

<!-- 
firstName: table.user.firstName,
lastName: table.user.lastName,
username: table.user.username,
email: table.user.email,
role: table.user.role,
profilePicture: table.user.profilePicture, 
-->

<form method="get">
    <input type="search" name="s">
    <button type="submit">Искать</button>
</form>

{#each data.userList as user}
    <div class="user">
        <div class="user--username">{user.username}</div>
    </div>
{/each}
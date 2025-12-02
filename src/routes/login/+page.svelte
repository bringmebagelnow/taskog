<script lang='ts'>
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Вход</title>
</svelte:head>

<div class="center">
	<h1>Войти/Register</h1>
	<form method="post" action="?/login" use:enhance>
		<div class="form--inputs">
			<div class="inputs--input">
				Имя пользователя
				<input name="username" />
			</div>
			<div class="inputs--input">
				Пароль
				<input type="password" name="password" />
			</div>
		</div>
		<button>Войти</button>
		<button formaction="?/register">меня здесь быть не должно</button>
	</form>
	<p class="message">{form?.message ?? ''}</p>
</div>

<style>
	.center {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	h1 {
		text-align: center;
	}
	form {
		background-color: var(--primaryBGColor);
		border-radius: 20px;
		padding: 30px;
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		gap: 20px;
		align-items: center;
		outline: solid 2px black;
	}
	.form--inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}
	input, button {
		outline: solid 2px black;
		border-radius: 5px;
		padding: 0 2px;
		background-color: var(--inputBGColor);
		width: 70%;
	}
	input:hover, button:hover {
		background-color: var(--inputHoverColor);
	}
	button:active {
		background-color: var(--inputActiveColor);
	}
	.inputs--input {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		gap: 10px;
		text-align: center;
	}
	button {
		padding: 10px;
		width: fit-content;
	}
	.message {
		margin-top: 10px;
		color: red;
	}
</style>
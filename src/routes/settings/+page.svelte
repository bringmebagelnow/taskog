<script lang="ts">
    import { enhance } from '$app/forms';
</script>

<h1>Settings</h1>
<p>умереть лол</p>
<input type="checkbox" name="die" id="die">
<form method='post' action='/logout' use:enhance>
    <button>Выйти из аккаунта</button>
</form>
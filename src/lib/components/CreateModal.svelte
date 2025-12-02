<script lang="ts">
    import toggleModal from './ModalButton';
    import { enhance } from '$app/forms';

    const tomorrowDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    const { action } = $props();

    $effect(() => {
        const modalClosers = document.querySelectorAll("#closeModal");
        modalClosers.forEach((el) => {
            el.addEventListener('click', (e) => {
                toggleModal();
            });
        });
        if (action == "createProject") {
            const autodeletionCheckbox = document.querySelector("#autodeletionCheckbox") as HTMLInputElement;
            autodeletionCheckbox.checked = false;
            const autodeletionDate = document.querySelector("#autodeletionDate");
            autodeletionCheckbox?.addEventListener("change", () => {
                if (autodeletionCheckbox.checked) {
                    autodeletionDate?.classList.remove("transparent");
                    autodeletionDate?.removeAttribute("disabled");
                }
                else {
                    autodeletionDate?.classList.add("transparent");
                    autodeletionDate?.setAttribute("disabled", "true");
                }
            });
        } 
        const form = document.querySelector("#modalForm");
        form?.addEventListener('submit', () => {
            toggleModal();
            document.querySelectorAll<HTMLInputElement>("#modalForm input").forEach(input => { input.value = input.defaultValue; input.checked = false });
            document.querySelectorAll<HTMLInputElement>("#modalForm textarea").forEach(textarea => textarea.value = textarea.defaultValue);
        })
    });
</script>

<div class="modal modal--hidden">
    <div class="modal--menu">
        <div class="modal--controls">
            <div class="controls--title">
                {#if action == "createProject"}
                    <h2>Создание проекта</h2>
                {:else if action == "createTask"}
                    <h2>Создание задачи</h2>
                {/if}
            </div>
            <button class="controls--close" id="closeModal">
                <img src="/assets/images/menu_close.svg" alt="Закрыть модальное меню" width="40px" height="40px">
            </button>
        </div>
        {#if action == "createProject"}
            <form id="modalForm" method='post' action='?/createProject' use:enhance>
                <div class="form--inputs">
                    <div class="inputs--input">
                        Название
                        <input name="name" type="text" required/>
                    </div>
                    <div class="inputs--input">
                        Описание
                        <textarea name="description"></textarea>
                    </div>
                    <div class="inputs--input">
                        Статус
                        <select name="status" value="unbegun">
                            <option value="unbegun">Не начат</option>
                            <option value="ongoing">В прогрессе</option>
                            <option value="frozen">Заморожен</option>
                            <option value="stopped">Остановлен</option>
                            <option value="finished">Завершен</option>
                        </select>
                    </div>
                    <div class="inputs--input">
                        Дедлайн
                        <input name="deadline" type="date" min={ tomorrowDate }/>
                    </div>
                    <div class="inputs--input">
                        Автоудаление
                        <input type="checkbox" id="autodeletionCheckbox">
                        <input name="autodeletion" id="autodeletionDate" type="date" min={ tomorrowDate } required disabled class="transparent"/>
                    </div>
                </div>
                <button>Создать проект</button>
            </form>
        {:else if action == "createTask"}
            <form id="modalForm" method='post' action='?/createTask' use:enhance>
                <div class="form--inputs">
                    <div class="inputs--input">
                        Название
                        <input name="name" type="text" required/>
                    </div>
                    <div class="inputs--input">
                        Описание
                        <textarea name="description"></textarea>
                    </div>
                    <div class="inputs--input">
                        Приоритет
                        <select name="priority" value="default">
                            <option value="default">Не указан</option>
                            <option value="trivial">Незначительный</option>
                            <option value="low">Низкий</option>
                            <option value="medium">Средний</option>
                            <option value="high">Высокий</option>
                            <option value="critical">Критический</option>
                        </select>
                    </div>
                    <div class="inputs--input">
                        Дедлайн
                        <input name="deadline" type="date" min={ tomorrowDate }/>
                    </div>
                </div>
                <button>Создать задачу</button>
            </form>
        {/if}
    </div>
    <div class="modal--background" id="closeModal"></div>
</div>

<style>
    .modal {
        z-index: 3;
        position: fixed;
        display: block;
        left: 0px;
        top: 0px;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: top 0.5s, opacity 0.5s cubic-bezier(0.00, 1.00, 0.5, 1.0);
    }
    .modal--background {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0,0,0,0.2);
        height: 100vh;
        width: 100vw;
    }
    .modal--hidden {
        z-index: -5;
        user-select: none;
        top: 100vh;
        opacity: 0;
    }
    .modal--menu {
        z-index: 4;
        width: 80%;
        max-width: 600px;
        padding: 20px;
        background-color: var(--primaryBGColor);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
    }
    .modal--controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .controls--title {
        text-align: center;
        width: 100%;
    }
    .controls--close {
        position: relative;
        top: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    form textarea {
        outline: solid 2px black;
		border-radius: 5px;
		padding: 0 2px;
		background-color: var(--inputBGColor);
		width: 100%;
        max-width: 100%;
        max-height: 250px;
        border: none;
    }
    form button {
        margin-top: 10px;
        font-size: 16px;
        cursor: pointer;
        padding: 10px;
		width: fit-content;
    }
    .form--inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 20px;
		margin-bottom: 20px;
	}
	form input, form button, form select {
		outline: solid 2px black;
		border-radius: 5px;
		padding: 0 2px;
		background-color: var(--inputBGColor);
		width: 100%;
        max-width: 200px;
	}
	form input:hover, form button:hover {
		background-color: var(--inputHoverColor);
	}
	form button:active {
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
    .transparent {
        opacity: 0;
    }
    #autodeletionCheckbox {
        outline: none;
        scale: 2;
        margin-top: 4px;
        margin-bottom: 10px;
    }
</style>
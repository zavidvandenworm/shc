<script lang="ts">
	import { ColorEnum, type Questionnaire } from '$lib/api/models';
	import { fly } from 'svelte/transition';
	import CardShell from './CardShell.svelte';
	import { ToastSeverity, showToast } from '$lib/toastPresets';
	import { goto } from '$app/navigation';
	import { SubmitHealthCheck } from '$lib/api/api';

	export let healthCheck: Questionnaire;
	export let questionCurrent: number;

	function isReadyToSubmit(): boolean {
		for (let question of healthCheck.questions) {
			if (
				question.answer == null ||
				question.answer.answerColor == null ||
				question.answer.isFlagged
			) {
				return false;
			}
		}
		return true;
	}
</script>

<CardShell>
	<div>
		<span class="text-3xl font-semibold flex-grow">Samenvatting</span>
	</div>
	<div class="grow overflow-y-auto my-4 flex flex-col gap-5">
		{#each healthCheck.questions as question}
			<button
				on:click={() => {
					questionCurrent = healthCheck.questions.indexOf(question);
				}}
				class="text-left px-4 py-3 bg-zinc-100 font-semibold rounded-lg shadow-lg hover:!bg-opacity-50 flex items-center"
				class:green={question.answer.answerColor != null &&
					question.answer.answerColor == ColorEnum.Green}
				class:yellow={question.answer.answerColor != null &&
					question.answer.answerColor == ColorEnum.Yellow}
				class:red={question.answer.answerColor != null &&
					question.answer.answerColor == ColorEnum.Red}
				class:flag={question.answer.isFlagged}
			>
				<span class="w-full text-ellipsis overflow-hidden">{question.title}</span>
				<div class="h-8 aspect-square icon ml-4 bg-no-repeat bg-center bg-contain"></div>
			</button>
		{/each}
	</div>

	<button
		class="button"
		on:click={async () => {
			if (!isReadyToSubmit()) {
				showToast(
					'De vragenlijst kan niet ingeleverd worden, er zijn geflagde en/of onbeantwoorde vragen.',
					ToastSeverity.Warning
				);
				return;
			}
			await SubmitHealthCheck(healthCheck.id, healthCheck.versionId);
			goto('/submitted');
		}}
	>
		Afronden
	</button>
</CardShell>

<style lang="postcss">
	.green {
		@apply bg-green-200 shadow-green-400/50;
	}

	.green .icon {
		background-image: url('./icons/smile.svg');
	}

	.yellow {
		@apply bg-yellow-200 shadow-yellow-400/50;
	}

	.yellow .icon {
		background-image: url('./icons/indifferent.svg');
	}

	.red {
		@apply bg-red-200 shadow-red-400/50;
	}

	.red .icon {
		background-image: url('./icons/sad.svg');
	}

	.flag {
		@apply !bg-zinc-900 !text-zinc-100;
	}
</style>

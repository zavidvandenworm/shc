<script lang="ts">
	import { ColorEnum } from '$lib/api/models';
	import { fly } from 'svelte/transition';
	import CardShell from './CardShell.svelte';

	export let healthCheck: any;
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
	<div class="grow overflow-y-auto overflow-x-visible my-4 flex flex-col gap-2">
		{#each healthCheck.questions as question}
			<div
				class="px-4 py-3 bg-zinc-100 font-semibold rounded flex items-center"
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
			</div>
		{/each}
	</div>

	<button
		class="button"
		on:click={() => {
			if (!isReadyToSubmit()) {
				alert('Not ready to submit.');
				return;
			}
		}}
	>
		Afronden
	</button>
</CardShell>

<style lang="postcss">
	.green {
		@apply bg-green-200;
	}

	.green .icon {
		background-image: url('./icons/smile.svg');
	}

	.yellow {
		@apply bg-yellow-200;
	}

	.yellow .icon {
		background-image: url('./icons/indifferent.svg');
	}

	.red {
		@apply bg-red-200;
	}

	.red .icon {
		background-image: url('./icons/sad.svg');
	}

	.flag {
		@apply !bg-zinc-900 !text-zinc-100;
	}
</style>

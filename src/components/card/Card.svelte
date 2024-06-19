<script lang="ts">
	import { type Question, ColorEnum } from '$lib/api/models';
	import { fly } from 'svelte/transition';
	import Rate from './Rate.svelte';
	import { CompleteComment } from '$lib/api/api';

	let changeEvent = new Event('questionChanged');

	export let question: Question;
	export let questionCurrent: number;
</script>

<div
	in:fly={{ y: 100, delay: 300, duration: 300 }}
	out:fly={{ y: 100, delay: 0, duration: 300 }}
	class:green={question.answer?.answerColor == ColorEnum.Green}
	class:yellow={question.answer?.answerColor == ColorEnum.Yellow}
	class:red={question.answer?.answerColor == ColorEnum.Red}
	class="transition-all shadow-xl h-full sm:h-[39rem] sm:max-w-[30rem] mx-auto p-9 sm:rounded-3xl bg-zinc-50 transform card flex flex-col"
	style="transform: rotateY({questionCurrent * 180}deg) scaleX({questionCurrent % 2 == 0 ? 1 : -1})"
>
	<div class="flex-grow">
		<div class="flex items-center h-22">
			<span class="text-2xl font-semibold block">{question.title}</span>
			<button
				class="p-2 rounded-lg hover:bg-zinc-200 min-w-14 min-h-14 transition-all"
				class:!bg-zinc-800={question.answer?.isFlagged}
				class:text-zinc-50={question.answer?.isFlagged}
				on:click={() => {
					question.answer.isFlagged = !question.answer.isFlagged;
				}}><span class="material-symbols-outlined text-3xl">flag</span></button
			>
		</div>
		<p class="text-lg flex-grow my-4">
			{question.description}
		</p>
	</div>

	<Rate bind:selected={question.answer.answerColor} />
	<div class="h-40 w-full block relative rounded-xl overflow-hidden">
		<textarea
			bind:value={question.answer.comment}
			on:change={() => document.dispatchEvent(changeEvent)}
			placeholder="Comment..."
			class="block text-lg w-full p-3 outline-none bg-zinc-500/5 h-40 resize-none text-zinc-950"
		></textarea>
		<button
			on:click={async () => {
				question.answer.comment = await CompleteComment(question.answer.comment, question.title);
				document.dispatchEvent(changeEvent);
			}}
			class="absolute flex items-center justify-center aspect-square w-12 rounded-xl text-zinc-500 hover:text-zinc-900 right-0 bottom-0 hover:bg-zinc-950/5 transition-all active:bg-zinc-950/10"
		>
			<span class="material-symbols-outlined">verified</span>
		</button>
	</div>
</div>

<style lang="postcss">
	.green {
		@apply from-green-100 to-zinc-50 bg-gradient-to-t;
	}
	.yellow {
		@apply from-yellow-100 to-zinc-50 bg-gradient-to-t;
	}
	.red {
		@apply from-red-100 to-zinc-50 bg-gradient-to-t;
	}
</style>

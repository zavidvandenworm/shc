<script lang="ts">
	export let questionCurrent: number;
	export let questionCount: number;

	function pageIndicator() {
		if (questionCurrent == -1) {
			return 'Informatie';
		} else if (questionCurrent >= 0 && questionCurrent < questionCount) {
			return 'Vraag ' + (questionCurrent + 1);
		} else {
			return 'Samenvatting';
		}
	}

	let pageText: string;

	$: {
		questionCurrent;
		pageText = pageIndicator();
	}
</script>

<div
	class="h-20 sm:rounded-lg sm:mt-4 inline-flex w-full sm:w-max mx-auto justify-center items-center gap-4 text-xl font-semibold select-none bg-zinc-800 text-zinc-50 px-4"
>
	<button
		class="nav"
		class:disabled={questionCurrent == -1}
		on:click={() => {
			questionCurrent = -1;
		}}
	>
		<span class="material-symbols-outlined"> keyboard_double_arrow_left </span>
	</button>
	<button
		class:disabled={questionCurrent == -1}
		class="nav"
		on:click={() => {
			questionCurrent = questionCurrent === -1 ? questionCurrent : questionCurrent - 1;
		}}
	>
		<span class="material-symbols-outlined">keyboard_arrow_left</span>
	</button>
	<div class="flex items-center justify-center w-28">
		{pageText}
	</div>
	<button
		class="nav"
		class:disabled={questionCurrent == questionCount}
		on:click={() => {
			questionCurrent = questionCurrent >= questionCount ? questionCurrent : questionCurrent + 1;
		}}
	>
		<span class="material-symbols-outlined"> keyboard_arrow_right </span>
	</button>
	<button
		class="nav"
		class:disabled={questionCurrent == questionCount}
		on:click={() => {
			questionCurrent = questionCount;
		}}
	>
		<span class="material-symbols-outlined"> keyboard_double_arrow_right </span>
	</button>
</div>

<style lang="postcss">
	.nav {
		@apply block aspect-square text-zinc-100 hover:text-zinc-50 select-none;
	}
	.nav .material-symbols-outlined {
		@apply text-5xl;
	}

	.disabled {
		@apply text-zinc-50/40 hover:text-zinc-50/40 pointer-events-none;
	}
</style>

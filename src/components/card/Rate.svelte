<script lang="ts">
	import { ColorEnum } from '$lib/api/models';
	import { questionChangeEvent } from '$lib/events';

	export let selected: ColorEnum | null;

	function rate(answer: ColorEnum) {
		if (selected == answer) {
			selected = null;
			document.dispatchEvent(questionChangeEvent);
			return;
		}
		selected = answer;
		document.dispatchEvent(questionChangeEvent);
	}
</script>

<div class="flex justify-between mb-4 border-y py-4 gap-4">
	<button
		class:active={selected == ColorEnum.Green}
		class:deactivated={selected != null && selected != ColorEnum.Green}
		on:click={() => {
			rate(ColorEnum.Green);
		}}
		class="card-button bg-green-400 shadow-green-400/40 shadow-lg"
		on:click={() => {}}
	>
		<img alt="icon" src="/icons/smile.svg" />
	</button>
	<button
		class:active={selected == ColorEnum.Yellow}
		class:deactivated={selected != null && selected != ColorEnum.Yellow}
		on:click={() => {
			rate(ColorEnum.Yellow);
		}}
		class="card-button bg-yellow-400 shadow-yellow-400/40 shadow-lg"
	>
		<img alt="icon" src="icons/indifferent.svg" />
	</button>
	<button
		class:active={selected == ColorEnum.Red}
		class:deactivated={selected != null && selected != ColorEnum.Red}
		on:click={() => {
			rate(ColorEnum.Red);
		}}
		class="card-button bg-red-400 shadow-red-400/40 shadow-lg"
	>
		<img alt="icon" src="icons/sad.svg" />
	</button>
</div>

<style lang="postcss">
	.card-button {
		@apply aspect-square w-full rounded-xl transition-all flex justify-center items-center hover:-translate-y-1 hover:!bg-opacity-80;
	}
	.card-button img {
		@apply bg-no-repeat bg-center aspect-square w-16 transition-all;
	}

	.active {
		@apply !-translate-y-2;
	}

	.active img {
		@apply shadow-sm;
	}

	.deactivated {
		@apply !bg-zinc-200 !shadow-none;
	}
</style>

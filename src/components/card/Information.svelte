<script lang="ts">
	import { fly } from 'svelte/transition';
	import CardShell from './CardShell.svelte';

	export let healthCheck: any;
	export let questionCurrent: number;

	document.addEventListener('questionChanged', () => {
		alert('q changed: ' + healthCheck.question![questionCurrent].title);
	});
</script>

<CardShell>
	<div>
		<span class="text-3xl font-semibold flex-grow">{healthCheck.title}</span>
	</div>
	<div class="grow">
		<img
			src={healthCheck.company.logo}
			alt="logo"
			class="w-40 h-40 rounded-xl mt-3 bg-zinc-200 float-right border border-zinc-300"
		/>
		<p class="text-xl my-4 block">
			{healthCheck.description}
		</p>
	</div>

	<button
		class="p-3 bg-yellow-400 rounded-lg hover:bg-yellow-300 w-full flex items-center justify-center gap-3 font-semibold text-lg transition-all"
		on:click={() => {
			questionCurrent = 0;
		}}
	>
		Begin met invullen
	</button>
</CardShell>

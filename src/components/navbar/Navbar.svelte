<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	let collapsed: boolean = false;
</script>

<div class="flex items-start text-zinc-100 font-semibold z-20">
	<div
		class="bg-zinc-900 text-xl w-36 h-full sm:h-36 sm:rounded-br-[30%] inline-flex justify-center items-center"
	>
		<span class="w-min text-sm sm:text-lg">SQUAD HEALTH CHECK</span>
	</div>
	<div class="grow justify-center items-center text-2xl bg-zinc-900 inline-flex h-24">
		<div class="flex align-middle items-center gap-4">
			<img src="favicon.png" class="w-10 h-10" alt="rockstars logo" />ROCKSTARS
		</div>
		<button
			class="absolute right-0 p-2 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-800/90 aspect-square w-24"
			on:click={() => (collapsed = !collapsed)}
		>
			<span class="material-symbols-outlined"> menu </span>
		</button>
	</div>
</div>

{#if collapsed}
	<button transition:fade={{ duration: 200 }} class="bg-black/50 inset-0 absolute z-10"></button>
	<div
		transition:fly={{ x: 200, duration: 200 }}
		class="absolute top-24 bottom-0 right-0 w-72 bg-zinc-900 z-10"
	></div>
{/if}

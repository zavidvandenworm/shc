<script lang="ts">
	import { GetLinkFromIdAndVersion } from '$lib/api/api';
	import type { Questionnaire, User } from '$lib/api/models';
	import { UserHealthChecks, UserStore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	let collapsed: boolean = false;

	let user: User | null;
	let healthChecks: Array<Questionnaire> | null;
	let uniqueLinks: Array<{ healthCheck: number; uniqueLink: string }> = [];

	onMount(() => {
		UserStore.subscribe((value) => {
			user = value;
		});
		UserHealthChecks.subscribe((value) => {
			if (value == null) {
				healthChecks = null;
				return;
			}

			const unique = [...new Map(value!.map((item) => [item.title, item])).values()];
			unique.forEach(async (uhc) =>
				uniqueLinks.push({
					healthCheck: uhc.id,
					uniqueLink: (await GetLinkFromIdAndVersion(uhc.id, uhc.versionId)).uniqueLink
				})
			);
			healthChecks = unique;
		});
	});
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
		class="absolute top-24 bottom-0 right-0 w-72 bg-zinc-900 z-10 p-5"
	>
		{#if user != null}
			<span class="block text-lg text-zinc-50 font-semibold mb-4">Goedendag, {user.name}.</span>
			{#if healthChecks != null}
				{#each healthChecks as healthCheck}
					<a
						href={uniqueLinks.find((u) => u.healthCheck == healthCheck.id)?.uniqueLink}
						class="text-zinc-100 p-3 mb-2 flex hover:bg-zinc-800 rounded-lg items-center w-full"
					>
						<span class="text-zinc-100">{healthCheck.title}</span>
					</a>
				{/each}
			{:else}
				<span class="text-zinc-200 text-md animate-pulse">Uw vragenlijsten worden opgehaald...</span
				>{/if}
		{:else}
			<span>Om uw informatie te zien, opent u eerst een vragenlijst.</span>
		{/if}
	</div>
{/if}

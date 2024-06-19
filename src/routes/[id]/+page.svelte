<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Navigation from '../../components/card/Navigation.svelte';
	import Card from '../../components/card/Card.svelte';
	import { fade, fly } from 'svelte/transition';
	import Information from '../../components/card/Information.svelte';
	import Summary from '../../components/card/Summary.svelte';
	import { GetHealthCheck } from '$lib/api/api';
	import type { Questionnaire } from '$lib/api/models';

	let id: string;
	let notFound: boolean = false;

	let monitorChanges = false;

	onMount(async () => {
		id = $page.params.id;
		let hc: Questionnaire;
		try {
			hc = await GetHealthCheck(id);
		} catch (error) {
			notFound = true;
			return;
		}

		for (let question of hc.questions) {
			if (question.answer == null) {
				question.answer = {
					id: 0,
					answerColor: null,
					comment: '',
					isFlagged: false
				};
			}
		}
		healthCheck = hc;
		monitorChanges = true;
	});

	let questionCurrent = -1;

	let healthCheck: Questionnaire | null;
</script>

<div class="h-full flex flex-col sm:justify-center">
	{#if notFound}
		<div
			in:fly={{ duration: 500, y: 100 }}
			class="flex justify-center items-center w-max flex-col mx-auto"
		>
			<span class="text-3xl font-semibold">Vragenlijst niet gevonden.</span>
			<a href="/" class="button mt-3">Ga terug</a>
		</div>
	{/if}
	{#if healthCheck == null && notFound == false}
		<div class="w-full flex items-center justify-center">
			<span class="material-symbols-outlined text-9xl animate-spin"> refresh </span>
		</div>
	{:else if notFound == false && healthCheck != null}
		<div class="sm:h-[39rem] h-full" in:fade={{ delay: 300, duration: 200 }}>
			{#if questionCurrent > -1 && questionCurrent < healthCheck.questions.length}
				<Card bind:questionCurrent bind:question={healthCheck.questions[questionCurrent]} />
			{:else if questionCurrent == -1}
				<Information bind:questionCurrent {healthCheck} />
			{:else}
				<Summary bind:questionCurrent {healthCheck} />
			{/if}
		</div>
		<Navigation
			bind:questionCurrent
			questionCount={healthCheck.questions == null ? 0 : healthCheck.questions.length}
		/>
	{/if}
</div>

<script lang="ts">
	let url: string = '';
</script>

<div class="h-full w-full sm:w-max mx-auto flex flex-col gap-2 justify-center items-center">
	<div class="w-max">
		<span class="text-zinc-800 font-semibold text-xl mb-2 block">Voer een healthcheck-code in</span>
		<input name="url-input" type="text" bind:value={url} class="text-input" />
	</div>
	<a href="/{url}" class="button">Open</a>
</div>

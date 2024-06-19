<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

<div
	in:fade={{ delay: 300, duration: 300 }}
	out:fade={{ duration: 300 }}
	class="transition-all shadow-xl h-full sm:h-[39rem] sm:max-w-[30rem] mx-auto p-9 sm:rounded-3xl bg-zinc-50 transform card flex flex-col"
>
	<slot></slot>
</div>

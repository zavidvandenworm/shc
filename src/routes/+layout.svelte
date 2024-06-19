<script lang="ts">
	import '../app.css';
	import Navbar from '../components/navbar/Navbar.svelte';
</script>

<div class="flex flex-col bg-yellow-400/90 h-full">
	<Navbar />
	<slot></slot>
</div>

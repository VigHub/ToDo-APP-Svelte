<script lang="ts">
	import { page } from '$app/stores';

	let elements = $page.data.pok;

	console.log(elements);
</script>

<div>
	{#each elements as el}
		<p>{el.name}</p>
	{/each}
</div>

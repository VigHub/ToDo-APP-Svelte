<script lang="ts">
	import { filterStore, toDosStore } from '../store';
</script>

<div class="btn-group">
	<button
		class={'btn btn-sm ' + ($filterStore === 'ALL' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('ALL')}
	>
		All
	</button>
	<button
		class={'btn btn-sm ' + ($filterStore === 'COMPLETED' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('COMPLETED')}
	>
		Completed
	</button>
	<button
		class={'btn btn-sm ' + ($filterStore === 'NOT_COMPLETED' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('NOT_COMPLETED')}
	>
		Not completed
	</button>
</div>
<div class="btn-group ms-1">
	<button
		class="btn btn-sm btn-outline-secondary"
		on:click={() => {
			toDosStore.update((toDosValues) => toDosValues.filter((todo) => !todo.completed));
		}}
	>
		Remove completed
	</button>
</div>
<div>
	<button class="btn btn-link ms-1 text-dark round-arrow" on:click={() => {}}>
		<i class="bi bi-arrow-clockwise " />
	</button>
</div>

<style>
	.round-arrow {
		transition: transform 0.5s ease-in-out;
	}

	.round-arrow:hover {
		transform: rotate(360deg);
	}
</style>

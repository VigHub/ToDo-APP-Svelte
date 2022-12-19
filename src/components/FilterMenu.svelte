<script lang="ts">
	import { filterStore, toDosStore } from '../store';

	import type { Filter } from '../models';

	let filter: Filter;
	filterStore.subscribe((filterValue) => (filter = filterValue));
</script>

<div class="btn-group">
	<button
		class={'btn btn-sm ' + (filter === 'ALL' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('ALL')}
	>
		Tutti
	</button>
	<button
		class={'btn btn-sm ' + (filter === 'COMPLETED' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('COMPLETED')}
	>
		Completati
	</button>
	<button
		class={'btn btn-sm ' + (filter === 'NOT_COMPLETED' ? 'btn-svelte' : 'btn-outline-danger')}
		on:click={() => filterStore.set('NOT_COMPLETED')}
	>
		Non completati
	</button>
</div>
<div class="btn-group ms-1">
	<button
		class="btn btn-sm btn-outline-secondary"
		on:click={() => {
			toDosStore.update((toDosValues) => toDosValues.filter((todo) => !todo.completed));
		}}
	>
		Rimuovi completati
	</button>
</div>
<div>
	<button class="btn btn-link ms-1 text-dark" on:click={() => {}}>
		<i class="bi bi-arrow-clockwise" />
	</button>
</div>

<style>
</style>

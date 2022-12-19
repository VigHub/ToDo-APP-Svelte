<script lang="ts">
	import type { ToDo } from 'src/models';
	import ItemPlaceholder from './ItemPlaceholder.svelte';
	import ToDoElement from './ToDoElement.svelte';

	export let items: Array<ToDo>;
	export let onClick: (item: number) => void;
	export let onDelete: (item: number) => void;
	export let isLoading: boolean;
</script>

{#if isLoading}
	{#each items as item, i}
		<ul class="list-group">
			<ItemPlaceholder index={i} />
		</ul>
	{/each}
{/if}

{#if items.length == 0 && !isLoading}
	<h3 class="text-center my-4">
		<p class="opacity-50">
			<small>Lista Vuota</small>
		</p>
	</h3>
{/if}

<ul class="list-group">
	{#each items as item, i}
		{#if item.requestId}
			<ItemPlaceholder index={i} />
		{:else}
			<ToDoElement todo={item} index={i} {onClick} {onDelete} />
		{/if}
	{/each}
</ul>

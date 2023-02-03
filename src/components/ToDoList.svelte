<script lang="ts">
	import type { ToDo } from 'src/models';
	import ItemPlaceholder from './ItemPlaceholder.svelte';
	import ToDoElement from './ToDoElement.svelte';
	import { slide } from 'svelte/transition';

	export let items: Array<ToDo>;
	export let onClick: (item: number) => void;
	export let onDelete: (item: number) => void;
</script>

{#if items.length == 0}
	<h3 class="text-center my-4">
		<p class="opacity-50">
			<small>Empty list</small>
		</p>
	</h3>
{/if}

<ul class="list-group">
	{#each items as item, i}
		{#if item.requestId}
			<ItemPlaceholder index={i} />
		{:else}
			<div in:slide>
				<ToDoElement todo={item} index={i} {onClick} {onDelete} />
			</div>
		{/if}
	{/each}
</ul>

<script lang="ts">
	import type { ToDo } from '../models';
	import { formatDistance } from 'date-fns';
	import { it } from 'date-fns/locale';

	export let index: number;
	export let todo: ToDo;
	export let onClick: (index: number) => void;
	export let onDelete: (index: number) => void;
</script>

<li class="list-group-item d-flex justify-content-between align-items-center todo ">
	<div class="d-flex flex-column">
		<div>
			<input
				type="checkbox"
				class="form-check-input me-1"
				checked={todo.completed}
				on:change={() => {
					onClick(index);
				}}
			/>
			<label
				class={'form-check-label ' + (todo.completed ? 'completed' : '')}
				for="title"
				style="font-weight: bold;">{todo.title}</label
			>
			{#if todo.description}
				<br />
				<span class={'ms-4 ' + (todo.completed ? 'completed' : '')}>
					{todo.description}
				</span>
				<br />
			{/if}
		</div>
		<div>
			<span class="caption todo-caption">
				Created {formatDistance(todo.created_at, new Date(), { addSuffix: true })}
			</span>
			{#if todo.completed && todo.completed_at}
				<span class="caption ms-1 todo-caption">
					- Completed {formatDistance(todo.completed_at, new Date(), { addSuffix: true })}
				</span>
			{/if}
		</div>
	</div>
	<div class="btn-group">
		<a
			href={`/todo/${todo.id}`}
			class="btn btn-link text-black-50"
			data-toggle="tooltip"
			data-placement="bottom"
			title="Edit ToDo"
		>
			<i class="edit" />
		</a>

		<button
			class="btn btn-link text-black-50"
			data-toggle="tooltip"
			data-placement="bottom"
			title="Remove ToDo"
			on:click={(e) => {
				e.preventDefault();
				onDelete(index);
			}}
		>
			<i class="trash" />
		</button>
	</div>
</li>

<style>
	.todo-caption {
		font-size: 8pt;
	}

	.completed {
		text-decoration: line-through;
	}

	.todo:hover {
		border: 2pt;
		border-style: solid;
		border-color: black;
		background-color: hsl(0, 0%, 86%);
	}
</style>

<script lang="ts">
	import type { ToDo } from '../models';
	import { formatDistance } from 'date-fns';
	import { it } from 'date-fns/locale';

	export let index: number;
	export let todo: ToDo;
	export let onClick: (index: number) => void;
	export let onDelete: (index: number) => void;
	const now = new Date();
</script>

<li
	class={'list-group-item d-flex justify-content-between align-items-center ' +
		(todo.completed ? 'completed' : '')}
>
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
			<label class="form-check-label" for="title">{todo.title}</label>
			{#if todo.description}
				<span class="caption ms-5">
					{todo.description}
				</span>
				<br />
			{/if}
		</div>
		<div>
			<span class="caption">
				Creato {formatDistance(todo.created_at, now, { addSuffix: true, locale: it })}
			</span>
			{#if todo.completed && todo.completed_at}
				<span class="caption ms-1">
					- Completato {formatDistance(now, todo.completed_at, { addSuffix: true, locale: it })}
				</span>
			{/if}
		</div>
	</div>
	<div class="btn-group">
		<a href={`/todo/${todo.id}`} class="btn btn-link text-black-50">
			<i class="edit" />
		</a>

		<button
			class="btn btn-link text-black-50"
			on:click={(e) => {
				e.preventDefault();
				onDelete(index);
			}}
		>
			<i class="trash" />
		</button>
	</div>
</li>

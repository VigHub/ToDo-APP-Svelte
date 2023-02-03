<script lang="ts">
	import { page } from '$app/stores';
	import { sendAdd, sendDelete, sendUpdate } from '../lib/api';
	import AddToDo from '../components/AddToDo.svelte';
	import FilterMenu from '../components/FilterMenu.svelte';
	import PieChart from '../components/PieChart.svelte';
	import ToDoList from '../components/ToDoList.svelte';
	import {
		createToDoFromTitle,
		filterCompleted,
		filterNotCompleted,
		type Filter,
		type ToDo
	} from '../models';
	import { errorStore, filterStore, toDosStore } from '../store';

	function filterToDos(todoList: Array<ToDo>, filter: Filter) {
		switch (filter) {
			case 'COMPLETED':
				return filterCompleted(todoList);
			case 'NOT_COMPLETED':
				return filterNotCompleted(todoList);
			case 'ALL':
			default:
				return todoList;
		}
	}

	toDosStore.set($page.data.todos as ToDo[]);

	$: toDos = $toDosStore;
	$: completedList = filterToDos(toDos, 'COMPLETED');
	$: filteredList = filterToDos(toDos, $filterStore);

	let error: string;
	errorStore.subscribe((errorValue) => (error = errorValue));

	const onAdd = async (title: string) => {
		const todo = createToDoFromTitle(title);
		const result = await sendAdd(todo);
		if (result) {
			toDosStore.update((toDosValues) => {
				toDosValues.push(todo);
				return toDosValues;
			});
		}
	};

	const onClick = async (itemNumber: number) => {
		const todo = toDos[itemNumber];
		if (todo) {
			todo.completed = !todo.completed;
			if (todo.completed) {
				todo.completed_at = new Date();
			} else {
				delete todo.completed_at;
			}
			const result = await sendUpdate(todo);
			if (result) {
				toDosStore.update((toDosValues) => {
					toDosValues[itemNumber] = todo;
					return toDosValues;
				});
			}
		}
	};

	const onDelete = async (index: number) => {
		const todo = toDos[index];
		if (todo) {
			const result = await sendDelete(todo.id);
			if (result) {
				toDosStore.update((toDosValues) => toDosValues.filter((td) => td.id !== todo.id));
			}
		}
	};
</script>

<section class="row justify-content-center">
	<div class="col-12 col-md-8 ">
		<AddToDo {onAdd} disabled={!toDos && !error} />
	</div>
</section>

<section class="row justify-content-center mt-4">
	<div class="col-12 col-md-8">
		<div class="row">
			<div class="col-12 col-lg-9 btn-toolbar">
				<FilterMenu />
			</div>
			<div class="col-12 col-lg-3 d-lg-flex justify-content-end align-items-center mt-2 mt-lg-0">
				<span>
					Completed {completedList.length} of {toDos?.length ?? 0}
				</span>
			</div>
		</div>
	</div>
</section>

<section class="row justify-content-center mb-4">
	<div class="col-12 col-md-8">
		<hr />
		<ToDoList items={filteredList} {onClick} {onDelete} />
	</div>
</section>

<section
	class="row justify-content-center"
	style="display: !toDos || toDos.length === 0 ? 'none' : '' }"
>
	<div class="col-12 col-md-3">
		<PieChart
			completed={filterCompleted(toDos).length}
			notCompleted={toDos.length - filterCompleted(toDos).length}
		/>
	</div>
</section>

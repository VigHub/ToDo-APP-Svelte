<script lang="ts">
	import AddToDo from '../components/AddToDo.svelte';
	import ToDoList from '../components/ToDoList.svelte';
	import FilterMenu from '../components/FilterMenu.svelte';
	import PieChart from '../components/PieChart.svelte';
	import {
		filterCompleted,
		filterNotCompleted,
		createToDoFromTitle,
		type ToDo,
		type Filter
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

	let filter: Filter;
	filterStore.subscribe((filterValue) => (filter = filterValue));

	let toDos: ToDo[];
	let completedList: ToDo[] = [];
	let filteredList: ToDo[] = [];
	toDosStore.subscribe((toDosValues) => {
		toDos = toDosValues;
		completedList = filterToDos(toDosValues, 'COMPLETED');
		filteredList = filterToDos(toDosValues, filter);
	});
	filterStore.subscribe((filterValue) => {
		filteredList = filterToDos(toDos, filterValue);
	});

	let error: string;
	errorStore.subscribe((errorValue) => (error = errorValue));

	const onAdd = (title: string) => {
		toDosStore.update((toDosValues) => {
			toDosValues.push(createToDoFromTitle(title));
			return toDosValues;
		});
	};

	const onClick = (itemNumber: number) => {
		const todo = toDos?.[itemNumber];
		if (todo) {
			todo.completed = !todo.completed;
			if (todo.completed) {
				todo.completed_at = new Date();
			} else {
				delete todo.completed_at;
			}
			toDosStore.update((toDosValues) => {
				toDosValues[itemNumber] = todo;
				return toDosValues;
			});
		}
	};

	const onDelete = async (index: number) => {
		const todo = toDos?.[index];
		if (todo) {
			toDosStore.update((toDosValues) => toDosValues.filter((td) => td.id !== todo.id));
		}
	};

	//   const onCleanup = useCallback(
	//     (e: React.MouseEvent<HTMLButtonElement>) => {
	//       e.preventDefault()
	//       dispatch(deleteCompletedToDoAction())
	//     },
	//     [dispatch]
	//   )
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
					Completati {completedList.length} di {toDos?.length ?? 0}
				</span>
			</div>
		</div>
	</div>
</section>

<section class="row justify-content-center mb-4">
	<div class="col-12 col-md-8">
		<hr />
		<ToDoList items={filteredList} {onClick} {onDelete} isLoading={!toDos && !error} />
	</div>
</section>

<section
	class="row justify-content-center"
	style="display: !toDos || toDos.length === 0 ? 'none' : '' }"
>
	<div class="col-12 col-md-3">
		<PieChart
			completed={completedList.length}
			notCompleted={(toDos?.length ?? 0) - completedList.length}
		/>
	</div>
</section>

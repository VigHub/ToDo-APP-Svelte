<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { sendUpdate } from '../../../lib/api';
	import type { ToDo } from '../../../models';

	let todo = $page.data.todo as ToDo;

	const schema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string()
	});

	const { form, errors, state, handleSubmit, handleReset, handleChange, isValid } = createForm({
		initialValues: todo,
		validationSchema: schema,
		onSubmit: async (values) => {
			const result = await sendUpdate(values);
			if (result) {
				handleReset();
				goto('/');
			}
		}
	});
</script>

<section class="row justify-content-center">
	<form on:submit={handleSubmit} class="col-12 col-md-6">
		<div>
			<label class="form-label label-edit-todo" for="title">Title</label>
			<input
				name="title"
				type="text"
				placeholder="Insert a ToDo"
				value={todo.title}
				id="todo-input"
				class={'form-control ' + ($errors.title ? 'is-invalid' : '')}
				on:keyup={handleChange}
			/>
			{#if $errors.title}
				<label class="text-danger" for="title">{$errors.title}</label>
			{/if}
		</div>
		<div>
			<label class="form-label mt-3 label-edit-todo" for="description">Description</label>
			<textarea
				name="description"
				placeholder="Add description"
				value={todo.description || ''}
				id="todo-input"
				class={'form-control ' + ($errors.description ? 'is-invalid' : '')}
				rows="5"
				on:keyup={handleChange}
			/>
		</div>
		<div class="d-flex justify-content-end mt-4">
			<a href="/" style="text-decoration: none; color: black; font-weight: bold;"
				>Back to the list</a
			>
		</div>
		<button class="btn btn-svelte mt-3" type="submit" disabled={!$isValid}> Edit </button>
	</form>
</section>

<style>
	.label-edit-todo {
		font-weight: bold;
	}
</style>

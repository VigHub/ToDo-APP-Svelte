<script lang="ts">
	import { page } from '$app/stores';
	import type { ToDo } from 'src/models';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { goto } from '$app/navigation';

	let todo = $page.data.todo as ToDo;

	const schema = yup.object().shape({
		title: yup.string().required(),
		description: yup.string()
	});

	const { form, errors, state, handleSubmit, handleReset, handleChange, isValid } = createForm({
		initialValues: todo,
		validationSchema: schema,
		onSubmit: async (values) => {
			const res = await fetch(`http://localhost:5000/api/todo/${todo.id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json;charset=UTF-8'
				},
				body: JSON.stringify(values)
			});
			const r = await res.json();
			console.log(r);
			if (r) {
				handleReset();
				goto('/');
			}
		}
	});
</script>

<section class="row justify-content-center">
	<form on:submit={handleSubmit} class="col-12 col-md-6">
		<div>
			<label class="form-label" for="title">Titolo</label>
			<input
				name="title"
				type="text"
				placeholder="Inserisci il todo"
				value={todo.title}
				id="todo-input"
				class={'form-control ' + ($errors.title ? 'is-invalid' : '')}
				on:keyup={handleChange}
			/>
		</div>
		<div>
			<label class="form-label mt-2" for="description">Descrizione</label>
			<textarea
				name="description"
				placeholder="Inserisci la descrizione"
				value={todo.description || ''}
				id="todo-input"
				class={'form-control ' + ($errors.description ? 'is-invalid' : '')}
				on:keyup={handleChange}
			/>
		</div>
		<div class="d-flex justify-content-end mt-4">
			<a href="/" style="text-decoration: none; color: black; font-weight: bold;"
				>Torna alla lista</a
			>
		</div>
		<button class="btn btn-svelte mt-3" type="submit" disabled={!$isValid}> Modifica </button>
		{#if $errors.title}
			<label class="text-danger" for="title">{$errors.title}</label>
		{/if}
	</form>
</section>

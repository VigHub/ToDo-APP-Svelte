<script lang="ts">
	import { createForm } from "svelte-forms-lib";
	import * as yup from "yup";

	export let onAdd: (title: string) => void;
	export let disabled: boolean;
	const schema = yup.object({
		title: yup.string().required()
	});

	const { form, errors, state, handleSubmit, handleReset, handleChange, isValid } = createForm({
		initialValues: { title: '' },
		validationSchema: schema,
		onSubmit: (values) => {
			onAdd(values.title);
			handleReset();
		},
	});
</script>

<form on:submit={handleSubmit}>
	<fieldset {disabled}>
		<div class="input-group">
			<div class="form-floating">
				<input
					name="title"
					type="text"
					placeholder="Inserisci il todo"
					id="todo-input"
					class={'form-control ' + ($errors.title ? 'is-invalid' : '')}
					on:keyup={handleChange}
				/>
				<label for="todo-input">Inserisci il todo</label>
			</div>

			<button class="btn btn-svelte" type="submit" disabled={!$isValid}> Aggiungi </button>
		</div>
		{#if $errors.title}
		<label class="text-danger" for="title">{$errors.title}</label>
		{/if}
	</fieldset>
</form>

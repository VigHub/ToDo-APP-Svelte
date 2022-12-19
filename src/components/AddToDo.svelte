<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	export let onAdd: (title: string) => void;
	export let disabled: boolean;
	const schema = yup.object({
		title: yup.string().required()
	});

	const { form, errors, state, handleSubmit, handleReset, handleChange } = createForm({
		initialValues: { title: '' },
		validationSchema: schema,
		onSubmit: (values) => {
			onAdd(values.title);
			handleReset();
		}
	});
</script>

<form on:submit={handleSubmit}>
	<fieldset {disabled}>
		<!-- <div class={'input-group' + $errors.title ? 'is-invalid' : ''}> -->
		<div class="input-group">
			<div class="form-floating">
				<input
					name="title"
					type="text"
					placeholder="Inserisci il todo"
					id="todo-input"
					class={'form-control ' + ($errors.title ? 'is-invalid' : '')}
					on:change={handleChange}
					bind:value={$form.title}
				/>
				<label for="todo-input">Inserisci il todo</label>
			</div>

			<button class="btn btn-svelte" type="submit" disabled={!$state.isValid}> Aggiungi </button>
		</div>
		<!-- {#if $errors.title}
			<div class="invalid-feedback">
				<small>{$errors.title}</small>
			</div>
		{/if} -->
	</fieldset>
</form>

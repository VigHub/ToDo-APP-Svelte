<script lang="ts">
	import type { Element } from 'svelte/types/compiler/interfaces';

	export let error: string;
	export let action: Element;
</script>

{#if !error}
	<slot />
{:else}
	<section class="row justify-content-center my-4">
		<div class="col-6 text-center">
			<p>Something went wrong, try later</p>
			<p>
				<small>{error}</small>
			</p>
			{action}
		</div>
	</section>
{/if}

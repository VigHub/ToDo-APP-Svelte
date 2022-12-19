<script lang="ts">
	export let index: number;
	$: width = 6 - 2 * (index % 3);
</script>

<li class="list-group-item d-flex justify-content-between align-items-center">
	<div class="flex-grow-1">
		<div class="placeholder-glow">
			<span class={`placeholder placeholder-lg col-${width}`} />
		</div>
		<div class="placeholder-glow">
			<span class={`placeholder placeholder-xs col-1`} />
		</div>
	</div>
	<div class="btn-group">
		<button class="btn btn-link opacity-0">
			<i class="trash" />
		</button>
	</div>
</li>

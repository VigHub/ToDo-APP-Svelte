<script lang="ts">
	import '../index.css';
	import '../ListToDo.css';
</script>

<nav class="navbar  color-nav sticky-top">
	<div class="container">
		<span class="navbar-text">Svelte & SvelteKit per tutti (o quasi)</span>
	</div>
</nav>

<div class="container">
	<section class="row justify-content-center ">
		<div class="col-12 col-lg-6 text-center">
			<h1 class="page-title">
				<span>Svelte & SvelteKit<br />per tutti (o quasi)</span>
			</h1>
		</div>
	</section>

	<slot />
</div>

<style>
	.color-nav {
		background-color: hsl(15, 100%, 55%);
		color: white;
	}
</style>

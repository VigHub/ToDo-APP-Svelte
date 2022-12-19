<script lang="ts">
	import { Pie } from 'svelte-chartjs';
	import 'chart.js/auto';

	export let completed: number = 0;
	export let notCompleted: number = 0;

	$: chartData = {
		labels: ['completati', 'non completati'],
		datasets: [
			{
				data: [completed, notCompleted],
				hoverOffset: 20,
				backgroundColor: ['hsl(0, 0%, 18%)', 'hsl(15, 100%, 55%)']
			}
		]
	};
</script>

<Pie data={chartData} width={300} height={300} options={{ responsive: true }} />

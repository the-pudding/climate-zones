<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let dataset = [];
	import { draw } from "svelte/transition";
	import { quadInOut } from "svelte/easing";
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
</script>

{#each dataset as data}
	<path
		transition:draw={{ duration: 0, delay: 0, easing: quadInOut }}
		d={path(data)}
	/>
{/each}

<style>
	path {
		fill: grey;
		stroke: none;
		stroke-width: 0.5;
	}
</style>

<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let dataset1 = [];
	import { draw } from "svelte/transition";
	import { quadInOut } from "svelte/easing";
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
</script>

<path d={path(dataset1)} />

<style>
	path {
		fill: black;
		stroke: white;
		stroke-width: 0.5;
	}
</style>

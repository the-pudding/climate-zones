<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let dataset = [];
	import { draw } from "svelte/transition";
	import { quadInOut } from "svelte/easing";
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
	export let value;
</script>

{#if (value == undefined) | (value == 0) | (value == 1)}
	{#each dataset as data}
		<path
			transition:draw={{ duration: 0, delay: 0, easing: quadInOut }}
			d={path(data)}
		/>
	{/each}
{/if}

<style>
	path {
		fill: none;
		stroke: grey;
		stroke-width: 0.5;
	}
</style>

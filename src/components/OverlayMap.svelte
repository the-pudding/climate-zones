<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let present = [];
	export let future = [];
	export let value;
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
	import { getColor } from "$actions/getColor.js";
</script>

<svg style={value == 1 ? "opacity: 1" : ""}>
	{#each present as data}
		<!-- Apply conditional styling based on the 'DN' column -->
		<path
			d={path(data)}
			style={`
				fill: ${getColor(data.properties.DN)};
				
				stroke-width: 0.5;
			`}
		/>
	{/each}
</svg>
<svg style={value == 2 ? "opacity: 1" : ""}>
	{#each future as data}
		<!-- Apply conditional styling based on the 'DN' column -->
		<path
			d={path(data)}
			style={`
				fill: ${getColor(data.properties.DN)};
				
				stroke-width: 0.5;
			`}
		/>
	{/each}
</svg>

<style>
	svg {
		opacity: 0;
		transition: opacity 1s ease;
	}
</style>

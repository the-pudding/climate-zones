<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let dataset1 = [];

	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
	// Function to determine color based on 'DN' value
	function getColor(DN) {
		console.log(DN);
		// Example color mapping based on 'DN' value
		if ([1, 2, 3].includes(DN)) {
			return "blue";
		} else if ([4, 5, 6, 7].includes(DN)) {
			return "red";
		} else if ([8, 9, 10, 11, 12, 13, 14, 15, 16].includes(DN)) {
			return "green";
		} else if ([17, 18, 19, 20].includes(DN)) {
			return "purple";
		} else if ([21, 22, 24].includes(DN)) {
			return "darkblue";
		} else if ([25, 27].includes(DN)) {
			return "#00ffff";
		} else if ([0].includes(DN)) {
			return "transparent";
		}
	}
</script>

<svg>
	{#each dataset1 as data}
		<!-- Apply conditional styling based on the 'DN' column -->
		<path
			d={path(data)}
			style="fill: {getColor(
				data.properties.DN
			)}; opacity: 0.5; stroke-width: 0.5;"
		/>
	{/each}
</svg>

<style>
	/* Define a function to determine the color based on the 'DN' value */
</style>

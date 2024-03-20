<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let present = [];
	export let future = [];
	export let value;
	import { fade } from "svelte/transition";
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
	import { getColor } from "$actions/getColor.js";
</script>

<svg>
	{#each present as data}
		<path
			class={`${
				data.properties.DN <= 3
					? "path-1"
					: data.properties.DN >= 4 && data.properties.DN <= 7
						? "path-2"
						: data.properties.DN >= 8 && data.properties.DN <= 16
							? "path-3"
							: data.properties.DN >= 17 && data.properties.DN <= 24
								? "path-4"
								: data.properties.DN >= 25 && data.properties.DN < 30
									? "path-5"
									: "path-6"
			}`}
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
		opacity: 0.75;
		transition: opacity 1s ease;
	}
	.path-1 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0;
	}
	.path-2 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}
	.path-3 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0s;
	}
	.path-4 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}
	.path-5 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0s;
	}
	.path-6 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0.2;
		}

		50% {
			opacity: 1;
		}
		100% {
			opacity: 0.2;
		}
	}
</style>

<script>
	import { geoPath, geoNaturalEarth1 } from "d3";
	export let present = [];
	export let future = [];
	export let cities = [];
	export let value;
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	const projection = geoNaturalEarth1();
	const path = geoPath(projection);
	import { getColor } from "$actions/getColor.js";
	import { getColorSimp } from "$actions/getColorSimp.js";
	import { get } from "svelte/store";
</script>

<svg style={value == undefined ? "opacity:1" : ""}>
	{#each present as data}
		<path
			class={"path"}
			id={`${
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

{#if (value == 1) | (value == 2)}
	<svg style="opacity:1">
		{#each present as data}
			<path
				style={`
				fill: ${value == 1 ? getColorSimp(data.properties.DN) : ""}
					  ${value == 2 ? getColor(data.properties.DN) : ""};
					  
			
				
				transition: fill 1s ease-in-out, scale 1s ease-in .4s,transform .3s ease-in 
				
			`}
				class={value == 1 ? `val1` : value == 2 ? `val2` : ""}
				d={path(data)}
			/>
		{/each}
	</svg>
{/if}

{#if value == 3}
	<svg style="opacity:1">
		{#each present as data}
			<path
				style={`
				fill: ${getColor(data.properties.DN)};
					  
				scale: 5   ;
				transform: translate(-400px, -57px);	
				
				
				
			`}
				class={"zoom"}
				d={path(data)}
			/>
		{/each}
	</svg>
	<svg style="opacity:1">
		{#each cities as data}
			<circle
				style={`
				
					  
				scale: 5;
				transform: translate(-400px, -57px);	
				
				
				
			`}
				cx={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[0]}
				cy={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[1]}
				fill={"none"}
				stroke={"black"}
				stroke-width={".4px"}
				r={0.5}
				class={"zoom"}
			/>
		{/each}
	</svg>
	<svg style="opacity:1">
		{#each cities as data}
			<text
				style={`scale: 5;
				transform: translate(-399px, -56px);;	
				`}
				x={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[0]}
				y={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[1]}
				r={2}
				font-size={".12em"}
				class={"zoom"}>{data.properties.name}</text
			>
		{/each}
	</svg>
{/if}

{#if value == 4}
	<svg style="opacity:1">
		{#each present as data}
			<path
				style={`
				fill: ${getColor(data.properties.DN)};
			`}
				class={"zoom"}
				d={path(data)}
			/>
		{/each}
	</svg>
	<svg style="opacity:1">
		{#each cities as data}
			<circle
				style={`

			`}
				cx={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[0]}
				cy={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[1]}
				fill={"none"}
				stroke={"black"}
				stroke-width={"1px"}
				r={2}
				class={"zoom"}
			/>
		{/each}
	</svg>
{/if}

{#if value == 5}
	<svg style="opacity:1">
		<text class="year-present">2023</text>
		{#each present as data}
			<path
				class="present"
				d={path(data)}
				style={`
			fill: ${getColor(data.properties.DN)};
			stroke-width: 0.5;
		`}
			/>
		{/each}
	</svg>
	<svg style="opacity:1">
		<text class="year-future">2070</text>
		{#each future as data}
			<path
				class="future"
				d={path(data)}
				style={`
				fill: ${getColor(data.properties.DN)};
				stroke-width: 0.5;
			`}
			/>
		{/each}
	</svg>
	<svg style="opacity:1">
		{#each cities as data}
			<circle
				style={`

			`}
				cx={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[0]}
				cy={projection([
					data.geometry.coordinates[0],
					data.geometry.coordinates[1]
				])[1]}
				fill={"none"}
				stroke={"black"}
				stroke-width={".5px"}
				r={2}
			/>
		{/each}
	</svg>
{/if}

<style>
	svg {
		opacity: 0;
		transition: opacity 1s ease;
	}
	#path-1 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0;
	}
	#path-2 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}

	#path-3 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0s;
	}
	#path-4 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}
	#path-5 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 0s;
	}
	#path-6 {
		opacity: 0.2;
		animation: fadeIn infinite alternate ease 4s;
		animation-delay: 2s;
	}
	.present {
		opacity: 0;
		animation: fadeIn1 infinite ease 6s;
	}
	.future {
		opacity: 0;
		animation: fadeIn infinite ease 6s;
	}
	.year-present {
		opacity: 0;
		position: absolute;
		z-index: 100;
		transform: translate(659px, 320px);
		font-size: 2.5em;
		animation: fadeIn1 infinite 6s;
		animation-delay: 0.2s;
	}
	.year-future {
		opacity: 0;
		position: absolute;
		z-index: 100;
		transform: translate(659px, 320px);
		font-size: 2.5em;
		animation: fadeIn infinite 6s;
		animation-delay: 0.2s;
	}
	.val1 {
		opacity: 1;
		animation: fadeIn2 1 ease 2s;
	}
	.val2 {
		opacity: 1;
		animation: fadeIn2 1 ease 2s;
	}
	.zoom {
		opacity: 1;
		animation: fadeIn2 1 ease 3s;
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	@keyframes fadeIn1 {
		0% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeIn2 {
		0% {
			opacity: 0;
		}

		100% {
			opacity: 1;
		}
	}
</style>

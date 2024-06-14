<script>
	import { line, style, svg } from "d3";
	import { onMount } from "svelte";
	import Line from "./layercake/Line.svelte";
	export let value;
	export let linesToDraw;
	export let isMobile;
	let canvasEl;
	let mounted = false;
	let pos = [];

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<svg
		width="100%"
		style="transform:{value == 13 && isMobile ? 'translate(0, -100px)' : ''}"
	>
		{#each linesToDraw as line}
			<line
				class="fill"
				x1={line[1][0]}
				x2={line[0][0]}
				y1={line[1][1]}
				y2={line[0][1]}
			/>
			<line
				class="stroke"
				x1={line[1][0]}
				x2={line[0][0]}
				y1={line[1][1]}
				y2={line[0][1]}
			/>
		{/each}
	</svg>
{/if}

<style>
	svg {
		position: absolute;
		width: 100vw;
		height: var(--viewport-height);
		z-index: 1;
		pointer-events: none;
		transform: translate(0, -150px);
	}
	line {
		stroke: black;
		stroke-width: 1px;
	}
	.stroke {
		stroke-dasharray: 5, 5;
	}
	.fill {
		stroke-width: 5px;
		opacity: 0.2;
		stroke: grey;
	}

	@media only screen and (max-width: 600px) {
		svg {
			z-index: 1;
			transform: translate(0, -20px);
		}
	}
</style>

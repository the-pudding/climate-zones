<script>
	import { line, style, svg } from "d3";
	import { onMount } from "svelte";
	import Line from "./layercake/Line.svelte";

	export let linesToDraw;
	let canvasEl;
	let mounted = false;
	let pos = [];

	// $: console.log(linesToDraw)

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<svg height="1000" width="1000">
		{#each linesToDraw as line}
			<line x1={line[1][0]} x2={line[0][0]} y1={line[1][1]} y2={line[0][1]} />
		{/each}
	</svg>
{/if}

<style>
	svg {
		position: absolute;
		width: 100vw;
		height: 100vh;
		z-index: 100000;
		pointer-events: none;
	}
	line {
		stroke: black;
		stroke-width: 1px;
		stroke-dasharray: 5, 5;
	}
</style>

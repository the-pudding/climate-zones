<script>
	import { line, style, svg } from "d3";
	import { onMount } from "svelte";
	import Line from "./layercake/Line.svelte";

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
	{#if isMobile}
		<svg
			height="1000"
			width="1000"
			style="
		
		transform: translate(0%, -2%);
	"
		>
			{#each linesToDraw as line}
				<line x1={line[1][0]} x2={line[0][0]} y1={line[1][1]} y2={line[0][1]} />
			{/each}
		</svg>
	{:else}
		<svg
			height="1000"
			width="1000"
			style="
		
		transform: translate(-3%, -10%);
	"
		>
			{#each linesToDraw as line}
				<line class="fill" x1={line[1][0]} x2={line[0][0]} y1={line[1][1]} y2={line[0][1]} />
				<line class="stroke" x1={line[1][0]} x2={line[0][0]} y1={line[1][1]} y2={line[0][1]} />
			{/each}
		</svg>
	{/if}
{/if}

<style>
	svg {
		position: absolute;
		width: 100vw;
		height: var(--viewport-height);
		z-index: 100000;
		pointer-events: none;
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
		opacity: .2;
		stroke: grey;
	}
			
</style>

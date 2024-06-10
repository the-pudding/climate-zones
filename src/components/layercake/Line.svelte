<script>
	import { getContext } from "svelte";
	import { line, curveLinear } from "d3";

	const { data, xGet, yGet } = getContext("LayerCake");

	export let stroke = "#ccc";

	export let curve = curveLinear;

	$: path = line().x($xGet).y($yGet).curve(curve);
	$: pathD = path($data);
</script>

<!-- <path class="stroke" d={pathD} {stroke} /> -->
<!-- <path class="fill fill-test" d={pathD} {stroke} /> -->

<style>
	.stroke {
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
	.fill {
		stroke: grey;
		stroke-width: 3px;
	}
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}
</style>

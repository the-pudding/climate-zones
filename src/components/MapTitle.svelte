<script>
	import { json } from "d3";
	import Marks from "$components/Marks.svelte";
	import OverlayMap from "$components/OverlayMap.svelte";
	import Mapbox from "$components/Mapbox.svelte";
	import Map from "./layercake/todo/Map.canvas.svelte";

	export let value;

	let dataset = [];
	let cities = [];
	let present = [];
	let future = [];
</script>

<div class="intro-map">
	<Mapbox {value} />
	<svg
		id="my_dataviz"
		viewBox="-100 0 1000 550"
		preserveAspectRatio="xMidYMid meet"
	>
	</svg>
</div>

<style>
	.intro-map {
		position: sticky;
		top: 100px;
		background-color: rgb(232, 232, 232);
		opacity: 1;
		transition: opacity 0.5s;
	}
	#my_dataviz {
		position: fixed;
	}
</style>

<script>
	import { json } from "d3";
	import Marks from "$components/Marks.svelte";
	import OverlayMap from "$components/OverlayMap.svelte";

	export let value;

	let dataset = [];

	let present = [];
	let future = [];

	json(
		"https://raw.githubusercontent.com/the-pudding/climate-zones/main/src/data/present_vector_v11.geojson"
	).then((data) => {
		present = data.features;
	});
	json(
		"https://raw.githubusercontent.com/the-pudding/climate-zones/main/src/data/future_vector_v1.geojson"
	).then((data) => {
		future = data.features;
	});
	json(
		"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
	).then((data) => {
		dataset = data.features;
	});

	$: value, console.log(value);
</script>

<div class="title" style={value >= 0 ? "opacity: 0" : "1"}>
	<h1 style="font-size:10em">Climate Zones</h1>
	<h2 style="font-size:2em">How your city will feel in the future</h2>
</div>
<div class="intro-map">
	<div class="map-viz">
		<svg
			id="my_dataviz"
			viewBox="-100 0 1000 550"
			preserveAspectRatio="xMidYMid meet"
		>
			<Marks {dataset} />
			<OverlayMap {value} {future} {present} />
		</svg>
	</div>
</div>

<style>
	.intro-map {
		position: sticky;
		width: 100%;
		height: 100%;
		top: 100px;
		background-color: rgb(232, 232, 232);
		opacity: 1;
	}
	.title {
		z-index: 100;
		text-align: center;
		position: absolute;

		font-weight: 700;
		color: black;
		line-height: 9em;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 1vw;
		width: 80%;
		transition: opacity 1s ease;
		opacity: 1;
	}
</style>

<script>
	import Mapbox from "$components/Mapbox.svelte";
	import Map from "./layercake/todo/Map.canvas.svelte";

	export let value;
</script>

<div class="intro-map">
	<Mapbox {value} />
	<svg id="my_dataviz" style="width:100%;height:100%;"> </svg>
</div>

<style>
	.intro-map {
		width: 100%;
		height: 100%;
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

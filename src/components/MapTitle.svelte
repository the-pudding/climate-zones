<script>
	import Mapbox from "$components/Mapbox.svelte";
	import Map from "./layercake/todo/Map.canvas.svelte";
	export let isMobile;
	export let value;
</script>

<div class="intro-map">
	<Mapbox {isMobile} {value} />
</div>

<style>
	.intro-map {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		background-color: rgb(232, 232, 232);
		opacity: 1;
		transition: opacity 0.5s;
		pointer-events: none;
	}
	#my_dataviz {
		position: fixed;
	}
</style>

<script>
	import { onMount } from "svelte";

	onMount(async () => {
		var canvas = document.getElementById("canvas"); // eslint-disable-line

		const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		const gl = canvas.getContext("webgl", { antialiasing: false });

		const wind = (window.wind = new WindGL(gl));
		wind.numParticles = 65536;
	});
</script>

<div><canvas id="canvas"></canvas></div>

<style>
	#canvas {
		display: flex;
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 0;
	}
</style>

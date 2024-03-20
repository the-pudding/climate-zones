<script>
	import { onMount } from "svelte";
	import { WindGL } from "$actions/wind-gl.js";
	import { json } from "d3";

	onMount(() => {
		// using var to work around a WebKit bug
		var canvas = document.getElementById("canvas"); // eslint-disable-line

		const pxRatio = Math.max(Math.floor(window.devicePixelRatio) || 1, 2);
		canvas.width = canvas.clientWidth;
		canvas.height = canvas.clientHeight;

		const gl = canvas.getContext("webgl", { antialiasing: false });

		const wind = (window.wind = new WindGL(gl));
		wind.numParticles = 65536;

		function frame() {
			if (wind.windData) {
				wind.draw();
			}
			requestAnimationFrame(frame);
		}
		frame();
		const gui = new dat.GUI();
		gui.add(wind, "numParticles", 1024, 589824);
		gui.add(wind, "fadeOpacity", 0.96, 0.999).step(0.001).updateDisplay();
		gui.add(wind, "speedFactor", 0.05, 1.0);
		gui.add(wind, "dropRate", 0, 0.1);
		gui.add(wind, "dropRateBump", 0, 0.2);
		const meta = {
			"2016-11-20+h": 0,
			"retina resolution": true,
			"github.com/mapbox/webgl-wind": function () {
				window.location = "https://github.com/mapbox/webgl-wind";
			}
		};
		gui.add(meta, "2016-11-20+h", 0, 48, 6).onFinishChange(updateWind);
		if (pxRatio !== 1) {
			gui.add(meta, "retina resolution").onFinishChange(updateRetina);
		}
		gui.add(meta, "github.com/mapbox/webgl-wind");
		updateWind();

		function updateWind() {
			json(
				"https://raw.githubusercontent.com/the-pudding/climate-zones/main/src/data/windata.json",
				function (windData) {
					const windImage = new Image();
					windData.image = windImage;
					windImage.src =
						"https://raw.githubusercontent.com/the-pudding/climate-zones/main/src/data/windata.png";
					windImage.onload = function () {
						wind.setWind(windData);
					};
				}
			);
		}
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

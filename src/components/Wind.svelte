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

		const windFiles = {
			0: "2016112000",
			6: "2016112006",
			12: "2016112012",
			18: "2016112018",
			24: "2016112100",
			30: "2016112106",
			36: "2016112112",
			42: "2016112118",
			48: "2016112200"
		};

		updateWind();

		function updateWind() {
			json("$data/2016112000.json", function (windData) {
				const windImage = new Image();
				windData.image = windImage;
				windImage.src = "$data/2016112000.png";
				windImage.onload = function () {
					wind.setWind(windData);
				};
			});
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

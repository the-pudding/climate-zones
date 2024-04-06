<script>
	import { onMount } from "svelte";
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
			0: "2016112000"
		};

		updateWind(0);

		function updateWind(name) {
			getJSON(dataWind, function (windData) {
				const windImage = new Image();
				windData.image = windImage;
				windImage.src = "../data/2016112000.png";
				windImage.onload = function () {
					wind.setWind(windData);
				};
			});
		}

		function getJSON(url, callback) {
			const xhr = new XMLHttpRequest();
			xhr.responseType = "json";
			xhr.open("get", url, true);
			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 300) {
					callback(xhr.response);
				} else {
					throw new Error(xhr.statusText);
				}
			};
			xhr.send();
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

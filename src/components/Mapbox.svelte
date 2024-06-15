<script>
	import mapboxgl from "mapbox-gl";
	import { getColor } from "$actions/getColor.js";
	import "mapbox-gl/dist/mapbox-gl.css";

	import { getColorSimp } from "$actions/getColorSimp.js";
	import { onMount, onDestroy } from "svelte";
	import { fade } from "svelte/transition";
	import MapPoints from "./layercake/todo/MapPoints.canvas.svelte";
	let map;
	let mapContainer;
	let lng, lat, zoom;
	lng = 0;
	lat = 0;
	let loaded = false;
	zoom = 1.3;
	let zoomLevel;
	export let value;

	$: console.log(value)

	onMount(() => {
		window.addEventListener("resize", () => {
			if (value == 0 || value == 1 || value == 2 || value == 5) {
				fitMapToBounds();
			} else {
				return;
			}
		});
		document
			.getElementById("aridMap")
			.addEventListener("mouseover", function (event) {
				// Your mouseover event handling code here
				map.setPaintProperty("main-layer", "fill-opacity", [
					"case",
					["all", [">", ["get", "DN"], 3], ["<=", ["get", "DN"], 7]],
					1,
					0.2
				]);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					if (e.id == "aridMap") {
						e.style.opacity = 1;
					} else {
						e.style.opacity = 0.5;
					}
				});
			});
		document
			.getElementById("aridMap")
			.addEventListener("mouseout", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", 1);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					e.style.opacity = 1;
				});
			});

		document
			.getElementById("tropicalMap")
			.addEventListener("mouseover", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", [
					"case",
					["all", [">", ["get", "DN"], 0], ["<=", ["get", "DN"], 3]],
					1,
					0.2
				]);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					if (e.id == "tropicalMap") {
						e.style.opacity = 1;
					} else {
						e.style.opacity = 0.5;
					}
				});
			});
		document
			.getElementById("tropicalMap")
			.addEventListener("mouseout", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", 1);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					e.style.opacity = 1;
				});
			});

		document
			.getElementById("tempMap")
			.addEventListener("mouseover", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", [
					"case",
					["all", [">", ["get", "DN"], 7], ["<=", ["get", "DN"], 16]],
					1,
					0.2
				]);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					if (e.id == "tempMap") {
						e.style.opacity = 1;
					} else {
						e.style.opacity = 0.5;
					}
				});
			});
		document
			.getElementById("tempMap")
			.addEventListener("mouseout", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", 1);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					e.style.opacity = 1;
				});
			});
		document
			.getElementById("coldMap")
			.addEventListener("mouseover", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", [
					"case",
					["all", [">", ["get", "DN"], 16], ["<=", ["get", "DN"], 28]],
					1,
					0.2
				]);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					if (e.id == "coldMap") {
						e.style.opacity = 1;
					} else {
						e.style.opacity = 0.5;
					}
				});
			});
		document
			.getElementById("coldMap")
			.addEventListener("mouseout", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", 1);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					e.style.opacity = 1;
				});
			});
		document
			.getElementById("polarMap")
			.addEventListener("mouseover", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", [
					"case",
					["all", [">", ["get", "DN"], 28], ["<=", ["get", "DN"], 36]],
					1,
					0.2
				]);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					if (e.id == "polarMap") {
						e.style.opacity = 1;
					} else {
						e.style.opacity = 0.5;
					}
				});
			});
		document
			.getElementById("polarMap")
			.addEventListener("mouseout", function (event) {
				map.setPaintProperty("main-layer", "fill-opacity", 1);
				[...document.getElementsByClassName("classMap")].forEach((e) => {
					e.style.opacity = 1;
				});
			});

		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new mapboxgl.Map({
			container: mapContainer,
			accessToken:
				"pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2xqc2g3N2o5MHAyMDNjdGhzM2V2cmR3NiJ9.3x1ManoY4deDkAGBuUMnSw",
			style: "mapbox://styles/dock4242/clvqhl9fj01oa01qrcse27w6z",
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom,
			maxBounds: [
				[-180, -90],
				[180, 90]
			],
			doubleClickZoom: false,
			touchZoomRotate: false,
			scrollZoom: false,
			dragPan: false,
			attributionControl: false // Hide attribution
		});

		function fitMapToBounds() {
			// Calculate the bounds for the entire world
			const bounds = [
				[-180, -90], // Southwest coordinates
				[180, 90] // Northeast coordinates
			];

			const mapSize = map.getContainer().getBoundingClientRect();

			zoomLevel = Math.min(
				Math.log2(mapSize.width / 460),
				Math.log2(mapSize.height / 280)
			);

			// Set the new zoom level and center the map
			map.setZoom(zoomLevel);
			map.setCenter([lng, lat]);
		}

		// Fit the map to the bounds initially
		fitMapToBounds();

		map.on("style.load", () => {
			map.addSource("cities", {
				type: "geojson",
				data: "assets/final_cities_v2.geojson"
			});
			map.addLayer({
				id: "cities-layer",
				type: "circle",
				source: "cities",
				paint: {
					"circle-radius": 3,
					"circle-color": "white",
					"circle-stroke-width": 1,
					"circle-opacity": 0,
					"circle-stroke-color": "black",
					"circle-stroke-opacity": 0,
					"circle-opacity-transition": { duration: 2000 }
				}
			});
			map.addLayer({
				id: "cities-labels",
				type: "symbol",
				source: "cities",
				layout: {
					"text-field": ["get", "name"],
					"text-size": 16,
					"text-variable-anchor": ["top", "bottom", "left", "right"],
					"text-radial-offset": 0.5,
					"text-justify": "auto",
					"text-font": [
						"DIN Pro Medium",
						"Open Sans Bold",
						"Arial Unicode MS Bold"
					]
				},
				paint: {
					"text-color": "black",
					"text-opacity": 0,
					"text-halo-color": "#FFF", // White halo color
					"text-halo-width": 1, // Halo width of 2 pixels
					"text-halo-blur": 1, // Halo width of 2 pixels
					"text-opacity-transition": { duration: 2000 }
				}
			});
			map.setPaintProperty("main-layer", "fill-color", [
				"case",
				["==", ["get", "DN"], 0],
				getColorSimp(0),
				["==", ["get", "DN"], 1],
				getColorSimp(1),
				["==", ["get", "DN"], 2],
				getColorSimp(2),
				["==", ["get", "DN"], 3],
				getColorSimp(3),
				// Repeat the pattern for up to 30 values
				["==", ["get", "DN"], 4],
				getColorSimp(4),
				["==", ["get", "DN"], 5],
				getColorSimp(5),
				["==", ["get", "DN"], 6],
				getColorSimp(6),
				["==", ["get", "DN"], 7],
				getColorSimp(7),
				["==", ["get", "DN"], 8],
				getColorSimp(8),
				["==", ["get", "DN"], 9],
				getColorSimp(9),
				["==", ["get", "DN"], 10],
				getColorSimp(10),
				["==", ["get", "DN"], 11],
				getColorSimp(11),
				["==", ["get", "DN"], 12],
				getColorSimp(12),
				["==", ["get", "DN"], 13],
				getColorSimp(13),
				["==", ["get", "DN"], 14],
				getColorSimp(14),
				["==", ["get", "DN"], 15],
				getColorSimp(15),
				["==", ["get", "DN"], 16],
				getColorSimp(16),
				["==", ["get", "DN"], 17],
				getColorSimp(17),
				["==", ["get", "DN"], 18],
				getColorSimp(18),
				["==", ["get", "DN"], 19],
				getColorSimp(19),
				["==", ["get", "DN"], 20],
				getColorSimp(20),
				["==", ["get", "DN"], 21],
				getColorSimp(21),
				["==", ["get", "DN"], 22],
				getColorSimp(22),
				["==", ["get", "DN"], 23],
				getColorSimp(23),
				["==", ["get", "DN"], 24],
				getColorSimp(24),
				["==", ["get", "DN"], 25],
				getColorSimp(25),
				["==", ["get", "DN"], 26],
				getColorSimp(26),
				["==", ["get", "DN"], 27],
				getColorSimp(27),
				["==", ["get", "DN"], 28],
				getColorSimp(28),
				["==", ["get", "DN"], 29],
				getColorSimp(29),
				["==", ["get", "DN"], 30],
				getColorSimp(30),
				"transparent" // Default color if none of the conditions are met
			]);
			map.setPaintProperty("present-layer1", "fill-color", [
				"case",
				["==", ["get", "DN"], 0],
				getColor(0),
				["==", ["get", "DN"], 1],
				getColor(1),
				["==", ["get", "DN"], 2],
				getColor(2),
				["==", ["get", "DN"], 3],
				getColor(3),
				// Repeat the pattern for up to 30 values
				["==", ["get", "DN"], 4],
				getColor(4),
				["==", ["get", "DN"], 5],
				getColor(5),
				["==", ["get", "DN"], 6],
				getColor(6),
				["==", ["get", "DN"], 7],
				getColor(7),
				["==", ["get", "DN"], 8],
				getColor(8),
				["==", ["get", "DN"], 9],
				getColor(9),
				["==", ["get", "DN"], 10],
				getColor(10),
				["==", ["get", "DN"], 11],
				getColor(11),
				["==", ["get", "DN"], 12],
				getColor(12),
				["==", ["get", "DN"], 13],
				getColor(13),
				["==", ["get", "DN"], 14],
				getColor(14),
				["==", ["get", "DN"], 15],
				getColor(15),
				["==", ["get", "DN"], 16],
				getColor(16),
				["==", ["get", "DN"], 17],
				getColor(17),
				["==", ["get", "DN"], 18],
				getColor(18),
				["==", ["get", "DN"], 19],
				getColor(19),
				["==", ["get", "DN"], 20],
				getColor(20),
				["==", ["get", "DN"], 21],
				getColor(21),
				["==", ["get", "DN"], 22],
				getColor(22),
				["==", ["get", "DN"], 23],
				getColor(23),
				["==", ["get", "DN"], 24],
				getColor(24),
				["==", ["get", "DN"], 25],
				getColor(25),
				["==", ["get", "DN"], 26],
				getColor(26),
				["==", ["get", "DN"], 27],
				getColor(27),
				["==", ["get", "DN"], 28],
				getColor(28),
				["==", ["get", "DN"], 29],
				getColor(29),
				["==", ["get", "DN"], 30],
				getColor(30),
				"transparent" // Default color if none of the conditions are met
			]);
			map.setPaintProperty("present-layer2", "fill-color", [
				"case",
				["==", ["get", "DN"], 0],
				getColor(0),
				["==", ["get", "DN"], 1],
				getColor(1),
				["==", ["get", "DN"], 2],
				getColor(2),
				["==", ["get", "DN"], 3],
				getColor(3),
				// Repeat the pattern for up to 30 values
				["==", ["get", "DN"], 4],
				getColor(4),
				["==", ["get", "DN"], 5],
				getColor(5),
				["==", ["get", "DN"], 6],
				getColor(6),
				["==", ["get", "DN"], 7],
				getColor(7),
				["==", ["get", "DN"], 8],
				getColor(8),
				["==", ["get", "DN"], 9],
				getColor(9),
				["==", ["get", "DN"], 10],
				getColor(10),
				["==", ["get", "DN"], 11],
				getColor(11),
				["==", ["get", "DN"], 12],
				getColor(12),
				["==", ["get", "DN"], 13],
				getColor(13),
				["==", ["get", "DN"], 14],
				getColor(14),
				["==", ["get", "DN"], 15],
				getColor(15),
				["==", ["get", "DN"], 16],
				getColor(16),
				["==", ["get", "DN"], 17],
				getColor(17),
				["==", ["get", "DN"], 18],
				getColor(18),
				["==", ["get", "DN"], 19],
				getColor(19),
				["==", ["get", "DN"], 20],
				getColor(20),
				["==", ["get", "DN"], 21],
				getColor(21),
				["==", ["get", "DN"], 22],
				getColor(22),
				["==", ["get", "DN"], 23],
				getColor(23),
				["==", ["get", "DN"], 24],
				getColor(24),
				["==", ["get", "DN"], 25],
				getColor(25),
				["==", ["get", "DN"], 26],
				getColor(26),
				["==", ["get", "DN"], 27],
				getColor(27),
				["==", ["get", "DN"], 28],
				getColor(28),
				["==", ["get", "DN"], 29],
				getColor(29),
				["==", ["get", "DN"], 30],
				getColor(30),
				"transparent" // Default color if none of the conditions are met
			]);
			map.setPaintProperty("present-layer3", "fill-color", [
				"case",
				["==", ["get", "DN"], 0],
				getColor(0),
				["==", ["get", "DN"], 1],
				getColor(1),
				["==", ["get", "DN"], 2],
				getColor(2),
				["==", ["get", "DN"], 3],
				getColor(3),
				// Repeat the pattern for up to 30 values
				["==", ["get", "DN"], 4],
				getColor(4),
				["==", ["get", "DN"], 5],
				getColor(5),
				["==", ["get", "DN"], 6],
				getColor(6),
				["==", ["get", "DN"], 7],
				getColor(7),
				["==", ["get", "DN"], 8],
				getColor(8),
				["==", ["get", "DN"], 9],
				getColor(9),
				["==", ["get", "DN"], 10],
				getColor(10),
				["==", ["get", "DN"], 11],
				getColor(11),
				["==", ["get", "DN"], 12],
				getColor(12),
				["==", ["get", "DN"], 13],
				getColor(13),
				["==", ["get", "DN"], 14],
				getColor(14),
				["==", ["get", "DN"], 15],
				getColor(15),
				["==", ["get", "DN"], 16],
				getColor(16),
				["==", ["get", "DN"], 17],
				getColor(17),
				["==", ["get", "DN"], 18],
				getColor(18),
				["==", ["get", "DN"], 19],
				getColor(19),
				["==", ["get", "DN"], 20],
				getColor(20),
				["==", ["get", "DN"], 21],
				getColor(21),
				["==", ["get", "DN"], 22],
				getColor(22),
				["==", ["get", "DN"], 23],
				getColor(23),
				["==", ["get", "DN"], 24],
				getColor(24),
				["==", ["get", "DN"], 25],
				getColor(25),
				["==", ["get", "DN"], 26],
				getColor(26),
				["==", ["get", "DN"], 27],
				getColor(27),
				["==", ["get", "DN"], 28],
				getColor(28),
				["==", ["get", "DN"], 29],
				getColor(29),
				["==", ["get", "DN"], 30],
				getColor(30),
				"transparent" // Default color if none of the conditions are met
			]);
			map.setPaintProperty("future-layer", "fill-color", [
				"case",
				["==", ["get", "DN"], 0],
				getColor(0),
				["==", ["get", "DN"], 1],
				getColor(1),
				["==", ["get", "DN"], 2],
				getColor(2),
				["==", ["get", "DN"], 3],
				getColor(3),
				// Repeat the pattern for up to 30 values
				["==", ["get", "DN"], 4],
				getColor(4),
				["==", ["get", "DN"], 5],
				getColor(5),
				["==", ["get", "DN"], 6],
				getColor(6),
				["==", ["get", "DN"], 7],
				getColor(7),
				["==", ["get", "DN"], 8],
				getColor(8),
				["==", ["get", "DN"], 9],
				getColor(9),
				["==", ["get", "DN"], 10],
				getColor(10),
				["==", ["get", "DN"], 11],
				getColor(11),
				["==", ["get", "DN"], 12],
				getColor(12),
				["==", ["get", "DN"], 13],
				getColor(13),
				["==", ["get", "DN"], 14],
				getColor(14),
				["==", ["get", "DN"], 15],
				getColor(15),
				["==", ["get", "DN"], 16],
				getColor(16),
				["==", ["get", "DN"], 17],
				getColor(17),
				["==", ["get", "DN"], 18],
				getColor(18),
				["==", ["get", "DN"], 19],
				getColor(19),
				["==", ["get", "DN"], 20],
				getColor(20),
				["==", ["get", "DN"], 21],
				getColor(21),
				["==", ["get", "DN"], 22],
				getColor(22),
				["==", ["get", "DN"], 23],
				getColor(23),
				["==", ["get", "DN"], 24],
				getColor(24),
				["==", ["get", "DN"], 25],
				getColor(25),
				["==", ["get", "DN"], 26],
				getColor(26),
				["==", ["get", "DN"], 27],
				getColor(27),
				["==", ["get", "DN"], 28],
				getColor(28),
				["==", ["get", "DN"], 29],
				getColor(29),
				["==", ["get", "DN"], 30],
				getColor(30),
				"transparent" // Default color if none of the conditions are met
			]);

			map.setPaintProperty("main-layer", "fill-opacity-transition", {
				duration: 2000
			});
			map.setPaintProperty("present-layer1", "fill-opacity-transition", {
				duration: 2000
			});
			map.setPaintProperty("present-layer2", "fill-opacity-transition", {
				duration: 2000
			});
			map.setPaintProperty("present-layer3", "fill-opacity-transition", {
				duration: 2000
			});
			map.setPaintProperty("future-layer", "fill-opacity-transition", {
				duration: 2000
			});
			map.addSource("video-source", {
				type: "video",
				urls: ["assets/wind6.mp4"],
				coordinates: [
					[-320, 90],
					[320, 90],
					[320, -90],
					[-320, -90]
				]
			});
			map.addLayer({
				id: "video-layer",
				type: "raster",
				source: "video-source",
				paint: {
					"raster-opacity": 0,
					"raster-opacity-transition": { duration: 2000 }
				}
			});

			loaded = true;
		});

		// At low zooms, complete a revolution every two minutes.
	});

	$: if (value === 0 && loaded) {
		map.setZoom(zoomLevel);
		map.setCenter([lng, lat]);
		document.getElementById("year1").style.opacity = 0;
		document.getElementById("year2").style.opacity = 0;

		setTimeout(() => {
			console.log(map.getStyle().layers);
			map.setPaintProperty("video-layer", "raster-opacity", 0);
			console.log("hio");
			map.setPaintProperty("main-layer", "fill-opacity", 0);
			map.setPaintProperty("present-layer2", "fill-opacity", 0);
			map.setPaintProperty("present-layer1", "fill-opacity", 0);
			map.setPaintProperty("present-layer3", "fill-opacity", 0);
			map.setPaintProperty("future-layer", "fill-opacity", 0);
			function fade() {
				if (value >= 1) {
					return;
				}
				var filter = ["<=", "DN", 7];

				// Set filter on layer
				map.setFilter("present-layer1", filter);

				map.setPaintProperty("present-layer1", "fill-opacity", 1);
				// After 2 seconds, fade out
				setTimeout(() => {
					map.setPaintProperty("present-layer1", "fill-opacity", 0);
					// After fade out, call fade function again after a delay
					setTimeout(fade, 2000);
				}, 2000);
				document.getElementById("year1").style.opacity = 0;
				document.getElementById("year2").style.opacity = 0;
			}
			function fade1() {
				if (value != 0) {
					return;
				}
				var filter = ["all", [">", "DN", 7], ["<=", "DN", 16]];

				// Set filter on layer
				map.setFilter("present-layer2", filter);

				map.setPaintProperty("present-layer2", "fill-opacity", 1);
				// After 2 seconds, fade out
				setTimeout(() => {
					map.setPaintProperty("present-layer2", "fill-opacity", 0);
					// After fade out, call fade function again after a delay
					setTimeout(fade1, 2000);
				}, 2000);
			}
			function fade2() {
				if (value >= 1) {
					return;
				}
				var filter = ["all", [">", "DN", 16]];

				// Set filter on layer
				map.setFilter("present-layer3", filter);

				map.setPaintProperty("present-layer3", "fill-opacity", 1);
				// After 2 seconds, fade out
				setTimeout(() => {
					map.setPaintProperty("present-layer3", "fill-opacity", 0);
					// After fade out, call fade function again after a delay
					setTimeout(fade2, 2000);
				}, 2000);
			}
			fade();
			setTimeout(() => {
				fade1();
			}, 1000);
			setTimeout(() => {
				fade2();
			}, 2000);
		}, 1000);
	}

	$: if (value === 1 && loaded) {
		map.setPaintProperty("video-layer", "raster-opacity", 0.45);
		console.log("cancel");

		map.setPaintProperty("present-layer1", "fill-opacity", 0);
		map.setPaintProperty("present-layer2", "fill-opacity", 0);
		map.setPaintProperty("present-layer3", "fill-opacity", 0);
		map.setPaintProperty("main-layer", "fill-opacity", 0);
	}
	$: if (value === 2 && loaded) {
		map.setPaintProperty("video-layer", "raster-opacity", 0);
		map.setPaintProperty("cities-layer", "circle-opacity", 0);
		map.setPaintProperty("cities-layer", "circle-stroke-opacity", 0);
		map.setPaintProperty("cities-labels", "text-opacity", 0);
		console.log("cancel");

		map.setPaintProperty("main-layer", "fill-opacity", 1);
		map.flyTo({
			center: [lng, lat],
			zoom: zoomLevel,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
	}
	$: if (value === 3 && loaded) {
		map.setPaintProperty("cities-layer", "circle-opacity", 1);
		map.setPaintProperty("cities-layer", "circle-stroke-opacity", 1);
		map.setPaintProperty("cities-labels", "text-opacity", 1);

		map.setFilter("cities-layer", [
			"in",
			"name",
			"Lisbon",
			"Casablanca",
			"Tunis",
			"Rome",
			"Milan",
			"Paris",
			"London",
			"Amsterdam",
			"Milan",
			"Athens",
			"Rome"
		]);
		map.setFilter("cities-labels", [
			"in",
			"name",
			"Lisbon",
			"Casablanca",
			"Tunis",
			"Rome",
			"Milan",
			"Paris",
			"London",
			"Amsterdam",
			"Milan",
			"Athens",
			"Rome"
		]);



		map.flyTo({
			center: [2.3522, 42.8566],
			zoom: 4,
			duration: 2000,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
		map.setPaintProperty("main-layer", "fill-color", [
			"case",
			["==", ["get", "DN"], 0],
			getColorSimp(0),
			["==", ["get", "DN"], 1],
			getColorSimp(1),
			["==", ["get", "DN"], 2],
			getColorSimp(2),
			["==", ["get", "DN"], 3],
			getColorSimp(3),
			// Repeat the pattern for up to 30 values
			["==", ["get", "DN"], 4],
			getColorSimp(4),
			["==", ["get", "DN"], 5],
			getColorSimp(5),
			["==", ["get", "DN"], 6],
			getColorSimp(6),
			["==", ["get", "DN"], 7],
			getColorSimp(7),
			["==", ["get", "DN"], 8],
			getColorSimp(8),
			["==", ["get", "DN"], 9],
			getColorSimp(9),
			["==", ["get", "DN"], 10],
			getColorSimp(10),
			["==", ["get", "DN"], 11],
			getColorSimp(11),
			["==", ["get", "DN"], 12],
			getColorSimp(12),
			["==", ["get", "DN"], 13],
			getColorSimp(13),
			["==", ["get", "DN"], 14],
			getColorSimp(14),
			["==", ["get", "DN"], 15],
			getColorSimp(15),
			["==", ["get", "DN"], 16],
			getColorSimp(16),
			["==", ["get", "DN"], 17],
			getColorSimp(17),
			["==", ["get", "DN"], 18],
			getColorSimp(18),
			["==", ["get", "DN"], 19],
			getColorSimp(19),
			["==", ["get", "DN"], 20],
			getColorSimp(20),
			["==", ["get", "DN"], 21],
			getColorSimp(21),
			["==", ["get", "DN"], 22],
			getColorSimp(22),
			["==", ["get", "DN"], 23],
			getColorSimp(23),
			["==", ["get", "DN"], 24],
			getColorSimp(24),
			["==", ["get", "DN"], 25],
			getColorSimp(25),
			["==", ["get", "DN"], 26],
			getColorSimp(26),
			["==", ["get", "DN"], 27],
			getColorSimp(27),
			["==", ["get", "DN"], 28],
			getColorSimp(28),
			["==", ["get", "DN"], 29],
			getColorSimp(29),
			["==", ["get", "DN"], 30],
			getColorSimp(30),
			"transparent" // Default color if none of the conditions are met
		]);

		map.setPaintProperty("main-layer", "fill-opacity", [
			"case",
			["all", [">", ["get", "DN"], 7], ["<=", ["get", "DN"], 16]],
			1,
			0 //set non temperate to 0
		]);
	}
	$: if (value === 4 && loaded) {
		document.getElementById("year1").style.opacity = 0;
		document.getElementById("year2").style.opacity = 0;

		map.flyTo({
			center: [2.3522, 42.8566],
			zoom: 4,
			duration: 2000,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});

		map.setFilter("cities-layer", [
			"in",
			"name",
			"Lisbon",
			"Casablanca",
			"Tunis",
			"Rome",
			"Milan",
			"Paris",
			"London",
			"Amsterdam",
			"Milan",
			"Athens",
			"Rome"
		]);
		map.setFilter("cities-labels", [
			"in",
			"name",
			"Lisbon",
			"Casablanca",
			"Tunis",
			"Rome",
			"Milan",
			"Paris",
			"London",
			"Amsterdam",
			"Milan",
			"Athens",
			"Rome"
		]);

		map.setPaintProperty("cities-layer", "circle-opacity", 1);
		map.setPaintProperty("cities-layer", "circle-stroke-opacity", 1);
		map.setPaintProperty("cities-labels", "text-opacity", 1);
		map.setPaintProperty("main-layer", "fill-color", [
			"case",
			["==", ["get", "DN"], 0],
			getColor(0),
			["==", ["get", "DN"], 1],
			getColor(1),
			["==", ["get", "DN"], 2],
			getColor(2),
			["==", ["get", "DN"], 3],
			getColor(3),
			// Repeat the pattern for up to 30 values
			["==", ["get", "DN"], 4],
			getColor(4),
			["==", ["get", "DN"], 5],
			getColor(5),
			["==", ["get", "DN"], 6],
			getColor(6),
			["==", ["get", "DN"], 7],
			getColor(7),
			["==", ["get", "DN"], 8],
			getColor(8),
			["==", ["get", "DN"], 9],
			getColor(9),
			["==", ["get", "DN"], 10],
			getColor(10),
			["==", ["get", "DN"], 11],
			getColor(11),
			["==", ["get", "DN"], 12],
			getColor(12),
			["==", ["get", "DN"], 13],
			getColor(13),
			["==", ["get", "DN"], 14],
			getColor(14),
			["==", ["get", "DN"], 15],
			getColor(15),
			["==", ["get", "DN"], 16],
			getColor(16),
			["==", ["get", "DN"], 17],
			getColor(17),
			["==", ["get", "DN"], 18],
			getColor(18),
			["==", ["get", "DN"], 19],
			getColor(19),
			["==", ["get", "DN"], 20],
			getColor(20),
			["==", ["get", "DN"], 21],
			getColor(21),
			["==", ["get", "DN"], 22],
			getColor(22),
			["==", ["get", "DN"], 23],
			getColor(23),
			["==", ["get", "DN"], 24],
			getColor(24),
			["==", ["get", "DN"], 25],
			getColor(25),
			["==", ["get", "DN"], 26],
			getColor(26),
			["==", ["get", "DN"], 27],
			getColor(27),
			["==", ["get", "DN"], 28],
			getColor(28),
			["==", ["get", "DN"], 29],
			getColor(29),
			["==", ["get", "DN"], 30],
			getColor(30),
			"transparent" // Default color if none of the conditions are met
		]);
		map.setPaintProperty("main-layer", "fill-opacity", [

			"match",
            ["get", "DN"],
            [8,9,10,11,12,13,14,15], // Array of possible values
			1,
			0//set non temperate to zero
		]);
	}
	$: if (value === 5 && loaded) {
		map.setFilter("cities-layer", [
			"in",
			"name",
			"Taipei",
			"Sao Paulo",
			"Austin",
			"Buenos Aires",
			"Shanghai",
			"Atlanta",
			"Tokyo",
			"Washington, D.C.",
			"Milan"
		]);
		map.setFilter("cities-labels", [
			"in",
			"name",
			"Taipei",
			"Sao Paulo",
			"Austin",
			"Buenos Aires",
			"Shanghai",
			"Atlanta",
			"Tokyo",
			"Washington, D.C.",
			"Milan"
		]);

		document.getElementById("year1").style.opacity = 0;
		document.getElementById("year2").style.opacity = 0;
		map.flyTo({
			center: [lng, lat],
			zoom: zoomLevel,
			essential: true // this animation is considered essential with respect to prefers-reduced-motion
		});
		map.setPaintProperty("main-layer", "fill-color", [
			"case",
			["==", ["get", "DN"], 0],
			getColor(0),
			["==", ["get", "DN"], 1],
			getColor(1),
			["==", ["get", "DN"], 2],
			getColor(2),
			["==", ["get", "DN"], 3],
			getColor(3),
			// Repeat the pattern for up to 30 values
			["==", ["get", "DN"], 4],
			getColor(4),
			["==", ["get", "DN"], 5],
			getColor(5),
			["==", ["get", "DN"], 6],
			getColor(6),
			["==", ["get", "DN"], 7],
			getColor(7),
			["==", ["get", "DN"], 8],
			getColor(8),
			["==", ["get", "DN"], 9],
			getColor(9),
			["==", ["get", "DN"], 10],
			getColor(10),
			["==", ["get", "DN"], 11],
			getColor(11),
			["==", ["get", "DN"], 12],
			getColor(12),
			["==", ["get", "DN"], 13],
			getColor(13),
			["==", ["get", "DN"], 14],
			getColor(14),
			["==", ["get", "DN"], 15],
			getColor(15),
			["==", ["get", "DN"], 16],
			getColor(16),
			["==", ["get", "DN"], 17],
			getColor(17),
			["==", ["get", "DN"], 18],
			getColor(18),
			["==", ["get", "DN"], 19],
			getColor(19),
			["==", ["get", "DN"], 20],
			getColor(20),
			["==", ["get", "DN"], 21],
			getColor(21),
			["==", ["get", "DN"], 22],
			getColor(22),
			["==", ["get", "DN"], 23],
			getColor(23),
			["==", ["get", "DN"], 24],
			getColor(24),
			["==", ["get", "DN"], 25],
			getColor(25),
			["==", ["get", "DN"], 26],
			getColor(26),
			["==", ["get", "DN"], 27],
			getColor(27),
			["==", ["get", "DN"], 28],
			getColor(28),
			["==", ["get", "DN"], 29],
			getColor(29),
			["==", ["get", "DN"], 30],
			getColor(30),
			"transparent" // Default color if none of the conditions are met
		]);
		map.setPaintProperty("main-layer", "fill-opacity", [
			"case",
			["all", ["==", ["get", "DN"], 14]],
			1,
			0.1
		]);
		map.setPaintProperty("future-layer", "fill-opacity", 0);
	}
	$: if (value === 6 && loaded) {
		map.setPaintProperty("cities-layer", "circle-opacity", 0);
		map.setPaintProperty("cities-labels", "text-opacity", 0);
		map.setPaintProperty("cities-layer", "circle-stroke-opacity", 0);
		map.setPaintProperty("main-layer", "fill-opacity", 0);
		map.setPaintProperty("future-layer", "fill-opacity", 1);

		function fade1() {
			if (value != 6) {
				return;
			}

			map.setPaintProperty("main-layer", "fill-opacity", 1);
			document.getElementById("year1").style.opacity = 1;
			setTimeout(() => {
				map.setPaintProperty("main-layer", "fill-opacity", 0);
				document.getElementById("year1").style.opacity = 0.3;
				setTimeout(fade1, 2000);
			}, 2000);
		}
		function fade2() {
			if (value != 6) {
				return;
			}
			map.setPaintProperty("future-layer", "fill-opacity", 0);
			document.getElementById("year2").style.opacity = 0.3;
			setTimeout(() => {
				map.setPaintProperty("future-layer", "fill-opacity", 1);
				document.getElementById("year2").style.opacity = 1;
				setTimeout(fade2, 2000);
			}, 2000);
		}
		fade1();
		fade2();
	}
	$: if (value === 7 && loaded) {
		map.setFilter("cities-layer", null);
		map.setFilter("cities-labels", null);
		map.setPaintProperty("cities-labels", "text-opacity", 1);
		map.setPaintProperty("cities-layer", "circle-opacity", 1);
		map.setPaintProperty("cities-layer", "circle-stroke-opacity", 1);

		document.getElementsByClassName("intro-map")[0].style.opacity = 1;

		map.setPaintProperty("main-layer", "fill-opacity", 0);
		map.setPaintProperty("future-layer", "fill-opacity", 1);


		function fade1() {
			if (value != 7) {
				return;
			}

			map.setPaintProperty("main-layer", "fill-opacity", 1);
			document.getElementById("year1").style.opacity = 1;
			setTimeout(() => {
				map.setPaintProperty("main-layer", "fill-opacity", 0);
				document.getElementById("year1").style.opacity = 0.3;
				setTimeout(fade1, 2000);
			}, 2000);
		}
		function fade2() {
			if (value != 7) {
				return;
			}

			map.setPaintProperty("future-layer", "fill-opacity", 0);
			document.getElementById("year2").style.opacity = 0.3;
			setTimeout(() => {
				map.setPaintProperty("future-layer", "fill-opacity", 1);
				document.getElementById("year2").style.opacity = 1;
				setTimeout(fade2, 2000);
			}, 2000);
		}
		fade1();
		fade2();
	}

	$: if (value === 8 && loaded) {
		document.getElementsByClassName("intro-map")[0].style.opacity = 0;
	}
</script>

<div class="map-wrap">
	<div class="years">
		<div id="year1">2023</div>
		<div id="year2">2070</div>
	</div>

	<div class="map" bind:this={mapContainer} />
</div>

<style>
	.years {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: 28px;
		justify-content: center;
	}
	video {
		position: absolute;
		opacity: 0;
	}
	.map {
		position: absolute;
		width: 99%;
		top: 0;
		left: 0;
		right: 0;
		z-index: -1;
		margin: 0 auto;
		height: var(--viewport-height);
	}

	#year1,
	#year2 {
		font-family: var(--sans);
		padding: 5px 20px;
		border-radius: 60px;
		margin: 0;
		width: fit-content;
		font-weight: 500;
		background: black;
		color: white;
		font-size: 36px;
		opacity: 0;
		transition: opacity 2s; /* Specify the opacity property and duration */
	}

	#year1 {
		margin-right: 20px;
	}
	#year2 {
	}
</style>

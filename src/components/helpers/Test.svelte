<script>
	import WindGL from "$actions/wind-gl.js";
	let windgl = WindGL();

	var svg = d3.select("svg"),
		width = screen.width;
	height = screen.height;
	var projection = d3
		.geoNaturalEarth1()
		.scale(width / 1.3 / Math.PI)
		.translate([width / 2, height / 2]);

	// Load external data and boot
	d3.json(
		"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson",
		function (data) {
			// Draw the map
			svg
				.append("g")
				.selectAll("path")
				.data(data.features)
				.enter()
				.append("path")
				.attr("fill", "grey")
				.attr("d", d3.geoPath().projection(projection))
				.style("stroke", "grey");
		}
	);
</script>

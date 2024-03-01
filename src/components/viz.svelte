<script>
	import { quintOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { browser } from "$app/environment";

	const [send, receive] = crossfade({
		duration: 5000,
		easing: quintOut
	});

	var data = [
		{
			id: 0,
			name: "Amsterdam",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 10.41,
			temp_2070: 12.92,
			clicked: false
		},
		{
			id: 1,
			name: "Athens",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 17.13,
			temp_2070: 20.12,
			clicked: false
		},
		{
			id: 2,
			name: "Atlanta",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 16.36,
			temp_2070: 19.46,
			clicked: false
		},
		{
			id: 3,
			name: "Auckland",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 14.64,
			temp_2070: 16.88,
			clicked: false
		},
		{
			id: 4,
			name: "Bangkok",
			type_2023: "Tropical, savannah",
			type_2070: "Tropical, savannah",
			temp_2023: 28.36,
			temp_2070: 30.93,
			clicked: false
		},
		{
			id: 5,
			name: "Barcelona",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 16.93,
			temp_2070: 19.77,
			clicked: false
		},
		{
			id: 6,
			name: "Beijing",
			type_2023: "Cold, dry winter, hot summer",
			type_2070: "Temperate, dry winter, hot summer",
			temp_2023: 10.12,
			temp_2070: 13.85,
			clicked: false
		},
		{
			id: 7,
			name: "Berlin",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 9.7,
			temp_2070: 12.79,
			clicked: false
		},
		{
			id: 8,
			name: "Bogota",
			type_2023: "Temperate, dry summer, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 15.0,
			temp_2070: 18.13,
			clicked: false
		},
		{
			id: 9,
			name: "Boston",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 10.72,
			temp_2070: 14.46,
			clicked: false
		},
		{
			id: 10,
			name: "Brussels",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 10.96,
			temp_2070: 13.69,
			clicked: false
		},
		{
			id: 11,
			name: "Bucharest",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Arid, steppe, cold",
			temp_2023: 12.07,
			temp_2070: 15.81,
			clicked: false
		},
		{
			id: 12,
			name: "Budapest",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Arid, steppe, cold",
			temp_2023: 9.71,
			temp_2070: 13.36,
			clicked: false
		},
		{
			id: 13,
			name: "Buenos Aires",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 16.71,
			temp_2070: 18.79,
			clicked: false
		},
		{
			id: 14,
			name: "Cairo",
			type_2023: "Arid, desert, hot",
			type_2070: "Arid, desert, hot",
			temp_2023: 21.86,
			temp_2070: 25.06,
			clicked: false
		},
		{
			id: 15,
			name: "Cape Town",
			type_2023: "Temperate, dry summer, warm summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 16.67,
			temp_2070: 18.57,
			clicked: false
		},
		{
			id: 16,
			name: "Caracas",
			type_2023: "Tropical, savannah",
			type_2070: "Arid, steppe, hot",
			temp_2023: 24.78,
			temp_2070: 26.97,
			clicked: false
		},
		{
			id: 17,
			name: "Casablanca",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 18.79,
			temp_2070: 21.0,
			clicked: false
		},
		{
			id: 18,
			name: "Chicago",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 9.75,
			temp_2070: 13.91,
			clicked: false
		},
		{
			id: 19,
			name: "Dubai",
			type_2023: "Arid, desert, hot",
			type_2070: "Arid, desert, hot",
			temp_2023: 27.79,
			temp_2070: 31.1,
			clicked: false
		},
		{
			id: 20,
			name: "Dublin",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 10.37,
			temp_2070: 12.32,
			clicked: false
		},
		{
			id: 21,
			name: "Frankfurt",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 9.94,
			temp_2070: 13.01,
			clicked: false
		},
		{
			id: 22,
			name: "Geneva",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 9.54,
			temp_2070: 12.89,
			clicked: false
		},
		{
			id: 23,
			name: "Hamburg",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 9.47,
			temp_2070: 12.14,
			clicked: false
		},
		{
			id: 24,
			name: "Helsinki",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 5.65,
			temp_2070: 9.16,
			clicked: false
		},
		{
			id: 25,
			name: "Hong Kong",
			type_2023: "Temperate, dry winter, hot summer",
			type_2070: "Tropical, monsoon",
			temp_2023: 23.46,
			temp_2070: 26.03,
			clicked: false
		},
		{
			id: 26,
			name: "Instanbul",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 19.0,
			temp_2070: 21.0,
			clicked: false
		},
		{
			id: 27,
			name: "Jakarta",
			type_2023: "Tropical, monsoon",
			type_2070: "Tropical, monsoon",
			temp_2023: 27.35,
			temp_2070: 29.61,
			clicked: false
		},
		{
			id: 28,
			name: "Johannesburg",
			type_2023: "Temperate, dry winter, warm summer",
			type_2070: "Temperate, dry winter, hot summer",
			temp_2023: 17.66,
			temp_2070: 21.04,
			clicked: false
		},
		{
			id: 29,
			name: "Kuala Lumpur",
			type_2023: "Tropical, rainforest",
			type_2070: "Tropical, rainforest",
			temp_2023: 26.39,
			temp_2070: 28.83,
			clicked: false
		},
		{
			id: 30,
			name: "Copenhagen",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 8.38,
			temp_2070: 11.16,
			clicked: false
		},
		{
			id: 31,
			name: "Lagos",
			type_2023: "Tropical, savannah",
			type_2070: "Tropical, savannah",
			temp_2023: 27.25,
			temp_2070: 29.52,
			clicked: false
		},
		{
			id: 32,
			name: "Lisbon",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 17.1,
			temp_2070: 19.41,
			clicked: false
		},
		{
			id: 33,
			name: "London",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 10.41,
			temp_2070: 12.85,
			clicked: false
		},
		{
			id: 34,
			name: "Los Angeles",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 15.44,
			temp_2070: 18.43,
			clicked: false
		},
		{
			id: 35,
			name: "Madrid",
			type_2023: "Arid, steppe, cold",
			type_2070: "Arid, steppe, hot",
			temp_2023: 15.12,
			temp_2070: 18.77,
			clicked: false
		},
		{
			id: 36,
			name: "Manila",
			type_2023: "Tropical, savannah",
			type_2070: "Tropical, savannah",
			temp_2023: 26.54,
			temp_2070: 28.73,
			clicked: false
		},
		{
			id: 37,
			name: "Melbourne",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 14.61,
			temp_2070: 17.02,
			clicked: false
		},
		{
			id: 38,
			name: "Mexico City",
			type_2023: "Temperate, dry winter, warm summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 18.33,
			temp_2070: 21.44,
			clicked: false
		},
		{
			id: 39,
			name: "Miami",
			type_2023: "Tropical, monsoon",
			type_2070: "Tropical, monsoon",
			temp_2023: 24.8,
			temp_2070: 27.2,
			clicked: false
		},
		{
			id: 40,
			name: "Milan",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 12.32,
			temp_2070: 15.76,
			clicked: false
		},
		{
			id: 41,
			name: "Moscow",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Cold, no dry season, hot summer",
			temp_2023: 5.68,
			temp_2070: 9.6,
			clicked: false
		},
		{
			id: 42,
			name: "Mumbai",
			type_2023: "Tropical, monsoon",
			type_2070: "Tropical, monsoon",
			temp_2023: 27.39,
			temp_2070: 29.83,
			clicked: false
		},
		{
			id: 43,
			name: "Munich",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 8.44,
			temp_2070: 11.82,
			clicked: false
		},
		{
			id: 44,
			name: "Nairobi",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Tropical, savannah",
			temp_2023: 18.92,
			temp_2070: 21.32,
			clicked: false
		},
		{
			id: 45,
			name: "New Delhi",
			type_2023: "Arid, steppe, hot",
			type_2070: "Arid, steppe, hot",
			temp_2023: 25.14,
			temp_2070: 28.22,
			clicked: false
		},
		{
			id: 46,
			name: "New York",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 11.57,
			temp_2070: 15.3,
			clicked: false
		},
		{
			id: 47,
			name: "Oslo",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 5.28,
			temp_2070: 8.3,
			clicked: false
		},
		{
			id: 48,
			name: "Paris",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 11.96,
			temp_2070: 14.87,
			clicked: false
		},
		{
			id: 49,
			name: "Prague",
			type_2023: "Arid, steppe, cold",
			type_2070: "Arid, steppe, cold",
			temp_2023: 8.82,
			temp_2070: 12.21,
			clicked: false
		},
		{
			id: 50,
			name: "Rio de Janeiro",
			type_2023: "Tropical, savannah",
			type_2070: "Tropical, savannah",
			temp_2023: 23.52,
			temp_2070: 25.86,
			clicked: false
		},
		{
			id: 51,
			name: "Riyadh",
			type_2023: "Arid, desert, hot",
			type_2070: "Arid, desert, hot",
			temp_2023: 26.3,
			temp_2070: 30.34,
			clicked: false
		},
		{
			id: 52,
			name: "Rome",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 16.36,
			temp_2070: 19.58,
			clicked: false
		},
		{
			id: 53,
			name: "San Francisco",
			type_2023: "Temperate, dry summer, warm summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 14.98,
			temp_2070: 17.84,
			clicked: false
		},
		{
			id: 54,
			name: "Santiago",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Arid, steppe, hot",
			temp_2023: 12.9,
			temp_2070: 15.55,
			clicked: false
		},
		{
			id: 55,
			name: "Seoul",
			type_2023: "Cold, dry winter, hot summer",
			type_2070: "Temperate, dry winter, hot summer",
			temp_2023: 10.48,
			temp_2070: 14.13,
			clicked: false
		},
		{
			id: 56,
			name: "Shanghai",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 16.62,
			temp_2070: 19.85,
			clicked: false
		},
		{
			id: 57,
			name: "Singapore",
			type_2023: "Tropical, rainforest",
			type_2070: "Tropical, rainforest",
			temp_2023: 27.77,
			temp_2070: 29.99,
			clicked: false
		},
		{
			id: 58,
			name: "Stockholm",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, warm summer",
			temp_2023: 6.98,
			temp_2070: 10.12,
			clicked: false
		},
		{
			id: 59,
			name: "Sydney",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 17.22,
			temp_2070: 19.75,
			clicked: false
		},
		{
			id: 60,
			name: "Sao Paulo",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Tropical, savannah",
			temp_2023: 20.98,
			temp_2070: 23.52,
			clicked: false
		},
		{
			id: 61,
			name: "Taipei",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Tropical, rainforest",
			temp_2023: 22.21,
			temp_2070: 24.56,
			clicked: false
		},
		{
			id: 62,
			name: "Tokyo",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 14.62,
			temp_2070: 17.58,
			clicked: false
		},
		{
			id: 63,
			name: "Toronto",
			type_2023: "Cold, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 7.56,
			temp_2070: 11.73,
			clicked: false
		},
		{
			id: 64,
			name: "Vatican City",
			type_2023: "Temperate, dry summer, hot summer",
			type_2070: "Temperate, dry summer, hot summer",
			temp_2023: 16.36,
			temp_2070: 19.58,
			clicked: false
		},
		{
			id: 65,
			name: "Vienna",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 9.26,
			temp_2070: 12.6,
			clicked: false
		},
		{
			id: 66,
			name: "Warsaw",
			type_2023: "Cold, no dry season, warm summer",
			type_2070: "Arid, steppe, cold",
			temp_2023: 8.72,
			temp_2070: 12.15,
			clicked: false
		},
		{
			id: 67,
			name: "Washington,  D.C.",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 13.67,
			temp_2070: 17.31,
			clicked: false
		},
		{
			id: 68,
			name: "Zurich",
			type_2023: "Temperate, no dry season, warm summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 5.48,
			temp_2070: 8.84,
			clicked: false
		},
		{
			id: 69,
			name: "Osaka",
			type_2023: "Temperate, no dry season, hot summer",
			type_2070: "Temperate, no dry season, hot summer",
			temp_2023: 14.31,
			temp_2070: 17.4,
			clicked: false
		}
	];

	let todos = [];
	let flipParams = {
		transform: (node, { from, to }) => {
			// Specify properties that should not be animated during the flip transition
			node.style.border = "2px dashed black";
		}
	};
	function orderByTempAndGroupByClim(data, city) {
		let newData = data.map((item) => {
			if ((item.name == city) & (item.clicked == true))
				return {
					id: item.id,
					clim: item.type_2023,
					temp: item.temp_2023,
					name: item.name,
					clicked: false
				};
			if ((item.name == city) | (item.clicked == true))
				return {
					id: item.id,
					clim: item.type_2070,
					temp: item.temp_2070,
					name: item.name,
					clicked: true
				};
			else {
				return {
					id: item.id,
					clim: item.type_2023,
					temp: item.temp_2023,
					name: item.name,
					clicked: false
				};
			}
		});
		data.forEach((item) => {
			if (item.name === city) {
				item.clicked = !item.clicked;
				console.log(item);
			}
		});

		// Order newData by clim and then by temp
		newData = newData.sort((a, b) => {
			// First, compare by clim
			const climComparison = a.clim.localeCompare(b.clim);

			// If clim is the same, then compare by temp
			if (climComparison === 0) {
				return b.temp - a.temp;
			}

			return climComparison;
		});

		todos = newData;

		// Loop through the labels to find the one with innerText equal to "Paris"
	}
	function highlightNodes(data) {
		data.forEach((item) => {
			if (item.clicked === true) {
				if (browser) {
					var labels = document.getElementsByTagName("label");
					for (var i = 0; i < labels.length; i++) {
						if (labels[i].innerText.trim() === item.name) {
							labels[i].style.border = "3px solid black";
						}
					}
				}
			}
		});
	}
	orderByTempAndGroupByClim(data);
</script>

<div class="board">
	<div class="Cold">
		<div class="Cold-dry-winter-hot-summer">
			<h2>Dry winter, hot summer</h2>
			{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Cold-no-dry-season-hot-summer">
			<h2>No dry season, hot summer</h2>
			{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<p class="break"></p>
		<div class="Cold-no-dry-season-warm-summer">
			<h2>No dry season, warm summer</h2>
			{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
	</div>

	<div class="Temperate">
		<div class="Temperate-dry-summer-hot-summer">
			<h2>Dry summer, hot summer</h2>

			{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 10);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<p class="break"></p>
		<div class="Temperate-no-dry-season-warm-summer">
			<h2>No dry season, warm summer</h2>
			{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>

		<p class="break"></p>
		<div class="Temperate-no-dry-season-hot-summer">
			<h2>No dry season, hot summer</h2>
			{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<p class="break"></p>
		<div class="Temperate-dry-summer-warm-summer">
			<h2>Dry summer, warm summer</h2>
			{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Temperate-dry-winter-hot-summer">
			<h2>Dry winter, hot summer</h2>
			{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Temperate-dry-winter-warm-summer">
			<h2>Dry winter, warm summer</h2>
			{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
	</div>
	<div class="Tropical">
		<div class="Tropical-monsoon">
			<h2>Monsoon</h2>

			{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Tropical-rainforest">
			<h2>Rainforest</h2>

			{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Tropical-savannah">
			<h2>Savannah</h2>

			{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
	</div>

	<div class="Arid">
		<div class="Arid-desert-hot">
			<h2>Desert, hot</h2>
			{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Arid-steppe-hot">
			<h2>Steppe, hot</h2>
			{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
		<div class="Arid-steppe-cold">
			<h2>Steppe, cold</h2>
			{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
				<label
					in:receive={{ key: todo.id }}
					out:send={{ key: todo.id }}
					animate:flip={{ flipParams }}
				>
					<button
						on:click={() => {
							orderByTempAndGroupByClim(data, todo.name);

							highlightNodes(data);
							setTimeout(() => highlightNodes(data), 1000);
						}}
					>
						{todo.name}
					</button>
				</label>
			{/each}
		</div>
	</div>
</div>

<style>
	* {
		font-family: Futura;
	}
	.board {
		width: 100%;
		height: 100%;
		left: 5%;
		position: relative;
	}

	.Cold,
	.Temperate,
	.Tropical,
	.Arid {
		float: left;
		width: 10%;
		padding: 0.5em 0.5em 0.5em 0.5em;
		box-sizing: border-box;
		margin-right: 1em;
		border-radius: 10px;
	}
	.Temperate {
		columns: 4;
		width: 40%;
		background-color: rgba(88, 249, 104, 0.25);
	}
	.Cold {
		columns: 2;
		width: 20%;
		background-color: rgba(178, 88, 249, 0.25);
	}
	.Arid {
		background-color: rgba(249, 88, 88, 0.6);
	}
	.Tropical {
		background-color: rgba(178, 88, 249, 0.25);
	}

	label {
		top: 0;
		left: 0;
		display: flex;
		font-size: 0.8em;
		line-height: 1;
		padding: 0.1em;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
		color: black;
		align-items: center;
		justify-content: center;
		border-radius: 25px;
		width: 100px;
		border: 1px solid black;
	}

	.Temperate-dry-summer-warm-summer label {
		background-color: #96ff88;
	}
	.Temperate-dry-summer-hot-summer label {
		background-color: rgb(255, 255, 0);
	}
	.Temperate-dry-winter-hot-summer label {
		background-color: rgb(150, 255, 150);
	}
	.Temperate-dry-winter-warm-summer label {
		background-color: rgb(100, 200, 100);
	}
	.Temperate-no-dry-season-warm-summer label {
		background-color: rgb(100, 255, 80);
	}
	.Temperate-no-dry-season-hot-summer label {
		background-color: rgb(200, 255, 80);
	}

	.Cold-dry-winter-hot-summer label {
		background-color: rgb(170, 175, 255);
	}
	.Cold-no-dry-season-hot-summer label {
		background-color: rgb(0, 255, 255);
	}
	.Cold-no-dry-season-warm-summer label {
		background-color: rgb(55, 200, 255);
	}
	.Arid-desert-hot label {
		background-color: rgb(255, 0, 0);
	}
	.Arid-steppe-hot label {
		background-color: rgb(245, 165, 0);
	}
	.Arid-steppe-cold label {
		background-color: rgb(255, 220, 100);
	}
	.Tropical-monsoon label {
		background-color: rgb(0, 120, 255);
	}
	.Tropical-rainforest label {
		background-color: rgb(0, 0, 255);
	}
	.Tropical-savannah label {
		background-color: rgb(70, 170, 250);
	}

	button {
		font-size: 0.8em;
		text-align: center;
		background-color: transparent;
	}

	h2 {
		font-size: 1em;
		text-align: center;
	}
	.break {
		break-after: column;
	}
</style>

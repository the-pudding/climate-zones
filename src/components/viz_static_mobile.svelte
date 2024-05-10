<script>
	import { quintOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { browser } from "$app/environment";
	import { data } from "./data.svelte";
	import { onMount, onDestroy } from "svelte";

	const [send, receive] = crossfade({
		duration: 3000,
		easing: quintOut
	});

	let todos = [];

	onMount(() => {});

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

	function highlightNodes1(data) {
		data.forEach((item) => {
			if (item.clicked === true) {
				if (browser) {
					var labels = document.getElementsByTagName("label");
					for (var i = 0; i < labels.length; i++) {
						console.log(labels[i].innerText);
						if (labels[i].innerText == item.name) {
							console.log(item.name);
							labels[i].style.border = `6px solid ${item.color}`;
							labels[i].style.fontSize = `1em`;
							labels[i].style.fontWeight = "900";
						}
					}
				}
			}
		});
	}
	orderByTempAndGroupByClim(data);
</script>

<div class="board">
	<canvas
		id="canvas"
		style="position: absolute;"
		width={document.getElementById("my_dataviz").getBoundingClientRect().width}
		height="{document.getElementById('my_dataviz').getBoundingClientRect()
			.height};"
	></canvas>
	<div class="rect">
		<div
			style="font-weight:700;position:relative;border-radius:2px;padding:2px;color:white;background-color:#735fca;writing-mode: vertical-rl; text-orientation: upright;text-align:center"
		>
			Cold
		</div>
		<div class="Cold">
			<h2 class="classification">Dry winter, hot summer</h2>
			<div class="Cold-dry-winter-hot-summer Row">
				{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">No dry season, hot summer</h2>
			<div class="Cold-no-dry-season-hot-summer Row">
				{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">No dry season, warm summer</h2>
			<div class="Cold-no-dry-season-warm-summer Row">
				{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
		</div>
	</div>

	<div class="rect">
		<div
			style="border-radius:2px;font-weight:700;padding:2px;color:black;background-color:#abe340;writing-mode: vertical-rl; text-orientation: upright;text-align:center"
		>
			Temperate
		</div>
		<div style="">
			<h3>Temperate</h3>
			<div class="Temperate">
				<h2 class="classification">Dry summer, hot summer</h2>
				<div class="Temperate-dry-summer-hot-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<h2 class="classification">No dry season, warm summer</h2>
				<div class="Temperate-no-dry-season-warm-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<h2 class="classification">No dry season, hot summer</h2>
				<div class="Temperate-no-dry-season-hot-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<h2 class="classification">Dry summer, warm summer</h2>
				<div class="Temperate-dry-summer-warm-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<h2 class="classification">Dry winter, hot summer</h2>
				<div class="Temperate-dry-winter-hot-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<h2 class="classification">Dry winter, warm summer</h2>
				<div class="Temperate-dry-winter-warm-summer Row">
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
						<label
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button
								on:click={() => {
									orderByTempAndGroupByClim(data, todo.name);

									setTimeout(() => highlightNodes1(data), 500);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="rect" style="">
		<div
			style="border-radius:2px;padding:2px;color:white;background-color:#1761fd;writing-mode: vertical-rl;font-weight:700; text-orientation: upright;text-align:center"
		>
			Tropical
		</div>
		<h3>Tropical</h3>
		<div class="Tropical">
			<h2 class="classification">Monsoon</h2>
			<div class="Tropical-monsoon Row">
				{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">Rainforest</h2>
			<div class="Tropical-rainforest Row">
				{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">Savannah</h2>
			<div class="Tropical-savannah Row">
				{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
		</div>
	</div>

	<div class="rect" style="">
		<div
			style="border-radius:2px;padding:2px;color:white;background-color:#ff8563;writing-mode: vertical-rl; font-weight:700;text-orientation: upright;text-align:center"
		>
			Arid
		</div>
		<h3>Arid</h3>
		<div class="Arid">
			<h2 class="classification">Desert, hot</h2>
			<div class="Arid-desert-hot Row">
				{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">Desert, cold</h2>
			<div class="Arid-desert-cold Row">
				{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">Steppe, hot</h2>
			<div class="Arid-steppe-hot Row">
				{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<h2 class="classification">Steppe, cold</h2>
			<div class="Arid-steppe-cold Row">
				{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
					<label
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						animate:flip
					>
						<button
							on:click={() => {
								orderByTempAndGroupByClim(data, todo.name);

								setTimeout(() => highlightNodes1(data), 500);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.rect {
		display: flex;
		width: 100%;
	}
	.rect .Cold,
	.rect .Temperate,
	.rect .Arid,
	.rect .Tropical {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 5px;
	}
	.Row {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.Row label {
		margin: 0;
	}
	.board {
		z-index: 100;
		position: relative;
		width: 100%;
		height: 100%;
		opacity: 1;
		transition: opacity 1s ease;
		scale: 1;

		flex-wrap: wrap;
	}

	.Temperate {
		background-color: rgba(88, 249, 104, 0.25);
	}
	.Cold {
		background-color: rgba(178, 88, 249, 0.25);
	}
	.Arid {
		background-color: rgba(249, 88, 88, 0.6);
	}
	.Tropical {
		background-color: rgba(23, 97, 253, 0.5);
	}

	label {
		display: flex;

		background-color: #eee;
		user-select: none;
		color: black;
		align-items: center;
		justify-content: center;
		border-radius: 25px;

		border: 1px solid black;
	}

	.Temperate-dry-summer-warm-summer label {
		background-color: #c8c800;
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
	.Arid-desert-cold label {
		background-color: rgb(255, 150, 150);
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
		font-size: 12px;
		padding: 2px;
		text-align: center;
		background-color: transparent;
		fill: white;
		color: white;
		text-shadow:
			0 0 2px rgba(0, 0, 0, 1),
			0 0 2px rgba(0, 0, 0, 1);
	}

	.classification {
		text-transform: uppercase;
		font-weight: 700;
		word-spacing: 5px;
		font-family: Futura;
	}

	.canvas {
		z-index: 10000;
	}
	h2 {
		display: contents;
		font-size: 12px;
	}
	h3 {
		display: none;
	}
</style>

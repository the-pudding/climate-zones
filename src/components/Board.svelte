<script>
	import { quintInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { browser } from "$app/environment";
	import { data } from "./data.svelte";
	import { stratify } from "d3";
	export let value;

	// Default duration

	const [send, receive] = crossfade({
		duration: 8000,
		easing: quintInOut
	});

	let todos = [];
	let todosMain = [];
	function resetData(data, city) {
		let freshData = data.map((item) => {
			return {
				id: item.id,
				clim: item.type_2023,
				temp: item.temp_2023,
				name: item.name,
				class: "stay",
				clicked: false
			};
		});
		freshData = freshData.sort((a, b) => {
			// First, compare by clim
			const climComparison = a.clim.localeCompare(b.clim);

			// If clim is the same, then compare by temp
			if (climComparison === 0) {
				return b.temp - a.temp;
			}

			return climComparison;
		});

		todosMain = freshData;
		todos = todosMain;
	}

	function orderByTempAndGroupByClim(data, city) {
		todos = [];
		let newData = data.flatMap((item) => {
			if (city.includes(item.name)) {
				return [
					{
						id: item.id,
						clim: item.type_2070,
						temp: item.temp_2070,
						name: item.name,
						class: "move"
					},
					{
						id: item.id + 1000,
						clim: item.type_2023,
						temp: item.temp_2023,
						name: item.name,
						class: "ghost"
					}
				];
			} else {
				return {
					id: item.id,
					clim: item.type_2023,
					temp: item.temp_2023,
					name: item.name,
					class: "stay"
				};
			}
		});

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
		setTimeout(
			() =>
				data.forEach((item) => {
					if (city.includes(item.name)) {
						if (browser) {
							var labels = document.getElementsByClassName("move");
							for (var i = 0; i < labels.length; i++) {
								if (labels[i].innerText == item.name) {
									labels[i].style.border = `6px solid ${item.color}`;
									labels[i].style.fontSize = `1em`;
									labels[i].style.fontWeight = "900";
								}
							}
						}
					}
				}),
			5000
		);
		setTimeout(() => {
			if (browser) {
				var labels = document.getElementsByClassName("ghost");
				for (var i = 0; i < labels.length; i++) {
					console.log(labels[i]);
					labels[i].style.opacity = 0.4;
				}
			}
		}, 500);
		setTimeout(() => {
			if (browser) {
				var labels = document.getElementsByClassName("stay");
				for (var i = 0; i < labels.length; i++) {
					console.log(labels[i]);
					labels[i].style.opacity = 0.8;
				}
			}
		}, 500);
	}

	function highlightNodes1(data) {}
	resetData(data);

	function LA() {
		todos = [];
		resetData(data);
		setTimeout(() => {
			orderByTempAndGroupByClim(data, "Los Angeles");
		}, 500);
	}
	function Scan() {
		todos = [];
		resetData(data);
		setTimeout(() => {
			orderByTempAndGroupByClim(data, [
				"Oslo",
				"Helsinki",
				"Stockholm",
				"Copenhagen"
			]);
		}, 500);
	}
	function byeTemp() {
		todos = [];
		resetData(data);
		setTimeout(() => {
			orderByTempAndGroupByClim(data, [
				"Hong Kong",
				"Tapei",
				"Hanoi",
				"Lusaka",
				"Sao Paulo",
				"Nairobi",
				"Austin",
				"Tel Aviv",
				"Tunis",
				"Mexico City",
				"Casablanca",
				"Athens",
				"Barcelona",
				"Los Angeles",
				"Santiago"
			]);
		}, 500);
	}
	function byeCold() {
		todos = [];
		resetData(data);
		setTimeout(() => {
			orderByTempAndGroupByClim(data, [
				"Toronto",
				"Berlin",
				"Vienna",
				"Warsaw",
				"Copenhagen",
				"Stockholm",
				"Helsinki",
				"Oslo",
				"Bucharest",
				"New York",
				"Boston",
				"Chicago",
				"Budapest",
				"Toronoto",
				"Seoul",
				"Beijing"
			]);
		}, 500);
	}

	$: if (value === 7) {
		setTimeout(() => {
			document.getElementsByClassName("board")[0].style.opacity = 1;
		}, 100);
	}
	$: if (value == 8) {
		LA();
	}
	$: if (value == 9) {
		Scan();
	}
	$: if (value == 10) {
		byeTemp();
	}
	$: if (value == 11) {
		byeCold();
	}
</script>

{#if value == 7}
	<div class="board" style={`z-index:${value == 7 ? 100 : ""} `}>
		<div>
			<h3
				style="
			position: relative;
			left: 7.5%;
		"
			>
				Cold
			</h3>
			<div class="Cold">
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">Dry winter, hot summer</h2>
					{#each todosMain.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">No dry season, hot summer</h2>
					{#each todosMain.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">No dry season, warm summer</h2>
					{#each todosMain.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div
				style="    transform: translateY(-55px);
		"
			>
				<h3
					style="
			position: relative;
			left: 15%;
		"
				>
					Temperate
				</h3>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>

						{#each todosMain.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
								in:receive={{ key: todo.id }}
								out:send={{ key: todo.id }}
								animate:flip
							>
								<button>
									{todo.name}
								</button>
							</label>
						{/each}
					</div>
					<p class="break"></p>
					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						{#each todosMain.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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

					<p class="break"></p>
					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						{#each todosMain.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						{#each todosMain.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						{#each todosMain.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-warm-summer">
						<h2 class="classification">Dry winter, warm summer</h2>
						{#each todosMain.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
		<div style="transform: translateY(-110px);">
			<h3
				style="
			position: relative;
			left: 1.5%;
		"
			>
				Tropical
			</h3>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>

					{#each todosMain.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-rainforest">
					<h2 class="classification">Rainforest</h2>

					{#each todosMain.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>

					{#each todosMain.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div style="transform: translateY(-165px);">
			<h3
				style="
			position: relative;
			left: 3%;
		"
			>
				Arid
			</h3>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					{#each todosMain.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-desert-cold">
					<h2 class="classification">Steppe, hot</h2>
					{#each todosMain.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					{#each todosMain.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-cold">
					<h2 class="classification">Steppe, cold</h2>
					{#each todosMain.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

{#if value == 8}
	<div class="board" style={`opacity:1;z-index:${value == 8 ? 100 : ""} `}>
		<div>
			<h3
				style="
			position: relative;
			left: 7.5%;
		"
			>
				Cold
			</h3>
			<div class="Cold">
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">Dry winter, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">No dry season, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">No dry season, warm summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div
				style="    transform: translateY(-55px);
		"
			>
				<h3
					style="
			position: relative;
			left: 15%;
		"
				>
					Temperate
				</h3>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>

						{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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

					<p class="break"></p>
					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-warm-summer">
						<h2 class="classification">Dry winter, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
		<div style="transform: translateY(-110px);">
			<h3
				style="
			position: relative;
			left: 1.5%;
		"
			>
				Tropical
			</h3>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>

					{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-rainforest">
					<h2 class="classification">Rainforest</h2>

					{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>

					{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div style="transform: translateY(-165px);">
			<h3
				style="
			position: relative;
			left: 3%;
		"
			>
				Arid
			</h3>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-desert-cold">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-cold">
					<h2 class="classification">Steppe, cold</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
{#if value == 9}
	<div class="board" style={`opacity:1;z-index:${value == 9 ? 100 : ""} `}>
		<div>
			<h3
				style="
			position: relative;
			left: 7.5%;
		"
			>
				Cold
			</h3>
			<div class="Cold">
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">Dry winter, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">No dry season, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">No dry season, warm summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div
				style="    transform: translateY(-55px);
		"
			>
				<h3
					style="
			position: relative;
			left: 15%;
		"
				>
					Temperate
				</h3>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>

						{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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

					<p class="break"></p>
					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-warm-summer">
						<h2 class="classification">Dry winter, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
		<div style="transform: translateY(-110px);">
			<h3
				style="
			position: relative;
			left: 1.5%;
		"
			>
				Tropical
			</h3>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>

					{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-rainforest">
					<h2 class="classification">Rainforest</h2>

					{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>

					{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div style="transform: translateY(-165px);">
			<h3
				style="
			position: relative;
			left: 3%;
		"
			>
				Arid
			</h3>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-desert-cold">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-cold">
					<h2 class="classification">Steppe, cold</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
{#if value == 10}
	<div class="board" style={`opacity:1;z-index:${value == 10 ? 100 : ""} `}>
		<div>
			<h3
				style="
			position: relative;
			left: 7.5%;
		"
			>
				Cold
			</h3>
			<div class="Cold">
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">Dry winter, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">No dry season, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">No dry season, warm summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div
				style="    transform: translateY(-55px);
		"
			>
				<h3
					style="
			position: relative;
			left: 15%;
		"
				>
					Temperate
				</h3>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>

						{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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

					<p class="break"></p>
					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-warm-summer">
						<h2 class="classification">Dry winter, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
		<div style="transform: translateY(-110px);">
			<h3
				style="
			position: relative;
			left: 1.5%;
		"
			>
				Tropical
			</h3>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>

					{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-rainforest">
					<h2 class="classification">Rainforest</h2>

					{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>

					{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div style="transform: translateY(-165px);">
			<h3
				style="
			position: relative;
			left: 3%;
		"
			>
				Arid
			</h3>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-desert-cold">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-cold">
					<h2 class="classification">Steppe, cold</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
{#if value == 11}
	<div class="board" style={`opacity:1;z-index:${value == 11 ? 100 : ""} `}>
		<div>
			<h3
				style="
			position: relative;
			left: 7.5%;
		"
			>
				Cold
			</h3>
			<div class="Cold">
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">Dry winter, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">No dry season, hot summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">No dry season, warm summer</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div
				style="    transform: translateY(-55px);
		"
			>
				<h3
					style="
			position: relative;
			left: 15%;
		"
				>
					Temperate
				</h3>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>

						{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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

					<p class="break"></p>
					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<p class="break"></p>
					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo (todo.id)}
							<label
								class={todo.class}
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
					<div class="Temperate-dry-winter-warm-summer">
						<h2 class="classification">Dry winter, warm summer</h2>
						{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo (todo.id)}
							<label
								class={todo.class}
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
		<div style="transform: translateY(-110px);">
			<h3
				style="
			position: relative;
			left: 1.5%;
		"
			>
				Tropical
			</h3>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>

					{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-rainforest">
					<h2 class="classification">Rainforest</h2>

					{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>

					{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
		<div style="transform: translateY(-165px);">
			<h3
				style="
			position: relative;
			left: 3%;
		"
			>
				Arid
			</h3>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-desert-cold">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Arid-steppe-cold">
					<h2 class="classification">Steppe, cold</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo (todo.id)}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip
						>
							<button>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.board {
		z-index: -100;
		position: sticky;
		width: 100%;
		height: 100%;
		transform: translateX(10vw);
		top: 100px;
		opacity: 0;
		transition: opacity 1s ease;
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
		font-size: 1em;
		text-align: center;
		background-color: transparent;
		fill: white;
		color: white;
		text-shadow:
			0 0 2px rgba(0, 0, 0, 1),
			0 0 2px rgba(0, 0, 0, 1);
	}

	.classification {
		font-size: 0.8em;
		text-align: center;
	}
	.break {
		break-after: column;
	}
</style>

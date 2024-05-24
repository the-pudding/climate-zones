<script>
	import { quintInOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { browser } from "$app/environment";
	import { data } from "./data.svelte";
	import Canvas from "$components/Canvas.svelte";
	import "@fortawesome/fontawesome-free/css/all.min.css";
	import { interval, stratify, group, groups } from "d3";
	export let value;
	export let isMobile;

	// Default duration

	let mounted = false;

	const [send, receive] = crossfade({
		duration: getDuration,
		easing: customEasing1
	});

	let itemsToMove = [];
	let bindFinder = { move: {}, ghost: {}, stay: {}, noClass: {} };
	let linesToDraw;

	let todos = [];
	let todosMain = [];
	function disableClick() {
		setTimeout(() => {
			const buttons = document.getElementsByTagName("button");
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].disabled = true;
			}
		}, 100);
	}
	function enableClick() {
		setTimeout(() => {
			const buttons = document.getElementsByTagName("button");
			for (let i = 0; i < buttons.length; i++) {
				buttons[i].disabled = false;
			}
		}, 100);
	}

	function getDuration() {
		console.log("duration", itemsToMove);
		if (itemsToMove.length == 0) {
			return 0;
		}
		if (value == 13) {
			return 2000;
		}
		return 3000;
	}

	function customEasing1(t) {
		// let merged = bindFinder["move"].filter((d) => d).concat(bindFinder["ghost"].filter((d) => d));
		getBounds();
		return quintInOut(t); //Math.abs(Math.cos(t * Math.PI));
	}

	function getBounds() {
		let positions = [];
		for (let item of itemsToMove) {
			let elOne = bindFinder["ghost"][item]; //.getBoundingClientRect();
			let elTwo = bindFinder["move"][item]; //.getBoundingClientRect();
			if (elOne && elTwo) {
				elOne = elOne.getBoundingClientRect();
				elTwo = elTwo.getBoundingClientRect();
				let x1 = elOne.x + elOne.width / 2;
				let x2 = elTwo.x + elTwo.width / 2;
				let y1 = elOne.y + elOne.height / 2;
				let y2 = elTwo.y + elTwo.height / 2;
				let pos = [
					[x1, y1],
					[x2, y2]
				];

				positions.push(pos);
			}
		}
		// let groupings = groups(nodes, (d) => d.getAttribute("data"));
		// if (groupings.length > 0) {
		// 	for (let item of groupings) {
		// 		if (item[1].length > 1) {
		// 			let elOne = item[1][0].getBoundingClientRect();
		// 			let elTwo = item[1][1].getBoundingClientRect();

		// 			let x1 = elOne.x + elOne.width / 2;
		// 			let x2 = elTwo.x + elTwo.width / 2;
		// 			let y1 = elOne.y + elOne.height / 2;
		// 			let y2 = elTwo.y + elTwo.height / 2;
		// 			let pos = [
		// 				[x1, y1],
		// 				[x2, y2]
		// 			];

		// 			positions.push(pos);
		// 		}
		// 	}
		// }

		linesToDraw = positions;
	}

	function updateBindFinder() {
		for (let item of itemsToMove) {
			bindFinder["ghost"][item] = null;
			bindFinder["move"][item] = null;
		}
	}

	function resetData(data, city) {
		bindFinder = { move: {}, ghost: {}, stay: {}, noClass: {} };
		for (let bindClass of Object.keys(bindFinder)) {
			for (let city of data) {
				bindFinder[bindClass][city.name] = null;
			}
		}

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
		if (mounted) {
			var labels = document.getElementsByClassName("stay");
			for (var i = 0; i < labels.length; i++) {
				labels[i].style.position = null;
				labels[i].style.transform = null;
				labels[i].style.outline = "none";
			}
		}
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
									labels[i].style.outline = `4px solid ${item.color}`;
								}
							}
						}
					}
				}),
			500
		);
		setTimeout(() => {
			if (browser) {
				var labels = document.getElementsByClassName("ghost");
				for (var i = 0; i < labels.length; i++) {
					labels[i].style.opacity = 0.2;
				}
			}
		}, 500);
		setTimeout(() => {
			if (browser) {
				var labels = document.getElementsByClassName("stay");
				for (var i = 0; i < labels.length; i++) {
					labels[i].style.opacity = 0.8;
					labels[i].style.outline = `none`;
				}
			}
		}, 100);
	}

	resetData(data);

	onMount(() => {
		mounted = true;
	});

	let moveTimeout;

	$: if (value === 8 && mounted) {
		todos = [];
		itemsToMove = [];
		resetData(data);
		disableClick();
		clearTimeout(moveTimeout);
	}
	$: if (value == 9 && mounted) {
		todos = [];
		itemsToMove = [];
		resetData(data);
		disableClick();
		clearTimeout(moveTimeout);

		// ["Los Angeles"].forEach(item => {
		// 	bindFinder["ghost"][item] = null;
		// 	bindFinder["move"][item] = null;
		// })

		// console.log(bindFinder)
		moveTimeout = setTimeout(() => {
			itemsToMove = ["Los Angeles"];
			updateBindFinder();
			orderByTempAndGroupByClim(data, ["Los Angeles"]);
		}, 2000);
	}
	$: if (value == 10 && mounted) {
		todos = [];
		itemsToMove = [];
		resetData(data);
		disableClick();
		clearTimeout(moveTimeout);

		moveTimeout = setTimeout(() => {
			itemsToMove = ["Copenhagen", "Helsinki", "Oslo", "Stockholm"];
			orderByTempAndGroupByClim(data, [
				"Copenhagen",
				"Helsinki",
				"Oslo",
				"Stockholm"
			]);
		}, 2000);
	}
	$: if (value == 11 && mounted) {
		todos = [];
		itemsToMove = [];
		resetData(data);
		disableClick();
		clearTimeout(moveTimeout);

		moveTimeout = setTimeout(() => {
			itemsToMove = [
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
			];
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
		}, 2000);
	}
	$: if (value == 12 && mounted) {
		todos = [];
		itemsToMove = [];
		resetData(data);
		disableClick();
		clearTimeout(moveTimeout);

		moveTimeout = setTimeout(() => {
			itemsToMove = [
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
				"Beijing",
				"Moscow"
			];
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
				"Beijing",
				"Moscow"
			]);
		}, 2000);
	}
	$: if (value === 13 && mounted) {
		document.getElementById("step13").style.opacity = 1;
		document.getElementById("step13").style.zIndex = 10000;
		todos = [];
		itemsToMove = [];
		resetData(data);
		enableClick();

		clearTimeout(moveTimeout);
	}
</script>

{#if mounted && value > 7}
	<div class="board" style="opacity:1; z-index:100;">
		{#if linesToDraw}
			<Canvas {linesToDraw} {isMobile} />
		{/if}
		<div>
			<div class="Cold">
				<div
					style="font-weight:700;border-radius:2px;padding:2px;color:white;background-color:#735fca;text-align:center;border-radius:5px;position:absolute;width:100%;right:0px;top:-10px"
				>
					Cold
				</div>
				<div class="Cold-dry-winter-hot-summer">
					<h2 class="classification">
						Dry winter, hot summer
						<span class="popup"
							>Temperature of the Coldest Month: Less than or equal to 0°C. <br
							/>
							Temperature of the Warmest Month: Greater than or equal to 22°C.
							<br />Precipitation Pattern: Dry Winter: The driest month in
							winter (Pwdry) has significantly low precipitation, defined as
							Pwdry ≤ Pswet/10.</span
						>
					</h2>

					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Cold-no-dry-season-hot-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Less than or equal to 0°C. <br
							/>
							Temperature of the Warmest Month: Greater than or equal to 22°C.
							<br /> Precipitation Pattern: The driest month in summer or winter
							does not drop below the levels that define a dry season.</span
						>No dry season, hot summer
					</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Cold-no-dry-season-warm-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Less than or equal to 0°C.<br
							/>
							Temperature of the Warmest Month: Less than 22°C and greater than 10°C.
							<br />
							Precipitation Pattern: The driest month in summer or winter does not
							drop below the levels that define a dry season.</span
						>No dry season, warm summer
					</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									updateBindFinder();
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div>
			<div class="Temperate">
				<div
					style="font-weight:700;border-radius:2px;padding:2px;color:white;background-color:#abe340;text-align:center;border-radius:5px;position:absolute;width:100%;right:0px;top:-10px;color:black"
				>
					Temperate
				</div>
				<div class="Temperate-dry-summer-hot-summer">
					<h2 class="classification">
						<span class="popup">
							Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Greater than or equal to 22°C.
							<br /> Precipitation Pattern: The driest month in summer has less than
							40 mm of precipitation, and is less than one-third of the precipitation
							in the wettest month in winter.
						</span>
						Dry summer, hot summer
					</h2>

					{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
							data={todo.name}
							bind:this={bindFinder[classToBind][todo.name]}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Temperate-no-dry-season-warm-summer">
					<h2 class="classification">
						<span class="popup">
							Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Between 10°C and 22°C for at least
							4 months of the year.
							<br />
							Precipitation Pattern: The driest month in summer or winter does not
							drop below the levels that define a dry season.
						</span>
						No dry season, warm summer
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							data={todo.name}
							bind:this={bindFinder[classToBind][todo.name]}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>

				<p class="break"></p>
				<div class="Temperate-no-dry-season-hot-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Greater than or equal to 22°C.
							<br />
							Precipitation Pattern: The driest month in summer or winter does not
							drop below the levels that define a dry season.</span
						>
						No dry season, hot summer
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<p class="break"></p>
				<div class="Temperate-dry-summer-warm-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Between 10°C and 22°C for at least
							4 months of the year.
							<br /> Precipitation Pattern: The driest month in summer has less
							than 40 mm of precipitation, and is less than one-third of the
							precipitation in the wettest month in winter.
							<br />
						</span>
						Dry summer, warm summer
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Temperate-dry-winter-hot-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Greater than or equal to 22°C.
							<br />
							The driest month in winter has less than one-tenth of the precipitation
							of the wettest month in summer.</span
						>Dry winter, hot summer
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div class="Temperate-dry-winter-warm-summer">
					<h2 class="classification">
						<span class="popup"
							>Temperature of the Coldest Month: Between 0°C and 18°C.
							<br />
							Temperature of the Warmest Month: Between 10°C and 22°C for at least
							4 months of the year.
							<br />
							The driest month in winter has less than one-tenth of the precipitation
							of the wettest month in summer.</span
						>Dry winter, warm summer
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [data];
									orderByTempAndGroupByClim(data, todo.name);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>
		</div>

		<div class="Tropical">
			<div
				style="font-weight:700;border-radius:2px;padding:2px;color:white;background-color:#1761fd;text-align:center;border-radius:5px;position:absolute;width:100%;right:0px;top:-10px;color:white"
			>
				Tropical
			</div>
			<div class="Tropical-monsoon">
				<div>
					<span class="popup"
						>Mean Annual Temperature: Greater than or equal to 18°C.
						<br />
						Precipitation Pattern: The driest month has less precipitation than the
						wettest month but more than 60 mm</span
					>
					<h2 class="classification">Monsoon</h2>
				</div>

				{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						data={todo.name}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<div class="Tropical-rainforest">
				<h2 class="classification">
					<span class="popup">
						Mean Annual Temperature: Greater than or equal to 18°C. <br /> Mean Annual
						Precipitation: More than 100 mm per month, regardless of the season.</span
					>
					Rainforest
				</h2>

				{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						data={todo.name}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<p class="break"></p>
			<div class="Tropical-savannah">
				<h2 class="classification">
					<span class="popup"
						>Mean Annual Temperature: Greater than or equal to 18°C. <br /> Mean
						Annual Precipitation: More than 100 mm per month during the wet season,
						but less than 60 mm per month during the dry season.</span
					>Savannah
				</h2>

				{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						data={todo.name}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
		</div>

		<div class="Arid">
			<div
				style="font-weight:700;border-radius:2px;padding:2px;color:white;background-color:#ff8563;text-align:center;border-radius:5px;position:absolute;width:100%;right:0px;top:-10px;color:white"
			>
				Arid
			</div>
			<div class="Arid-desert-hot">
				<h2 class="classification">
					<span class="popup"
						>Mean Annual Temperature: Greater than or equal to 18°C.
						Precipitation: The mean annual precipitation is typically less than
						100 mm, and often significantly lower. There may be months with
						virtually no rainfall.</span
					>
					Desert, hot
				</h2>
				{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						data={todo.name}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<div class="Arid-desert-cold">
				<h2 class="classification">
					<span class="popup"
						>Mean Annual Temperature: Can vary but often falls below 18°C.
						Precipitation: The mean annual precipitation is typically less than
						100 mm, and often significantly lower. There may be months with
						virtually no rainfall.</span
					>Desert, cold
				</h2>
				{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						data={todo.name}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<p class="break"></p>
			<div class="Arid-steppe-hot">
				<h2 class="classification">
					<span class="popup"
						>Mean Annual Temperature: Generally exceeds 18°C. <br /> Moderate Precipitation:
						The mean annual precipitation (MAP) is typically higher than in arid
						desert climates but still relatively low, often ranging from 100 mm to
						500 mm per year.</span
					>
					Steppe, hot
				</h2>
				{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}
					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						data={todo.name}
						bind:this={bindFinder[classToBind][todo.name]}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
			<div class="Arid-steppe-cold">
				<h2 class="classification">
					<span class="popup"
						>Mean Annual Temperature: Generally belows 18°C. <br /> Moderate Precipitation:
						The mean annual precipitation (MAP) is typically higher than in arid
						desert climates but still relatively low, often ranging from 100 mm to
						500 mm per year.</span
					>Steppe, cold
				</h2>
				{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo, i (todo.id)}
					{@const bindMe =
						itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
					{@const classToBind = todo.class ? todo.class : "noClass"}

					<label
						class={todo.class}
						in:receive={{ key: todo.id }}
						out:send={{ key: todo.id }}
						bind:this={bindFinder[classToBind][todo.name]}
						animate:flip={{ easing: customEasing1 }}
					>
						<button
							on:click={() => {
								itemsToMove = [data];
								orderByTempAndGroupByClim(data, todo.name);
							}}
						>
							{todo.name}
						</button>
					</label>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	.rect {
	}
	.rect .Cold,
	.rect .Temperate,
	.rect .Arid,
	.rect .Tropical {
	}
	.board {
		z-index: -100;
		position: sticky;
		width: 100%;
		height: 100%;
		top: 10%;
		left: 50%;
		transform: translate(3%, -50%);
		opacity: 0;
		transition: opacity 1s ease;
		scale: 1;
	}

	.Cold,
	.Temperate,
	.Tropical,
	.Arid {
		position: relative;
		float: left;
		padding: 0.5em 0.5em 0.5em 0.5em;
		box-sizing: border-box;
		margin-right: 1em;
		border-radius: 10px;
	}
	.Temperate {
		columns: 4;
		width: 35%;
		background-color: rgba(88, 249, 104, 0.25);
	}
	.Cold {
		columns: 2;
		width: 18%;
		background-color: rgba(178, 88, 249, 0.25);
	}
	.Arid {
		columns: 2;
		width: 18%;
		background-color: rgba(255, 133, 99, 0.6);
	}
	.Tropical {
		columns: 2;
		width: 18%;
		background-color: rgba(23, 97, 253, 0.5);
	}

	label {
		top: 0;
		left: 0;
		display: flex;
		font-size: 12px;
		line-height: 1;
		padding: 0px;
		margin: 0 auto 0.5em auto;
		border-radius: 2px;
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
		background-color: #96ff96;
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
		cursor: pointer;
		opacity: 1;
		font-size: 13px;
		text-align: center;
		background-color: transparent;
		fill: white;
		color: white;
		text-shadow:
			0 0 2px rgba(0, 0, 0, 1),
			0 0 2px rgba(0, 0, 0, 1);
	}

	.classification {
		cursor: pointer;
		font-size: 0.6em;
		text-align: center;

		text-transform: uppercase;
		font-weight: 700;
		word-spacing: 5px;
		font-family: Futura;
	}
	.break {
		break-after: column;
	}
	.canvas {
		z-index: 10000;
	}
	.fa-circle-info {
		font-size: 10px;
		position: absolute;
	}
	.popup {
		width: 300px;
		word-spacing: normal;
		display: none;
		position: absolute;
		text-align: left;
		background-color: #f9f9f9cb;
		padding: 10px;
		font-weight: 300;
		text-transform: none;
		border: 1px solid #ccc;
		border-radius: 5px;
		transform: translate(-80px, -100px);
		z-index: 1;
	}
	.popup::after {
		content: "";
		position: absolute;
		top: 100%; /* Position the arrow just below the popup */
		left: 50%; /* Position the arrow horizontally centered */
		border: solid transparent;
		border-width: 8px;
		border-top-color: #f9f9f9; /* Match popup background color */
		z-index: 2;
		transform: translateX(-50%); /* Center horizontally */
	}

	/* Styling for the arrow */

	.classification:hover .popup {
		display: block;
	}
</style>

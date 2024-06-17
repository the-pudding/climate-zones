<script>
	import { quintInOut } from "svelte/easing";
	import { onMount } from "svelte";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { browser } from "$app/environment";
	import { data } from "./data.svelte";
	import Canvas from "$components/Canvas.svelte";
	import ClassPopupText from "$components/ClassPopupText.svelte";
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

	$: console.log(data);

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
		}, 500);
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
		}, 500);
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
		if (isMobile) {
			document.getElementById("step_mobile12").style.opacity = 1;
			document.getElementById("step_mobile12").style.zIndex = 1;
		} else {
			document.getElementById("step12").style.opacity = 1;
			document.getElementById("step12").style.zIndex = 1;
		}

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
		if (isMobile) {
			document.getElementById("step_mobile13").style.opacity = 1;
			document.getElementById("step_mobile13").style.zIndex = 10000;
			document
				.getElementsByClassName("explore-button")[0]
				.addEventListener("click", () => {
					document.getElementById("step_mobile13").style.opacity = 0;
					document.getElementById("step_mobile13").style.zIndex = -1;
					document.getElementById("step_mobile12").style.opacity = 0;
					document.getElementById("step_mobile12").style.zIndex = -1;
				});
		} else {
			document.getElementById("step13").style.opacity = 1;
			document.getElementById("step13").style.zIndex = 10000;
			document
				.getElementsByClassName("explore-button")[0]
				.addEventListener("click", () => {
					document.getElementById("step13").style.opacity = 0;
					document.getElementById("step13").style.zIndex = -1;
				});
		}

		todos = [];
		itemsToMove = [];
		resetData(data);
		enableClick();

		clearTimeout(moveTimeout);
	}
</script>

{#if mounted}
	<div style="position: absolute;width:100vw;height:100vh;">
		{#if value == 13}
			<ClassPopupText {itemsToMove} />
		{/if}
		<div
			class="board"
			style="opacity:{value > 7 ? 1 : 0};top:{(value == 13) & isMobile
				? '20px'
				: ''}"
		>
			{#if linesToDraw}
				<Canvas {linesToDraw} {isMobile} {value} />
			{/if}
			<div
				class="Cold column"
				style="
		background-color:#FCF8FF; border-color: #E5CCFF;
		"
			>
				<div
					class="header"
					style="background-color:#E4CCFF; border-color: #C3ADD9;"
					aria-label="Cold"
				>
					<div style="z-index: 10;" class="popupColdHeader">
						<b>Average Temperature of the Hottest Month:</b> Greater than 10°C.
						<br />
						<b>Average Temperature of the Coldest Month: </b>Less than or equal
						to 0°C.
						<br /><b>Precipitation Pattern:</b> Precipitation varies, but there is
						at least one season with consistent rainfall .
					</div>
					Cold
				</div>
				<div
					aria-label="Cold, dry winter, hot summer"
					class="Cold-dry-winter-hot-summer grouping"
				>
					<h2 class="classification">
						<span class="popupCold"
							><b>Temperature of the Coldest Month: </b> Less than or equal to
							0°C. <br />
							<b>Temperature of the Warmest Month:</b> Greater than or equal to
							22°C.
							<br /><b>Precipitation Pattern: </b> The driest month in winter (Pwdry)
							has significantly low precipitation compared to the wettest month.</span
						>
						<u>Dry winter, hot summer</u>
					</h2>

					{#each todos.filter((t) => t.clim == "Cold, dry winter, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							aria-label="Cold, dry winter, hot summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					class="Cold-no-dry-season-hot-summer grouping"
					aria-label="Cold, no dry season, hot summer"
				>
					<h2 class="classification">
						<span class="popupCold"
							><b>Temperature of the Coldest Month:</b> Less than or equal to
							0°C. <br />
							<b>Temperature of the Warmest Month:</b> Greater than or equal to
							22°C.
							<br /><b>Precipitation Pattern:</b> The driest month in summer or winter
							does not drop below the levels that define a dry season.</span
						><u>No dry season, hot summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Cold, no dry season, hot summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					class="Cold-no-dry-season-warm-summer grouping"
					aria-label="Cold, no dry season, warm summer"
					style="border: none;"
				>
					<h2 class="classification">
						<span class="popupCold"
							><b>Temperature of the Coldest Month:</b> Less than or equal to
							0°C.<br />
							<b>Temperature of the Warmest Month:</b> Less than 22°C and
							greater than 10°C.
							<br />
							<b>Precipitation Pattern:</b> The driest month in summer or winter
							does not drop below the levels that define a dry season.</span
						><u>No dry season, warm summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Cold, no dry season, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Cold, no dry season, warm summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>

			<div class="Temperate column">
				<div
					class="header"
					style="background-color:#BCE3FF;border-color:#A1C1DA;"
					aria-label="Temperate"
				>
					<span class="popupHeader"
						><b>Average Temperature of the Hottest Month:</b> Greater than 10°C.
						<br />
						<b>Average Temperature of the Coldest Month:</b> Between 0°C and
						18°C.
						<br /><b>Precipitation Pattern:</b> Precipitation varies, but there is
						at least one season with consistent rainfall .</span
					>
					Temperate
				</div>
				<div
					aria-label="Temperate, dry summer, hot summer"
					class="Temperate-dry-summer-hot-summer grouping"
				>
					<h2 class="classification">
						<span onclick="" class="popup">
							<b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Greater than or equal to
							22°C.
							<br /> <b>Precipitation Pattern:</b> The driest month in summer has
							less than 40 mm of precipitation, and is less than one-third of the
							precipitation in the wettest month in winter.
						</span>
						<u>Dry summer, hot summer</u>
					</h2>

					{#each todos.filter((t) => t.clim == "Temperate, dry summer, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Temperate, dry summer, hot summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							animate:flip={{ easing: customEasing1 }}
							data={todo.name}
							bind:this={bindFinder[classToBind][todo.name]}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Temperate, no dry season, warm summer"
					class="Temperate-no-dry-season-warm-summer grouping"
				>
					<h2 class="classification">
						<span class="popup">
							<b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Between 10°C and 22°C for
							at least 4 months of the year.
							<br />
							<b>Precipitation Pattern:</b> The driest month in summer or winter
							does not drop below the levels that define a dry season.
						</span>
						<u>No dry season, warm summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Temperate, no dry season, warm summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							data={todo.name}
							bind:this={bindFinder[classToBind][todo.name]}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Temperate, no dry season, hot summer"
					class="Temperate-no-dry-season-hot-summer grouping"
				>
					<h2 class="classification">
						<span class="popup"
							><b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Greater than or equal to
							22°C.
							<br />
							<b>Precipitation Pattern:</b> The driest month in summer or winter
							does not drop below the levels that define a dry season.</span
						>
						<u>No dry season, hot summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, no dry season, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Temperate, no dry season, hot summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Temperate, dry summer, warm summer"
					class="Temperate-dry-summer-warm-summer grouping"
				>
					<h2 class="classification">
						<span class="popup"
							><b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Between 10°C and 22°C for
							at least 4 months of the year.
							<br /> <b>Precipitation Pattern:</b> The driest month in summer
							has less than 40 mm of precipitation, and is less than one-third
							of the precipitation in the wettest month in winter.
							<br />
						</span>
						<u>Dry summer, warm summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry summer, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Temperate, dry summer, warm summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Temperate, dry winter, hot summer"
					class="Temperate-dry-winter-hot-summer grouping"
				>
					<h2 class="classification">
						<span class="popup"
							><b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Greater than or equal to
							22°C.
							<br />
							<b>Precipitation Pattern:</b>The driest month in winter has less
							than one-tenth of the precipitation of the wettest month in
							summer.</span
						><u>Dry winter, hot summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, hot summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							aria-label="Temperate, dry winter, hot summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Temperate, dry winter, warm summer"
					class="Temperate-dry-winter-warm-summer grouping"
					style="border-bottom:none;"
				>
					<h2 class="classification">
						<span class="popup"
							><b>Temperature of the Coldest Month:</b> Between 0°C and 18°C.
							<br />
							<b>Temperature of the Warmest Month:</b> Between 10°C and 22°C for
							at least 4 months of the year.
							<br />
							<b>Precipitation Pattern:</b>The driest month in winter has less
							than one-tenth of the precipitation of the wettest month in
							summer.</span
						><u>Dry winter, warm summer</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Temperate, dry winter, warm summer") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							aria-label="Temperate, dry winter, warm summer"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>

			<div class="Tropical column">
				<div
					class="header"
					style="background-color:#AFF4C5; border-color: #96D0A8"
					aria-label="Tropical"
				>
					<span class="popupHeader"
						><b>Average Temperature of the Coldest Month:</b> Greater than 18°C.
						<br /><b>Precipitation Pattern:</b> Precipitation varies, but there is
						at least one season with heavy rainfall .</span
					>
					Tropical
				</div>
				<div aria-label="Tropical, monsoon" class="Tropical-monsoon grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Greater than or equal to 18°C.
							<br />
							<b>Precipitation Pattern:</b> The driest month has less precipitation
							than the wettest month but more than 60 mm</span
						>
						<u>Monsoon</u>
					</h2>

					{#each todos.filter((t) => t.clim == "Tropical, monsoon") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Tropical, monsoon"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div
					aria-label="Tropical, rainforest"
					class="Tropical-rainforest grouping"
				>
					<h2 class="classification">
						<span class="popup">
							<b>Mean Annual Temperature:</b> Greater than or equal to 18°C.
							<br />
							Mean
							<b>Annual Precipitation:</b> More than 100 mm per month, regardless
							of the season.</span
						>
						<u>Rainforest</u>
					</h2>

					{#each todos.filter((t) => t.clim == "Tropical, rainforest") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Tropical, rainforest"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div aria-label="Tropical, savannah" class="Tropical-savannah grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Greater than or equal to 18°C.
							<br />
							Mean
							<b>Annual Precipitation:</b> More than 100 mm per month during the
							wet season, but less than 60 mm per month during the dry season.</span
						><u>Savannah</u>
					</h2>

					{#each todos.filter((t) => t.clim == "Tropical, savannah") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Tropical, savannah"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
			</div>

			<div class="Arid column">
				<div
					class="header"
					style="background-color:#FFC7C1; border-color:#DAA9A5;"
					aria-label="Arid"
				>
					<span class="popupHeader"
						><b>Average Annual Temperature: </b>Can vary within group.
						<br /><b>Precipitation Pattern:</b> Very limited rainfall throughout
						year.</span
					>
					Arid
				</div>
				<div aria-label="Arid, desert, hot" class="Arid-desert-hot grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Greater than or equal to 18°C.
							<br /><b>Precipitation Pattern:</b> The mean annual precipitation is
							typically less than 100 mm, and often significantly lower. There may
							be months with virtually no rainfall.</span
						>
						<u>Desert, hot</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, hot") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Arid, desert, hot"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div aria-label="Arid, desert, cold" class="Arid-desert-cold grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Can vary but often falls below
							18°C.
							<b>Precipitation Pattern:</b> The mean annual precipitation is typically
							less than 100 mm, and often significantly lower. There may be months
							with virtually no rainfall.</span
						><u>Desert, cold</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Arid, desert, cold") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Arid, desert, cold"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							data={todo.name}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div aria-label="Arid, steppe, hot" class="Arid-steppe-hot grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Generally exceeds 18°C. <br />
							<b>Precipitation Precipitation:</b> The mean annual precipitation (MAP)
							is typically higher than in arid desert climates but still relatively
							low, often ranging from 100 mm to 500 mm per year.</span
						>
						<u>Steppe, hot</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, hot") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}
						<label
							aria-label="Arid, steppe, hot"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							data={todo.name}
							bind:this={bindFinder[classToBind][todo.name]}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
								}}
							>
								{todo.name}
							</button>
						</label>
					{/each}
				</div>
				<div aria-label="Arid, steppe, cold" class="Arid-steppe-cold grouping">
					<h2 class="classification">
						<span class="popup"
							><b>Mean Annual Temperature:</b> Generally belows 18°C. <br />
							<b>Precipitation Pattern:</b> The mean annual precipitation (MAP) is
							typically higher than in arid desert climates but still relatively
							low, often ranging from 100 mm to 500 mm per year.</span
						><u>Steppe, cold</u>
					</h2>
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							aria-label="Arid, steppe, cold"
							class={todo.class}
							in:receive={{ key: todo.id }}
							out:send={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
							animate:flip={{ easing: customEasing1 }}
						>
							<button
								on:click={() => {
									itemsToMove = [todo.name];
									orderByTempAndGroupByClim(data, [todo.name]);
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
{/if}

<style>
	.header {
		font-family: var(--sans);
		color: black;
		font-weight: 700;
		border-radius: 2px;
		padding: 0.5rem;
		text-align: center;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		border-radius: 5px;
		position: absolute;
		left: 0;
		text-align: left;
		display: inline-block;
		top: -10px;
		transform: translate(0, -100%);
		border: 1px solid;
		padding: 0 5px;
		margin: 0;
	}
	.rect {
	}
	.rect .Cold,
	.rect .Temperate,
	.rect .Arid,
	.rect .Tropical {
	}
	* {
		/* break-before: avoid; */
		/* break-after: avoid; */
		/* break-inside: avoid; */
	}

	.board {
		position: absolute;
		top: 150px;
		transform: translate(0%, 0%);
		opacity: 0;
		transition: opacity 1s ease;
		scale: 1;
		width: 100%;
		left: 0;
		right: 0;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.column {
		border: 2px solid;
	}

	.Cold,
	.Temperate,
	.Tropical,
	.Arid {
		position: relative;
		float: left;
		padding: 0.5rem;
		box-sizing: border-box;
		margin-right: 1em;
		border-radius: 10px;
	}
	.Temperate {
		width: 35%;
		background-color: #f5fbff;
		border-color: #bde3ff;
	}
	.Temperate .grouping {
		border-color: #bde3ff;
	}
	.Cold {
		width: 18%;
		background-color: rgba(178, 88, 249, 0.25);
	}
	.Arid {
		width: 18%;
		background-color: #fff7f6;
		border-color: #ffc7c2;
	}

	.Arid .grouping {
		border-color: #ffc7c2;
	}

	.Tropical {
		width: 18%;
		background-color: #f3fdf6;
		border-color: #aff4c6;
	}

	.Tropical .grouping {
		border-color: #aff4c6;
	}

	label {
		display: inline-block;
		font-size: 12px;
		line-height: 1;
		padding: 0px 5px;
		border-radius: 2px;
		background-color: #eee;
		user-select: none;
		color: black;
		justify-content: flex-start;
		margin-right: 5px;
		margin-top: 5px;
	}

	.Temperate-dry-summer-warm-summer label {
		background-color: #bfdbf0;
	}
	.Temperate-dry-summer-hot-summer label {
		background-color: #bcf7ff;
	}
	.Temperate-dry-winter-hot-summer label {
		background-color: #bcc7ff;
	}
	.Temperate-dry-winter-warm-summer label {
		background-color: #79c7ff;
	}
	.Temperate-no-dry-season-warm-summer label {
		background-color: #bcdfff;
	}
	.Temperate-no-dry-season-hot-summer label {
		background-color: #97cdf4;
	}
	.Cold-dry-winter-hot-summer {
		position: relative;
	}
	.Cold-dry-winter-hot-summer label {
		background-color: #f8cbff;
	}
	.Cold-no-dry-season-hot-summer label {
		background-color: #cbd6ff;
	}
	.Cold-no-dry-season-warm-summer label {
		background-color: #e2cbff;
	}
	@supports (-moz-appearance: none) {
		.Cold-no-dry-season-warm-summer,
		.Tropical-savannah,
		.Arid-steppe-hot,
		.Arid-steppe-cold,
		.Temperate-dry-summer-warm-summer,
		.Temperate-dry-winter-hot-summer,
		.Temperate-dry-winter-warm-summer,
		.Temperate-no-dry-season-warm-summer,
		.Temperate-no-dry-season-hot-summer {
			position: relative;
			top: 15px;
		}
	}
	.Arid-desert-hot label {
		background-color: #ffb098;
	}
	.Arid-desert-cold label {
		background-color: #ffe870;
	}
	.Arid-steppe-hot label {
		background-color: #ffd5a4;
	}
	.Arid-steppe-cold label {
		background-color: #ffd0c1;
	}
	.Tropical-monsoon label {
		background-color: #aff4c5;
	}
	.Tropical-rainforest label {
		background-color: #eaf4af;
	}

	.Tropical-savannah label {
		background-color: #daf4af;
	}

	button {
		cursor: pointer;
		opacity: 1;
		font-size: 16px;
		text-align: left;
		background-color: transparent;
		color: black;
		font-weight: 400;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		padding: 0;
		margin: 0;
	}

	.classification {
		cursor: pointer;
		font-size: 12px;
		display: inline-block;
		font-weight: 500;
		text-align: left;
		line-height: 1;
		position: relative;
		margin: 0;

		text-transform: uppercase;
		font-family: var(--sans);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
		margin-right: 5px;
	}

	.break {
		column-fill: balance;
		break-after: always;
	}
	.canvas {
		z-index: 10000;
	}
	.fa-circle-info {
		font-size: 10px;
		position: absolute;
	}
	.popup {
		width: 400px;
		word-spacing: normal;
		display: none;
		position: absolute;
		text-align: left;
		background-color: rgba(249, 249, 249, 1);
		padding: 10px;
		font-weight: 300;
		text-transform: none;
		border: 1px solid #ccc;
		border-radius: 5px;

		top: 50%;
		transform: translate(-50%, -129%);
		left: 50%;
		align-items: center;
		z-index: 1;
	}
	.popupCold {
		width: 400px;
		word-spacing: normal;
		display: none;
		position: absolute;
		text-align: left;
		background-color: #f9f9f9;
		padding: 10px;
		font-weight: 300;
		text-transform: none;
		border: 1px solid #ccc;
		border-radius: 5px;
		top: 50%;
		transform: translate(-30%, -129%);
		left: 50%;
		align-items: center;
		z-index: 1;
	}
	.popupColdHeader {
		width: 400px;
		word-spacing: normal;
		display: none;
		position: absolute;
		text-align: left;
		background-color: rgba(249, 249, 249, 1);
		padding: 10px;
		font-weight: 300;
		font-size: 12px;
		text-transform: none;
		border: 1px solid #ccc;
		border-radius: 5px;

		top: 50%;
		transform: translate(-10%, -120%);
		left: 50%;
		align-items: center;
		z-index: 1;
	}
	.popupHeader {
		width: 400px;
		word-spacing: normal;
		display: none;
		position: absolute;
		text-align: left;
		background-color: rgba(249, 249, 249, 1);
		padding: 10px;
		font-weight: 300;
		font-size: 12px;
		text-transform: none;
		border: 1px solid #ccc;
		border-radius: 5px;

		top: 50%;
		transform: translate(-50%, -120%);
		left: 50%;
		align-items: center;
		z-index: 100;
	}
	.popupColdHeader::after {
		content: "";
		position: absolute;
		top: 100%; /* Position the arrow just below the popup */
		left: 40%; /* Position the arrow horizontally centered */

		border-style: solid; /* Set border style */
		border-color: transparent transparent transparent transparent; /* Match popup background color */
		border-width: 8px;
		border-top-color: lightgrey; /* Match popup background color */
		z-index: 2;

		transform: translateX(-816%); /* Center horizontally */
	}

	.popup::after {
		content: "";
		position: absolute;
		top: 100%; /* Position the arrow just below the popup */
		left: 50%; /* Position the arrow horizontally centered */
		border-style: solid; /* Set border style */
		border-color: transparent transparent transparent transparent; /* Match popup background color */
		border-width: 8px;
		border-top-color: darkgray; /* Match popup background color */
		z-index: 2;
		transform: translateX(-50%); /* Center horizontally */
	}
	.popupHeader::after {
		content: "";
		position: absolute;
		top: 100%; /* Position the arrow just below the popup */
		left: 50%; /* Position the arrow horizontally centered */
		border-style: solid; /* Set border style */
		border-color: transparent transparent transparent transparent; /* Match popup background color */
		border-width: 8px;
		border-top-color: darkgray; /* Match popup background color */
		z-index: 2;
		transform: translateX(-50%); /* Center horizontally */
	}
	.popupCold::after {
		content: "";
		position: absolute;
		top: 100%; /* Position the arrow just below the popup */
		left: 50%; /* Position the arrow horizontally centered */

		border-style: solid; /* Set border style */
		border-color: transparent transparent transparent transparent; /* Match popup background color */
		border-width: 8px;
		border-top-color: darkgray; /* Match popup background color */
		z-index: 2;

		transform: translateX(-816%); /* Center horizontally */
	}

	/* Styling for the arrow */

	.classification:hover .popup {
		display: block;
	}
	.classification:hover .popupCold {
		display: block;
	}

	.header:hover .popupHeader {
		display: block;
	}

	.header:hover .popupColdHeader {
		display: block;
	}

	.grouping {
		display: flex;
		flex-wrap: wrap;
		border-bottom: 1px solid red;
		padding-bottom: 5px;
		padding-top: 5px;
		align-items: baseline;
	}
	.Cold .grouping {
		border-color: #e5ccff;
	}

	.move {
		box-shadow: 0 0 0 2px black;
		z-index: 1;
	}

	.ghost {
		opacity: 0.2;
	}

	u {
		text-decoration: none;
		border: none;
	}

	u:after {
		content: "?";
		font-size: 10px;
		background-color: #d7d7d7;
		color: black;
		padding: 1px;
		margin-left: 3px;
		transform: translate(0, -3px);
	}

	@media only screen and (max-width: 600px) {
		.popupHeader {
			width: 350px;
			left: -120px;
		}

		.Arid-steppe-hot .popup {
			width: 350px;
			left: 0px;
			text-align: left;
		}

		.popup {
			width: 350px;
			left: 200px;
			top: 20px;
			text-align: left;
		}
		.popupCold {
			width: 100vw;
			left: -10px;
			top: 20px;
			transform: translateY(0px);
			text-align: left;
		}
		.popupColdHeader {
			width: 80vw;
			left: -252px;
			top: 30px;
			z-index: 1000;
		}
		.popupHeader::after {
			transform: translateX(120px);
		}
		.popupColdHeader::after {
			transform: translateX(290px);
		}
		.popup::after {
			transform: translateX(-170px);
		}
		.popupCold::after {
			transform: translate(-170px, -96px) rotate(-180deg);
		}

		.Arid-steppe-hot .popup::after {
			transform: translateX(-0px);
		}

		.board {
			flex-wrap: wrap;
			top: 20px;
		}

		.Cold,
		.Arid,
		.Temperate,
		.Tropical {
			width: calc(100% - 10px);
			margin: 0;
			margin-bottom: 5px;
		}

		button {
			font-size: 12px;
			font-weight: 700;
		}

		.classification {
			letter-spacing: 0;
			text-transform: none;
		}

		.header {
			transform: translate(0, -5px);
			font-size: 14px;
			right: 0;
			left: auto;
		}

		.grouping {
			padding: 0;
			padding-bottom: 2px;
		}

		.column {
			display: flex;
			flex-wrap: wrap;
			padding: 0;
			padding-left: 2px;
		}

		@media only screen and (min-height: 600px) {
			.column {
				margin-bottom: 20px;
			}
		}
	}
</style>

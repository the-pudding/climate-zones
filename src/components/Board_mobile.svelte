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
		if (itemsToMove.length == 0) {
			return 0;
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
				labels[i].style.outline = null;
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
				}
			}
		}, 500);
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
			<div class="rect">
				<div
					style="font-weight:700;position:relative;border-radius:2px;padding:2px;color:white;background-color:#735fca;writing-mode: vertical-rl; text-orientation: upright;text-align:center;font-size:12px"
				>
					Cold
				</div>
				<div class="Cold">
					<div class="Cold-dry-winter-hot-summer">
						<h2 class="classification">Dry winter, hot summer</h2>
						<br />
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
						<h2 class="classification">No dry season, hot summer</h2>
						<br />
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
					<div class="Cold-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						<br />
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
		</div>
		<div>
			<div class="rect">
				<div
					style="border-radius:2px;font-weight:700;padding:2px;color:black;background-color:#abe340;writing-mode: vertical-rl; text-orientation: upright;text-align:center;position:relative;font-size:12px"
				>
					Temperate
				</div>
				<div class="Temperate">
					<div class="Temperate-dry-summer-hot-summer">
						<h2 class="classification">Dry summer, hot summer</h2>
						<br />

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

					<div class="Temperate-no-dry-season-warm-summer">
						<h2 class="classification">No dry season, warm summer</h2>
						<br />
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

					<div class="Temperate-no-dry-season-hot-summer">
						<h2 class="classification">No dry season, hot summer</h2>
						<br />
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

					<div class="Temperate-dry-summer-warm-summer">
						<h2 class="classification">Dry summer, warm summer</h2>
						<br />
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
						<h2 class="classification">Dry winter, hot summer</h2>
						<br />
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
						<h2 class="classification">Dry winter, warm summer</h2>
						<br />
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
		</div>
		<div class="rect">
			<div
				style="border-radius:2px;padding:2px;color:white;background-color:#1761fd;writing-mode: vertical-rl;font-weight:700; text-orientation: upright;text-align:center;position:relative;font-size:12px"
			>
				Tropical
			</div>
			<div class="Tropical">
				<div class="Tropical-monsoon">
					<h2 class="classification">Monsoon</h2>
					<br />

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
					<h2 class="classification">Rainforest</h2>
					<br />

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

				<div class="Tropical-savannah">
					<h2 class="classification">Savannah</h2>
					<br />

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
		</div>
		<div class="rect">
			<div
				style="border-radius:2px;padding:2px;color:white;background-color:#ff8563;writing-mode: vertical-rl; font-weight:700;text-orientation: upright;text-align:center;font-size:12px"
			>
				Arid
			</div>
			<div class="Arid">
				<div class="Arid-desert-hot">
					<h2 class="classification">Desert, hot</h2>
					<br />
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
					<h2 class="classification">Desert, cold</h2>
					<br />

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

				<div class="Arid-steppe-hot">
					<h2 class="classification">Steppe, hot</h2>
					<br />
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
					<h2 class="classification">Steppe, cold</h2>
					<br />
					{#each todos.filter((t) => t.clim == "Arid, steppe, cold") as todo, i (todo.id)}
						{@const bindMe =
							itemsToMove.indexOf(todo.name) > -1 ? "bind" : "noBind"}
						{@const classToBind = todo.class ? todo.class : "noClass"}

						<label
							class={todo.class}
							in:receive={{ key: todo.id }}
							bind:this={bindFinder[classToBind][todo.name]}
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
			</div>
		</div>
	</div>
{/if}

<style>
	.board {
		z-index: 100;
		position: sticky;
		width: 100%;
		height: 100%;
		transform: translateX(0px);
		top: 20px;

		opacity: 1;
		transition: opacity 1s ease;
		scale: 1;
	}
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

	.Temperate {
		background-color: rgba(88, 249, 104, 0.25);
		font-size: 10px;
	}
	.Cold {
		background-color: rgba(178, 88, 249, 0.25);
		font-size: 10px;
	}
	.Arid {
		background-color: rgba(249, 88, 88, 0.6);
		font-size: 10px;
	}
	.Tropical {
		background-color: rgba(23, 97, 253, 0.5);
		font-size: 10px;
	}

	label {
		display: inline-flex;

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
		cursor: pointer;
		opacity: 1;
		font-size: 10px;
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
		font-size: 10px;
		font-family: Futura;
	}

	.canvas {
		z-index: 10000;
	}
	h2 {
		display: contents;
		font-size: 11px;
	}
	h3 {
		display: none;
	}
</style>

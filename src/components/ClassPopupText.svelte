<script>
	import { html, timeMonday } from "d3";
	export let itemsToMove;
	import { data } from "./data.svelte";
	import { temp_2023, temp_2070 } from "$stores/store.js";

	let chosenCityData;
	let buttonLabel = "<strong>°C</strong> / °F";

	// Filter data to find the chosen city
	$: chosenCityData = data.filter((el) => {
		return String(el.name) === String(itemsToMove[0]);
	});

	function changeTemp(data) {
		if (buttonLabel == "<strong>°F</strong> / °C") {
			buttonLabel = "<strong>°C</strong> / °F";
			$temp_2023 = String(Math.round(data[0].temp_2023 * 10) / 10 + "°C");
			$temp_2070 = String(Math.round(data[0].temp_2070 * 10) / 10 + "°C");
		} else {
			buttonLabel = "<strong>°F</strong> / °C";
			$temp_2023 = String(
				Math.round(((data[0].temp_2023 * 9) / 5 + 32) * 10) / 10 + "°F"
			);
			$temp_2070 = String(
				Math.round(((chosenCityData[0].temp_2070 * 9) / 5 + 32) * 10) / 10 +
					"°F"
			);
		}
	}
	function closeButton() {
		document.getElementsByClassName("chosenCity")[0].style.backgroundColor =
			"rgba(255, 255, 255, 0);";
		document.getElementsByClassName("chosenCity")[0].style.zIndex = -1;
	}
</script>

{#if chosenCityData.length > 0}
	<p class="chosenCity">
		<button on:click={changeTemp(chosenCityData)} class="changeTemp"
			>{@html buttonLabel}</button
		>
		<button on:click={closeButton} class="closeButton">X</button>
		<b>{chosenCityData[0].name}'s</b> average temperature
		<b>
			<span
				style="color:{chosenCityData[0].temp_2070 > chosenCityData[0].temp_2023
					? 'red'
					: 'blue'}"
			>
				{chosenCityData[0].temp_2070 > chosenCityData[0].temp_2023
					? "increases"
					: "decreases"}
			</span></b
		>

		from
		<b
			>{#if $temp_2023 == 0}
				{Math.round(((chosenCityData[0].temp_2023 * 9) / 5 + 32) * 10) /
					10}&deg;F
			{:else}
				{$temp_2023}
			{/if}
		</b>
		to
		<b
			>{#if $temp_2070 == 0}
				{Math.round(((chosenCityData[0].temp_2070 * 9) / 5 + 32) * 10) /
					10}&deg;F
			{:else}
				{$temp_2070}
			{/if}</b
		>
		and

		{#if chosenCityData[0].type_2023 === chosenCityData[0].type_2070}
			remains in <span class={chosenCityData[0].type_2023.split(",")[0]}>
				{chosenCityData[0].type_2023.split(",")[0]}
			</span>
		{:else}
			moves from {" "}
			<span class={chosenCityData[0].type_2023.split(",")[0]}>
				{chosenCityData[0].type_2023.split(",")[0]}
			</span>
		{/if}
		{chosenCityData[0].type_2023
			.split(chosenCityData[0].type_2023.split(",")[0])[1]
			.substring(2)}

		{#if chosenCityData[0].type_2023 === chosenCityData[0].type_2070}{:else}
			to{" "}
			<span class={chosenCityData[0].type_2070.split(",")[0]}>
				{chosenCityData[0].type_2070.split(",")[0]}
			</span>{/if}

		{#if chosenCityData[0].type_2023 === chosenCityData[0].type_2070}{:else}
			{chosenCityData[0].type_2070
				.split(chosenCityData[0].type_2070.split(",")[0])[1]
				.substring(2)}
		{/if}
	</p>
{/if}

<style>
	.closeButton {
		position: absolute;
		top: 0px;
		right: 0px;
		font-size: 7px;
		margin: 2px;
		padding: 2px;
		display: none;
	}
	* {
		font-family: Atlas Grotesk;
	}

	b {
		font-weight: 500;
	}
	.changeTemp {
		position: relative;
		margin: 10px;
		font-size: 10px;
		z-index: 0;
		margin: 0;
		padding: 5px 10px;
	}

	.Temperate,
	.Cold,
	.Tropical,
	.Arid {
		font-size: 14px;
		border-radius: 5px;
		font-weight: 500;

		padding: 0 5px;
	}

	.Temperate {
		background-color: rgb(188, 227, 255);
		border: 1px solid rgb(161, 193, 218);
	}
	.Cold {
		background-color: rgb(228, 204, 255);
		border: 1px solid rgb(195, 173, 217);
	}
	.Arid {
		background-color: rgb(255, 199, 193);
		border: 1px solid rgb(218, 169, 165);
	}
	.Tropical {
		background-color: rgb(175, 244, 197);
		border: 1px solid rgb(150, 208, 168);
	}
	.classification {
		cursor: pointer;
		font-size: 16px;
		display: inline-block;
		font-weight: 400;
		text-align: left;
		line-height: 1;
		letter-spacing: 0;
		position: relative;
		margin: 0;
		font-family: var(--sans);
		margin-right: 5px;
	}
	.chosenCity {
		position: absolute;
		left: 50%;
		bottom: 10px;
		width: 100%;
		z-index: 100;
		text-align: center;
		transform: translate(-50%);
		width: calc(100% - 50px);
		max-width: 800px;
	}
	@media only screen and (max-width: 600px) {
		.changeTemp {
			z-index: 0;
		}
		.chosenCity {
			/* left: 50%; */
			font-size: 14px;
			text-align: center;
		}
		.Temperate,
		.Cold,
		.Tropical,
		.Arid {
			font-size: 13px;
			border-radius: 5px;
			font-weight: 700;
			padding: 0 5px;
		}
	}
	@media only screen and (max-height: 800px) and (max-width: 600px) {
		.chosenCity {
			background-color: rgba(255, 255, 255, 0.9);
			font-size: 14px;
			padding: 10px;
			bottom: 510px;
			text-align: center;
		}
		.closeButton {
			display: block;
		}
	}
</style>

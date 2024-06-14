<script>
	import { html, timeMonday } from "d3";
	export let itemsToMove;
	import { data } from "./data.svelte";
	import { temp_2023, temp_2070 } from "$stores/store.js";

	let chosenCityData;
	let buttonLabel = "°C";

	// Filter data to find the chosen city
	$: chosenCityData = data.filter((el) => {
		return String(el.name) === String(itemsToMove[0]);
	});

	function changeTemp(data) {
		if (buttonLabel == "°C") {
			buttonLabel = "°F";
			$temp_2023 = String(Math.round(data[0].temp_2023 * 10) / 10 + "°C");
			$temp_2070 = String(Math.round(data[0].temp_2070 * 10) / 10 + "°C");
		} else {
			buttonLabel = "°C";
			$temp_2023 = String(
				Math.round(((data[0].temp_2023 * 9) / 5 + 32) * 10) / 10 + "°F"
			);
			$temp_2070 = String(
				Math.round(((chosenCityData[0].temp_2070 * 9) / 5 + 32) * 10) / 10 +
					"°F"
			);
		}
	}
</script>

{#if chosenCityData.length > 0}
	<div class="chosenCity">
		<div>
			<button on:click={changeTemp(chosenCityData)} class="changeTemp"
				>{buttonLabel}</button
			>
		</div>
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
		<span class="classification">
			{chosenCityData[0].type_2023
				.split(chosenCityData[0].type_2023.split(",")[0])[1]
				.substring(2)}</span
		>

		{#if chosenCityData[0].type_2023 === chosenCityData[0].type_2070}{:else}
			to{" "}
			<span class={chosenCityData[0].type_2070.split(",")[0]}>
				{chosenCityData[0].type_2070.split(",")[0]}
			</span>
		{/if}

		{#if chosenCityData[0].type_2023 === chosenCityData[0].type_2070}{:else}
			<span class="classification">
				{chosenCityData[0].type_2070
					.split(chosenCityData[0].type_2070.split(",")[0])[1]
					.substring(2)}
			</span>
		{/if}
	</div>
{/if}

<style>
	* {
		font-family: Atlas Grotesk;
	}
	.changeTemp {
		position: absolute;
		margin: 10px;
		left: -3px;
		top: 28px;
		font-size: 10px;
		z-index: 100;
	}

	.Temperate,
	.Cold,
	.Tropical,
	.Arid {
		font-size: 16px;
		border-radius: 5px;
		font-weight: 700;

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
	.chosenCity {
		position: absolute;
		left: 50%;
		top: 5%;
		width: 100%;
		text-align: center;
		transform: translate(-50%);
	}
	@media only screen and (max-width: 600px) {
		.chosenCity {
			position: absolute;
			/* left: 50%; */
			z-index: 100000;
			top: 1%;
			font-size: 12px;
			opacity: 0.8;
			text-align: center;
			-webkit-transform: translate(-50%);
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
</style>

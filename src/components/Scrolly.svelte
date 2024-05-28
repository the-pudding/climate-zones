<script>
	import Board from "$components/Board.svelte";
	import BoardMobile from "$components/Board_mobile.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MapTitle from "$components/MapTitle.svelte";
	import { map } from "d3";
	import { text } from "./Text.svelte";
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";

	let value;
	$: value, console.log(value);

	let isMobile;
	onMount(() => {
		isMobile = $viewport.width < 600;
		console.log($viewport.width);
		console.log(isMobile);
	});
</script>

<section id="scrolly">
	<MapTitle {value} />
	{#if isMobile}
		<BoardMobile {value} {isMobile} />
		<Scrolly bind:value>
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
				{@const active = value === i}

				<div class="step" id={`step_mobile${i}`} class:active>
					<p class="text">{@html text[val]}</p>
				</div>
			{/each}
		</Scrolly>
	{:else}
		<Board {value} {isMobile} />
		<Scrolly bind:value>
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
				{@const active = value === i}
				<div class="step" id={`step${i}`} class:active>
					<p class="text">{@html text[val]}</p>
				</div>
			{/each}
		</Scrolly>
	{/if}
</section>

<style>
	#scrolly {
		background-color: #f7f7f7;
		width: 100%;
		height: 100%;
	}
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 100vh;
	}

	.step {
		height: 100%;
		width: 200px;
		position: relative;
		z-index: 1000;
		left: 50px;
		border-radius: 10px;
		color: rgb(0, 0, 0);
		background: rgba(255, 255, 255, 0.9);
		opacity: 100%;
		text-align: center;
		font-size: 12px;
		margin-bottom: 500px;
	}
	#step0 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
		padding-bottom: 200px;
		background-color: transparent;
		scale: 0.7;
		top: -100px;
	}
	#step_mobile0 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
		padding-bottom: 200px;
		background-color: transparent;
		left: 10%;
	}
	#step1 {
		height: 100%;
		width: 300px;
		max-width: 300px;
	}
	#step_mobile1 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step2 {
		height: 100%;
		width: 300px;
		max-width: 300px;
	}
	#step_mobile2 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step3 {
		height: 100%;
		width: 400px;
		max-width: 300px;
	}
	#step_mobile3 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step4 {
		height: 100%;
		width: 400px;
	}
	#step_mobile4 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step5 {
		height: 100%;
		width: 400px;
	}
	#step_mobile5 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step6 {
		height: 100%;
		width: 400px;
	}
	#step_mobile6 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step7 {
		height: 100%;
		width: 400px;
	}
	#step_mobile7 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step8 {
		height: 100%;
		height: 200px;
		width: 400px;
	}
	#step_mobile8 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step9 {
		height: 100%;
		width: 300px;
	}
	#step_mobile9 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step10 {
		height: 100%;
		height: 300px;
		width: 300px;
	}
	#step_mobile10 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step11 {
		height: 100%;
		width: 300px;
	}
	#step_mobile11 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step12 {
		left: 70%;
		height: 100%;
		width: 300px;
		margin-bottom: 1000px;
	}
	#step_mobile12 {
		height: 100%;
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 1000px;
	}
	#step13 {
		margin: auto;
		max-width: calc(100vw - 100px);
		left: auto;
		top: -400px;
		height: 100%;
		width: 800px;
	}
	#step_mobile13 {
		margin: auto;
		max-width: calc(100vw - 100px);
		left: auto;
		top: -400px;
		height: 100%;
		width: 800px;
	}

	.step p {
		padding: 1rem;
	}
	.intro-text {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%; /* Adjust the width as needed */
	}
</style>

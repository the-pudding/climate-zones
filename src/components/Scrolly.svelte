<script>
	import Board from "$components/Board.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MapTitle from "$components/MapTitle.svelte";
	import { map } from "d3";
	import { text } from "./Text.svelte";
	import { onMount } from "svelte";
	let value;
	$: value, console.log(value);
</script>

<section id="scrolly">
	<MapTitle {value} />
	<Board {value} />
	<Scrolly bind:value>
		{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
			{@const active = value === i}
			<div class="step" id={`step${i}`} class:active>
				<p class="text">{@html text[val]}</p>
			</div>
		{/each}
	</Scrolly>
</section>

<style>
	#scrolly {
		background-color: #f7f7f7;
	}
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 100vh;
	}

	.step {
		height: 200px;
		width: 200px;
		position: relative;
		z-index: 1000;
		left: 50px;
		border-radius: 10px;
		color: rgb(0, 0, 0);
		background: rgba(255, 255, 255, 0.9);
		opacity: 100%;
		text-align: center;
		margin-bottom: 500px;
	}
	#step0 {
		height: 100%;
		width: 100%;
		padding-bottom: 200px;
		background-color: transparent;
	}
	#step1 {
		height: 400px;
		width: 300px;
	}
	#step2 {
		height: 300px;
		width: 300px;
	}
	#step3 {
		height: 200px;
		width: 400px;
	}
	#step4 {
		height: 400px;
		width: 400px;
	}
	#step5 {
		height: 300px;
		width: 400px;
	}
	#step6 {
		height: 400px;
		width: 400px;
	}
	#step7 {
		height: 300px;
		width: 400px;
	}
	#step8 {
		left: 40%;
		height: 200px;
		width: 400px;
	}
	#step9 {
		height: 300px;
		width: 400px;
	}
	#step10 {
		left: 70%;
		height: 300px;
		width: 300px;
	}
	#step11 {
		height: 350px;
		width: 300px;
	}
	#step12 {
		left: 70%;
		height: 350px;
		width: 300px;
	}
	#step13 {
		left: 25%;
		height: 200px;
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

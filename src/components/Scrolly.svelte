<script>
	import Board from "$components/Board.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MapTitle from "$components/MapTitle.svelte";
	let value;
	$: value, console.log(value);
</script>

<section id="scrolly">
	<MapTitle {value} />
	<Board {value} />
	<Scrolly bind:value>
		{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{text}</p>
			</div>
		{/each}
	</Scrolly>
</section>

<style>
	h2 {
		position: sticky;
		top: 4em;
	}

	.spacer {
		height: 100vh;
	}

	.step {
		height: 40vh;
		position: relative;
		z-index: 1000;
		left: 1vw;
		width: 25vw;
		background: white;
		opacity: 50%;
		text-align: center;
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

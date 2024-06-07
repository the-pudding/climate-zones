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
	let mounted = false;
	let initViewportHeight;

	$: if (
		$viewport &&
		typeof document !== "undefined" &&
		initViewportHeight &&
		mounted
	) {
		setViewportHeight();
	}

	function setViewportHeight() {
		const root = document.documentElement;

		if (CSS.supports("height", "100lvh")) {
			root.style.setProperty("--viewport-height", "100lvh");
		} else {
			root.style.setProperty(
				"--viewport-height",
				`${isMobile ? initViewportHeight : $viewport.height}px`
			);
		}
	}

	onMount(() => {
		mounted = true;
		initViewportHeight = $viewport.height;

		isMobile = $viewport.width < 600;
		console.log($viewport.width);
		setViewportHeight();
	});
</script>

<section id="scrolly">
	<MapTitle {value} />
	{#if isMobile}
		<BoardMobile {value} {isMobile} />
		<Scrolly bind:value>
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
				{@const active = value === i}

				<div class="step_mobile" id={`step_mobile${i}`} class:active>
					<p class="text">{@html text[val]}</p>
				</div>
			{/each}
		</Scrolly>
	{:else}
		<Board {value} {isMobile} />
		<Scrolly bind:value>
			{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
				{@const active = value === i}
				<div
					class="step {isMobile ? 'step-mobile' : ''}"
					id={isMobile ? `step_mobile${i}` : `step${i}`}
					class:active
				>
					{#if val == 0}
						<a style="border:none;" target="_blank" href="https://pudding.cool"
							><img
								class="sticker-shadows sticker-mask cloud-logo"
								src="assets/pudding/stickers/cloud.jpg"
								alt="The Pudding"
							/></a
						>
					{/if}
					<p class="text">{@html text[val]}</p>
				</div>
			{/each}
		</Scrolly>
	{/if}
</section>

<style>
	.sticker-mask {
		border-radius: 50%;
	}

	.sticker-shadows {
		box-shadow:
			0 0 1px rgba(0, 0, 0, 0.1),
			1px -2px 2px rgba(0, 0, 0, 0.09),
			3px -3px 3px rgba(0, 0, 0, 0.05),
			6px -6px 3px rgba(0, 0, 0, 0.01),
			9px -10px 4px rgba(0, 0, 0, 0.005);
		background-image: linear-gradient(white, white),
			radial-gradient(rgba(255, 255, 255, 1), rgb(255 255 255 / 72%));
		background-origin: border-box;
		background-clip: content-box, border-box;
		border: solid 2px transparent;
	}

	.cloud-logo {
		width: 150px;
		margin-left: -20px;
		margin-top: 10px;
		position: absolute;
	}

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
		height: var(--viewport-height);
	}

	.step.active {
		opacity: 1;
		filter: none;
	}

	.step {
		height: var(--viewport-height);
		width: 200px;
		position: relative;
		z-index: 1000;
		border-radius: 10px;
		color: rgb(0, 0, 0);
		opacity: 100%;
		text-align: center;
		font-size: 12px;
		margin-left: 50px;
		opacity: 0.2;
		filter: blur(1px);
		transition: all 0.5s;
	}

	.step-mobile {
		margin: 0 auto;
	}

	.step p {
		background-color: rgba(0, 0, 0, 0.98);
		font-size: 16px;
		color: white;
		text-align: left;
		padding: 1rem;
		border-radius: 3px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}

	#step0,
	#step_mobile0 {
		min-height: var(--viewport-height);
		width: 100%;
		margin: 0 auto;
		opacity: 1;
		filter: none;
		background: transparent;
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 500px;
	}

	#step0 p,
	#step_mobile0 p {
		background: none;
	}

	#step_mobile0 {
		margin-bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-bottom: 0;
	}
	#step1 {
		width: 300px;
		max-width: 300px;
	}
	#step_mobile1 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step2 {
		width: 300px;
		max-width: 300px;
	}
	#step_mobile2 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step3 {
		width: 400px;
		max-width: 300px;
	}
	#step_mobile3 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step4 {
		width: 400px;
	}
	#step_mobile4 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step5 {
		width: 400px;
	}
	#step_mobile5 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step6 {
		width: 400px;
	}
	#step_mobile6 {
		width: 100%;
		max-width: calc(100vw - 100px);
	}
	#step7 {
		width: 400px;
		margin-bottom: 300px;
	}
	#step_mobile7 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 300px;
	}
	#step8 {
		height: 100%;
		left: calc(50vw - 250px);
		width: 500px;
		margin-bottom: 300px;
	}
	#step_mobile8 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 300px;
	}
	#step9 {
		width: 300px;
		margin-bottom: 300px;
	}
	#step_mobile9 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 300px;
	}
	#step10 {
		height: 100%;
		left: 70%;
		width: 300px;
		margin-bottom: 300px;
	}
	#step_mobile10 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 300px;
	}
	#step11 {
		width: 300px;
		margin-bottom: 300px;
	}
	#step_mobile11 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 300px;
	}
	#step12 {
		left: 70%;
		width: 300px;
		margin-bottom: 1000px;
	}
	#step_mobile12 {
		width: 100%;
		max-width: calc(100vw - 100px);
		margin-bottom: 1000px;
	}
	#step13 {
		margin: auto;
		max-width: calc(100vw - 100px);
		left: auto;
		top: -400px;
		width: 800px;
	}
	#step_mobile13 {
		margin: auto;
		max-width: calc(100vw - 100px);
		left: auto;
		top: -400px;
		width: 800px;
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

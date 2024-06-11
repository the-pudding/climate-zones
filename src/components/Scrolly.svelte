<script>
	import Board from "$components/Board.svelte";
	import BoardMobile from "$components/Board_mobile.svelte";
	import Scrolly from "$components/helpers/Scrolly.svelte";
	import MapTitle from "$components/MapTitle.svelte";
	import TapeText from "$components/TapeText.svelte";
	import Title from "$svg/title.svg";

	import { text } from "./Text.svelte";
	import { onMount } from "svelte";
	import viewport from "$stores/viewport.js";

	let value;

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

		isMobile = $viewport.width < 800;
		console.log($viewport.width);
		setViewportHeight();
	});
</script>

<section id="scrolly">
	<div class="sticky">
		<MapTitle {value} />
		<!-- {#if isMobile}
			<BoardMobile {value} {isMobile} />
		{:else} -->
			<Board {value} {isMobile} />
		<!-- {/if} -->
	</div>
	<Scrolly bind:value>
		{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as val, i}
			{@const active = value === i}
			<div
				class="step"
				id={isMobile ? `step_mobile${i}` : `step${i}`}
				class:active
				class:isMobile
			>
				{#if val == 0}
					<a class="sticker-logo" style="border:none;" target="_blank" href="https://pudding.cool"
						><img
							class="sticker-shadows sticker-mask cloud-logo"
							src="assets/pudding/stickers/cloud.jpg"
							alt="The Pudding"
						/>
					</a>
					<div class="title-wrapper">
						<div class="title-svg">
							{@html Title}
						</div>
						<div class="bottom">
							<p class="byline">By <a href="https://pudding.cool/author/derek-taylor/" target=_blank>Derek Taylor</a></p>
							<TapeText text={"HOW WILL YOUR CITY FEEL IN THE FUTURE?"} {isMobile}/>
						</div>
					</div>
					
				{:else}
					<p class="text">{@html text[val]}</p>
				{/if}
			</div>
		{/each}
	</Scrolly>
</section>

<style>

	.sticky {
		z-index: 0;
		position: sticky;
		top: 0;
	}

	.sticker-logo {
		position: absolute;
		
	}
	.title-svg {
		max-width: 1200px;
		width:100%;
		margin: 0 auto;
		padding-top: 100px;
	}

	.isMobile .title-svg {
		padding-top: 150px;
	}

	.step .byline {
		font-family: var(--sans);
		color: black;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		margin: 0 auto;
		margin-bottom: 50px;
		background-color: white;
		display: block;
		display: inline-block;
    	padding: 5px 13px;
		z-index: 10000;
	}
	.sticker-mask {
		border-radius: 50%;
	}

	.bottom {
		padding-bottom: 100px;
		max-width: 400px;
		margin: 0 auto;
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
		width: 16vw;
		max-width: 200px;
		margin-left: -20px;
		margin-top: 10px;
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
		width: 400px;
		position: relative;
		border-radius: 10px;
		color: rgb(0, 0, 0);
		text-align: center;
		z-index: 10000;
		font-size: 12px;
		margin-left: 20px;
		filter: blur(1px);
		opacity: .5;
		transition: all 0.5s;
	}

	.step.isMobile {
		width: calc(100% - 10px);
		margin-left: auto;
		margin-right: auto;
	}
	.step-mobile {
		margin: 0 auto;
	}

	.step p {
		background-color: rgba(0, 0, 0, 0.95);
		font-size: 18px;
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
		justify-content: flex-start;
	}

	.title-wrapper {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

	}

	#step1 {
		margin-top: 500px;
	}

	#step4 {
		width: 400px;
	}

	#step5 {
		width: 400px;
	}

	#step6 {
		width: 400px;
	}
	#step7 {
		width: 400px;
	}

	#step8 {
		left: calc(50vw - 250px);
		width: 500px;
	}

	#step9 {
		width: 300px;
	}

	#step10 {
		width: 300px;
		margin-inline-start: auto;
		margin-inline-end: 20px;
	}

	#step11 {
		width: 300px;
	}

	#step12 {
		margin-inline-start: auto;
		margin-inline-end: 20px;
		width: 300px;
	}

	#step13 {
		margin: auto;
		max-width: calc(100vw - 100px);
		left: auto;
		width: 400px;
	}
	.intro-text {
		text-align: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 80%; /* Adjust the width as needed */
	}

	@media only screen and (min-width: 450px) {
			.title-wrapper {
				justify-content: center;
			}
			.title-svg {
				width: calc(100% - 100px);
			}
	}
</style>

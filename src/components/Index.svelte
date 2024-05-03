<script>
	import { getContext } from "svelte";
	import Demo from "$components/demo/Demo.svelte";
	import WIP from "$components/helpers/WIP.svelte";
	import VizScrolly from "$components/Scrolly.svelte";
	import VizStatic from "$components/viz_static.svelte";
	import Wind from "$components/Wind.svelte";
	import Mapbox from "$components/Mapbox.svelte";
	import VizStaticMobile from "$components/viz_static_mobile.svelte";
	import { viewport } from "$stores/viewport.js";
	
	// import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");
	/*
<VizScrolly />

<VizStatic />
*/
</script>

<!-- <VizScrolly /> -->

{#if $viewport.width < 500}
	<VizStaticMobile />
{:else}
	<VizStatic />
{/if}


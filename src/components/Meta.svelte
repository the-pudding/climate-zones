<script>
	export let title = "Climate Zones";
	export let description =
		"Explore how will your city feel in the future.";
	export let url = "https://pudding.cool/2024/06/climate-zones";
	export let keywords = "climate,climate change,future,cities,temperature";
	export let preloadFont = [];
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="The Pudding" />
	<meta name="news_keywords" content={keywords} />

	<meta property="og:title" content={title} />
	<meta property="og:site_name" content="The Pudding" />
	<meta property="og:url" content={url} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:locale" content="en_US" />

	<meta property="og:image" content="{url}/assets/social.jpg" />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="600" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="https://pudding.cool" />
	<meta name="twitter:creator" content="@puddingviz" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image:src" content="{url}/assets/social.jpg" />

	<meta name="robots" content="max-image-preview:large" />

	<link rel="canonical" href="{url}/" />

	<!-- {#each preloadFont as href}
		<link rel="preload" {href} as="font" type="font/woff2" crossorigin />
	{/each} -->
</svelte:head>

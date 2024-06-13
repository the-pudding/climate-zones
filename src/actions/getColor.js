export function getColor(DN) {
	// Example color mapping based on 'DN' value
	if (DN == 0) {
		return "transparent";
	}

	if (/*TROPICAL - RAINFOREST*/ DN == 1) {
		return "#0000ff";
	} else if (/*TROPICAL - MONSOON*/ DN == 2) {
		return "#0078ff";
	} else if (/*TROPICAL - SAVANNAH*/ DN == 3) {
		return "#46aafa";
	}
	if (/*ARID - DESERT - HOT */ DN == 4) {
		return "#ff0000";
	}
	if (/*ARID - DESERT - COLD */ DN == 5) {
		return "#ff9696";
	}
	if (/*ARID - STEPPE - HOT */ DN == 6) {
		return "#f5a500";
	}
	if (/*ARID - STEPPE - COLD */ DN == 7) {
		return "#ffdc64";
	}
	if (/*TEMP - DRY SUM - HOT SUM */ DN == 8) {
		return "#ffff00";
	}
	if (/*TEMP - DRY SUM - WARM SUM */ DN == 9) {
		return "#c8c800";
	}
	if (/*TEMP - DRY SUM - COLD SUM */ DN == 10) {
		return "#969600";
	}
	if (/*TEMP - DRY WIN - HOT SUM */ DN == 11) {
		return "#96ff96";
	}
	if (/*TEMP - DRY WIN - WARM SUM */ DN == 12) {
		return "#64c864";
	}
	if (/*TEMP - DRY WIN - COLD SUM */ DN == 13) {
	}
	if (/*TEMP - NO DRY - HOT SUM */ DN == 14) {
		return "#c8ff50";
	}
	if (/*TEMP - NO DRY - WARM SUM */ DN == 15) {
		return "#32c800";
	} else {
		if (/*TEMP - NO DRY - COLD SUM */ DN == 16) {
			return "#96ff96";
		}
		if (/*COLD - DRY SUM - HOT SUM */ DN == 17) {
			return "#ff00ff";
		}
		if (/*COLD - DRY SUM - WARM SUM */ DN == 18) {
			return "#c800c8";
		}
		if (/*COLD - DRY SUM - COLD SUM */ DN == 19) {
			return "#963296";
		}
		if (/*COLD - DRY SUM - VERY COLD WINTER */ DN == 20) {
			return "#963296";
		}
		if (/*COLD - WET SUM - HOT SUM */ DN == 21) {
			return "#aaafff";
		}
		if (/*COLD - WET SUM - WARM SUM */ DN == 22) {
			return "#5a78dc";
		}
		if (/*COLD - WET SUM - COLD SUM */ DN == 23) {
			return "#4b50b4";
		}
		if (/*COLD - WET SUM - VERY COLD WINTER */ DN == 24) {
			return "#320087";
		}
		if (/*COLD - NO DRY - HOT SUMMER*/ DN == 25) {
			return "#00ffff";
		}
		if (/*COLD - NO DRY - WARM SUMMER*/ DN == 26) {
			return "#37c8ff";
		}

		if (/*COLD - NO DRY - COLD SUM*/ DN == 27) {
			return "#007d7d";
		}
		if (/*COLD - NO DRY - VERY COLD WINTER*/ DN == 28) {
			return "#00465f";
		}
		if (/*POLAR TUNDRA*/ DN == 29) {
			return "#ececec";
		}
		if (/*POLAR FROST*/ DN == 30) {
			return "#f6f6f6";
		}

		return "transparent";
	}
}

export function getColor(DN) {
	// Example color mapping based on 'DN' value
	if (DN == 0) {
		return "transparent";
	}
	//TROPICAL - RAINFOREST
	if (DN == 1) {
		return "#eaf4af";
		//TROPICAL - MONSOON
	} else if (DN == 2) {
		return "#aff4c5";
	} //TROPICAL - SAVANNAH
	else if (DN == 3) {
		return "#daf4af";
	} //ARID - DESERT - HOT
	if (DN == 4) {
		return "#ffb098";
	} //ARID - DESERT - COLD
	if (DN == 5) {
		return "#ffe870";
	} //ARID - STEPPE - HOT
	if (DN == 6) {
		return "#ffd5a4";
	} //ARID - STEPPE - COLD
	if (DN == 7) {
		return "#ffd0c1";
	} //TEMP - DRY SUM - HOT SUM
	if (DN == 8) {
		return "#bcf7ff";
	} //TEMP - DRY SUM - WARM SUM
	if (DN == 9) {
		return "#bfdbf0";
	} //TEMP - DRY SUM - COLD SUM
	if (DN == 10) {
		return "#969600";
	} //TEMP - DRY WIN - HOT SUM
	if (DN == 11) {
		return "#bcc7ff";
	} //TEMP - DRY WIN - WARM SUM
	if (DN == 12) {
		return "#79c7ff";
	} //TEMP - DRY WIN - COLD SUM
	if (DN == 13) {
	} //TEMP - NO DRY - HOT SUM
	if (DN == 14) {
		return "#97cdf4";
	} //TEMP - NO DRY - WARM SUM
	if (DN == 15) {
		return "#bcdfff";
	} //TEMP - NO DRY - COLD SUM
	else {
		if (DN == 16) {
			return "#96ff96";
		}
		//COLD - DRY SUM - HOT SUM
		if (DN == 17) {
			return "#ffc0cb";
		} //COLD - DRY SUM - WARM SUM
		if (DN == 18) {
			return "#e6e6fa";
		} //COLD - DRY SUM - COLD SUM
		if (DN == 19) {
			return "#da70d6";
		} //COLD - DRY SUM - VERY COLD WINTER
		if (DN == 20) {
			return "#ba55d3";
		} //COLD - DRY WIN - HOT SUM
		if (DN == 21) {
			return "#f8cbff";
		} //COLD - DRY WIN- WARM SUM
		if (DN == 22) {
			return "#d8bfd8";
		} //COLD - DRY WIN - COLD SUM
		if (DN == 23) {
			return "#dda0dd";
		} //COLD - DRY WIN- VERY COLD WINTER
		if (DN == 24) {
			return "#ee82ee";
		} //COLD - NO DRY - HOT SUMMER
		if (DN == 25) {
			return "#cbd6ff";
		} //COLD - NO DRY - WARM SUMMER
		if (DN == 26) {
			return "#37c8ff";
		}
		//COLD - NO DRY - COLD SUM
		if (DN == 27) {
			return "#c71585";
		} //COLD - NO DRY - VERY COLD WINTER
		if (DN == 28) {
			return "#ff69b4";
		} //POLAR TUNDRA
		if (DN == 29) {
			return "#ececec";
		} //POLAR FROST
		if (DN == 30) {
			return "#f6f6f6";
		}

		return "transparent";
	}
}

/*export function getColor(DN) {
	// Example color mapping based on 'DN' value
	if (DN == 0) {
		return "transparent";
	}
	//TROPICAL - RAINFOREST
	if (DN == 1) {
		return "#0000ff";
		//TROPICAL - MONSOON
	} else if (DN == 2) {
		return "#0078ff";
	} //TROPICAL - SAVANNAH
	else if (DN == 3) {
		return "#46aafa";
	} //ARID - DESERT - HOT
	if (DN == 4) {
		return "#ff0000";
	} //ARID - DESERT - COLD
	if (DN == 5) {
		return "#ff9696";
	} //ARID - STEPPE - HOT
	if (DN == 6) {
		return "#f5a500";
	} //ARID - STEPPE - COLD
	if (DN == 7) {
		return "#ffdc64";
	} //TEMP - DRY SUM - HOT SUM
	if (DN == 8) {
		return "#ffff00";
	} //TEMP - DRY SUM - WARM SUM
	if (DN == 9) {
		return "#c8c800";
	} //TEMP - DRY SUM - COLD SUM
	if (DN == 10) {
		return "#969600";
	} //TEMP - DRY WIN - HOT SUM
	if (DN == 11) {
		return "#96ff96";
	} //TEMP - DRY WIN - WARM SUM
	if (DN == 12) {
		return "#64c864";
	} //TEMP - DRY WIN - COLD SUM
	if (DN == 13) {
	} //TEMP - NO DRY - HOT SUM
	if (DN == 14) {
		return "#c8ff50";
	} //TEMP - NO DRY - WARM SUM
	if (DN == 15) {
		return "#32c800";
	} //TEMP - NO DRY - COLD SUM
	else {
		if (DN == 16) {
			return "#96ff96";
		}
		//COLD - DRY SUM - HOT SUM
		if (DN == 17) {
			return "#ff00ff";
		} //COLD - DRY SUM - WARM SUM
		if (DN == 18) {
			return "#c800c8";
		} //COLD - DRY SUM - COLD SUM
		if (DN == 19) {
			return "#963296";
		} //COLD - DRY SUM - VERY COLD WINTER
		if (DN == 20) {
			return "#963296";
		} //COLD - WET SUM - HOT SUM
		if (DN == 21) {
			return "#aaafff";
		} //COLD - WET SUM - WARM SUM
		if (DN == 22) {
			return "#5a78dc";
		} //COLD - WET SUM - COLD SUM
		if (DN == 23) {
			return "#4b50b4";
		} //COLD - WET SUM - VERY COLD WINTER
		if (DN == 24) {
			return "#320087";
		} //COLD - NO DRY - HOT SUMMER
		if (DN == 25) {
			return "#00ffff";
		} //COLD - NO DRY - WARM SUMMER
		if (DN == 26) {
			return "#37c8ff";
		}
		//COLD - NO DRY - COLD SUM
		if (DN == 27) {
			return "#007d7d";
		} //COLD - NO DRY - VERY COLD WINTER
		if (DN == 28) {
			return "#00465f";
		} //POLAR TUNDRA
		if (DN == 29) {
			return "#ececec";
		} //POLAR FROST
		if (DN == 30) {
			return "#f6f6f6";
		}

		return "transparent";
	}
}
*/

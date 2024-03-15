export function getColor(DN) {
	// Example color mapping based on 'DN' value
	if (DN == 1) {
		return "#0000ff";
	} else if (DN == 2) {
		return "#0078ff";
	} else if (DN == 3) {
		return "#46aafa";
	}
	if (DN == 4) {
		return "#ff0000";
	}
	if (DN == 5) {
		return "#ff9696";
	}
	if (DN == 6) {
		return "#f5a500";
	}
	if (DN == 7) {
		return "#ffdc64";
	}
	if (DN == 8) {
		return "#ffff00";
	}
	if (DN == 9) {
		return "#c8c800";
	}
	if (DN == 10) {
		return "#969600";
	}
	if (DN == 11) {
		return "#96ff96";
	}
	if (DN == 12) {
		return "#64c864";
	}
	if (DN == 13) {
		return "#329632";
	}
	if (DN == 14) {
		return "#c8ff50";
	}
	if (DN == 15) {
		return "#32c800";
	} else {
		if (DN == 16) {
			return "#96ff96";
		}
		if (DN == 11) {
			return "#96ff96";
		}

		return "transparent";
	}
}

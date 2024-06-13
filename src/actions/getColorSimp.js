export function getColorSimp(DN) {
	if (DN == 0) {
		return "transparent";
	}
	/*TROPICAL*/
	if ((DN > 0) & (DN <= 3)) {
		return "#1761fd";
	}
	/*ARID*/
	if ((DN > 3) & (DN <= 7)) {
		return "#ff8563";
	}
	/*TEMPERATE*/
	if ((DN > 7) & (DN <= 16)) {
		return "#abe340";
	}
	/*COLD*/
	if ((DN > 16) & (DN <= 28)) {
		return "#735fca";
	}
	/*POLAR*/
	if (DN > 28) {
		return "white";
	}
}

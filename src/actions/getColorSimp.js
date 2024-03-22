export function getColorSimp(DN) {
	if (DN == 0) {
		return "transparent";
	}
	if ((DN > 0) & (DN <= 3)) {
		return "rgba(88, 152, 249)";
	}
	if ((DN > 3) & (DN <= 7)) {
		return "rgba(249, 88, 88)";
	}
	if ((DN > 7) & (DN <= 16)) {
		return "rgba(88, 249, 104)";
	}
	if ((DN > 16) & (DN <= 28)) {
		return "rgba(178, 88, 249)";
	}
	if (DN > 28) {
		return "white";
	}
}

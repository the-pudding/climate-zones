export function getColorSimp(DN) {
	if (DN == 0) {
		return "transparent";
	}
	/*TROPICAL*/
	if (DN > 0 && DN <= 3) {
		return "#28dc62"; // rgb(175, 244, 197) //tropical
	}
	/*ARID*/
	if (DN > 3 && DN <= 7) {
		return "#ff6150"; // rgb(255, 199, 193) //arid
	}
	/*TEMPERATE*/
	if (DN > 7 && DN <= 16) {
		return "#75bcf0"; // rgb(188, 227, 255) //temperate
	}
	/*COLD*/
	if (DN > 16 && DN <= 28) {
		return "#b57ff1"; // rgb(228, 204, 255) //cold 
	}
	/*POLAR*/
	if (DN > 28) {
		return "#ffffff"; // white
	}
}

/*export function getColorSimp(DN) {
	if (DN == 0) {
		return "transparent";
	}
	//TROPICAL
	if ((DN > 0) & (DN <= 3)) {
		return "#1761fd";
	}
	//ARID
	if ((DN > 3) & (DN <= 7)) {
		return "#ff8563";
	}
	//TEMPERATE
	if ((DN > 7) & (DN <= 16)) {
		return "#abe340";
	}
	//COLD
	if ((DN > 16) & (DN <= 28)) {
		return "#735fca";
	}
	//POLAR
	if (DN > 28) {
		return "white";
	}
}*/

/**
 * Validates if a string is valid SVG markup
 *
 * @param {string} svgString - The SVG string to validate
 * @returns {boolean} true if valid SVG, false otherwise
 */
export function isValidSVG(svgString) {
	if (!svgString || typeof svgString !== "string") {
		return false;
	}

	const parser = new DOMParser();
	const svgDoc = parser.parseFromString(svgString.trim(), "image/svg+xml");
	const errors = svgDoc.getElementsByTagName("parsererror");

	return errors.length === 0;
}

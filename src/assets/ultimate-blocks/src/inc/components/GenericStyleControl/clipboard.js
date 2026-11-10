/**
 * Generic Style Clipboard Factory
 *
 * Creates a reusable style clipboard for any block type.
 * Handles localStorage persistence and in-memory caching.
 *
 * @param {string} storageKey - Unique localStorage key (e.g., "ub_image_copied_style")
 * @param {Array<string>} attributeKeys - Array of attribute names to copy (e.g., ["height", "width", "border"])
 * @returns {Object} Object with copy, get, has, and clear functions
 *
 * @example
 * // Create a clipboard for image block
 * const imageClipboard = createStyleClipboard("ub_image_copied_style", [
 *   "height", "width", "aspectRatio", "scale", "border", "borderRadius", "className"
 * ]);
 *
 * // Copy style
 * imageClipboard.copy(blockAttributes);
 *
 * // Check if can paste
 * if (imageClipboard.has()) {
 *   const style = imageClipboard.get();
 *   blockSetAttributes(style);
 * }
 *
 * // Clear clipboard
 * imageClipboard.clear();
 */

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
function isLocalStorageAvailable() {
	try {
		const test = "__test__";
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
}

/**
 * Create a reusable style clipboard for a specific block type
 *
 * @param {string} storageKey - Unique localStorage key
 * @param {Array<string>} attributeKeys - Array of attribute names to copy
 * @returns {Object} Clipboard object with methods: copy, get, has, clear
 */
export function createStyleClipboard(storageKey, attributeKeys = []) {
	// Store the copied style in memory
	let copiedStyle = null;

	/**
	 * Initialize the clipboard from localStorage
	 */
	const initializeClipboard = () => {
		if (!isLocalStorageAvailable()) return;

		try {
			const savedStyle = localStorage.getItem(storageKey);
			if (savedStyle) {
				copiedStyle = JSON.parse(savedStyle);
			}
		} catch (e) {
			console.error(
				`Failed to load copied style from localStorage (${storageKey}):`,
				e,
			);
		}
	};

	/**
	 * Store the style in the clipboard
	 *
	 * @param {Object} attributes The block attributes to copy
	 * @returns {boolean} Success status
	 */
	const copy = (attributes) => {
		if (!attributes || typeof attributes !== "object") {
			return false;
		}

		// Extract only specified attributes using destructuring
		const extractedStyle = {};
		attributeKeys.forEach((key) => {
			if (key in attributes) {
				extractedStyle[key] = attributes[key];
			}
		});

		copiedStyle = extractedStyle;

		// Save to localStorage if available
		if (isLocalStorageAvailable()) {
			try {
				localStorage.setItem(storageKey, JSON.stringify(copiedStyle));
			} catch (e) {
				console.error(
					`Failed to save copied style to localStorage (${storageKey}):`,
					e,
				);
				return false;
			}
		}

		return true;
	};

	/**
	 * Get the copied style
	 *
	 * @returns {Object|null} The copied style or null if nothing was copied
	 */
	const get = () => {
		// Initialize on first use if not already done
		if (copiedStyle === null) {
			initializeClipboard();
		}
		return copiedStyle ? { ...copiedStyle } : null;
	};

	/**
	 * Check if there is a copied style available
	 *
	 * @returns {boolean} True if there is a copied style available
	 */
	const has = () => {
		// Initialize on first use if not already done
		if (copiedStyle === null) {
			initializeClipboard();
		}
		return copiedStyle !== null;
	};

	/**
	 * Clear the copied style
	 */
	const clear = () => {
		copiedStyle = null;

		if (isLocalStorageAvailable()) {
			try {
				localStorage.removeItem(storageKey);
			} catch (e) {
				console.error(
					`Failed to remove copied style from localStorage (${storageKey}):`,
					e,
				);
			}
		}
	};

	return {
		copy,
		get,
		has,
		clear,
	};
}

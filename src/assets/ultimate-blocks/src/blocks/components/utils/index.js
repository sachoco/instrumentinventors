import { __ } from "@wordpress/i18n";
import { useMemo } from "@wordpress/element";

export function useShadowPresets(settings) {
	const EMPTY_ARRAY = [];
	return useMemo(() => {
		// Handle array structure - get the first item
		const shadowSettings = Array.isArray(settings) ? settings[0] : settings;

		if (!shadowSettings) {
			return EMPTY_ARRAY;
		}

		const {
			default: defaultShadows,
			theme: themeShadows,
			custom: customShadows,
		} = shadowSettings?.presets ?? {};

		const unsetShadow = {
			name: __("Unset", "ultimate-blocks"),
			slug: "unset",
			shadow: "none",
		};

		const shadowPresets = [
			...(defaultShadows || EMPTY_ARRAY),
			...(themeShadows || EMPTY_ARRAY),
			...(customShadows || EMPTY_ARRAY),
		];

		if (shadowPresets.length) {
			shadowPresets.unshift(unsetShadow);
		}

		return shadowPresets;
	}, [settings]);
}

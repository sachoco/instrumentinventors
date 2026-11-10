/**
 * WordPress Dependencies
 */

import { useDispatch, useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import {
	useBlockEditContext,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";

/**
 *
 * @param {object} props - Color settings with gradients props
 * @param {string} props.label - Component Label
 * @param {string} props.attrKey - Attribute key for color
 * @param {Function} props.onAttributesUpdate - CallBack Function that fires when attributes are updated default is null
 *
 */
function ColorSettings(props) {
	const { clientId } = useBlockEditContext();
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const { onAttributesUpdate = () => null } = props;
	const attributes = useSelect((select) => {
		return select("core/block-editor").getBlockAttributes(clientId);
	});
	const setAttributes = (newAttributes) => {
		updateBlockAttributes(clientId, newAttributes);
		onAttributesUpdate(newAttributes);
	};
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const { defaultColors } = useSelect((select) => {
		return {
			defaultColors:
				select("core/block-editor")?.getSettings()?.__experimentalFeatures
					?.color?.palette?.default,
		};
	});

	// Merge default colors with theme and custom colors
	const mergedColors = [
		...(colorGradientSettings.colors || []),
		...(defaultColors
			? [
					{
						name: "Default",
						slug: "default",
						colors: defaultColors,
					},
				]
			: []),
	];

	return (
		<ColorGradientSettingsDropdown
			{...colorGradientSettings}
			colors={mergedColors}
			enableAlpha
			panelId={clientId}
			title={__("Color Settings", "ultimate-blocks-pro")}
			popoverProps={{
				placement: "left start",
			}}
			settings={[
				{
					clearable: true,
					resetAllFilter: () => setAttributes({ [props.attrKey]: null }),
					colorValue: attributes[props.attrKey],
					label: props.label,
					onColorChange: (newValue) =>
						setAttributes({ [props.attrKey]: newValue }),
				},
			]}
		/>
	);
}

export default ColorSettings;

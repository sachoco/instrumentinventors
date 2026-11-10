/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	FontSizePicker,
	__experimentalFontFamilyControl as FontFamilyControl,
	__experimentalFontAppearanceControl as FontAppearanceControl,
	__experimentalLetterSpacingControl as LetterSpacingControl,
	__experimentalTextTransformControl as TextTransformControl,
	__experimentalTextDecorationControl as TextDecorationControl,
	LineHeightControl,
	useBlockEditContext,
	useSettings,
} from "@wordpress/block-editor";

import { __experimentalToolsPanelItem as ToolsPanelItem } from "@wordpress/components";

import { useSelect } from "@wordpress/data";
import { isEmpty } from "lodash";

/**
 * Typography Control Component
 *
 * @param {Object} props Component props.
 * @returns {JSX.Element} Component element.
 */
export default function TypographyControls({
	activeButtonIndex,
	buttons,
	setAttributes,
}) {
	const { clientId } = useBlockEditContext();
	const fontFamiliesFromSettings = useSettings("typography.fontFamilies")[0];

	// Get available font families from settings
	const fontFamilies = ["default", "theme", "custom"].flatMap(
		(key) => fontFamiliesFromSettings?.[key] ?? [],
	);

	// Get available font sizes from settings
	const { fontSizes } = useSelect((select) => {
		return {
			fontSizes: select("core/block-editor")?.getSettings()?.fontSizes,
		};
	});

	/**
	 * Updates a typography attribute for the active button
	 *
	 * @param {string} attribute The attribute name
	 * @param {*} value The new value
	 */
	const updateTypographyAttribute = (attribute, value) => {
		setAttributes({
			buttons: [
				...buttons.slice(0, activeButtonIndex),
				{
					...buttons[activeButtonIndex],
					[attribute]: value,
				},
				...buttons.slice(activeButtonIndex + 1),
			],
		});
	};

	// Get active button data
	const activeButton = buttons[activeButtonIndex] || {};

	return (
		<>
			<ToolsPanelItem
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.fontFamily)}
				label={__("Font", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("fontFamily", null)}
				isShownByDefault={false}
			>
				<FontFamilyControl
					fontFamilies={fontFamilies}
					value={activeButton.fontFamily || null}
					onChange={(value) => updateTypographyAttribute("fontFamily", value)}
					size="__unstable-large"
					__nextHasNoMarginBottom
				/>
			</ToolsPanelItem>

			<ToolsPanelItem
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.fontSize)}
				label={__("Size", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("fontSize", null)}
				isShownByDefault={true}
			>
				<FontSizePicker
					size="__unstable-large"
					fontSizes={fontSizes}
					value={activeButton.fontSize || null}
					onChange={(value) => updateTypographyAttribute("fontSize", value)}
					withSlider={true}
				/>
			</ToolsPanelItem>

			<ToolsPanelItem
				className="single-column"
				panelId={clientId}
				hasValue={() =>
					!isEmpty(activeButton.fontWeight) || !isEmpty(activeButton.fontStyle)
				}
				label={__("Appearance", "ultimate-blocks")}
				onDeselect={() => {
					updateTypographyAttribute("fontWeight", "");
					updateTypographyAttribute("fontStyle", "");
				}}
				isShownByDefault={false}
			>
				<FontAppearanceControl
					size="__unstable-large"
					value={{
						fontStyle: activeButton.fontStyle || null,
						fontWeight: activeButton.fontWeight || null,
					}}
					onChange={({ fontStyle, fontWeight }) => {
						console.log(fontStyle, fontWeight);
						updateTypographyAttribute("fontStyle", fontStyle);
						updateTypographyAttribute("fontWeight", fontWeight);
					}}
				/>
			</ToolsPanelItem>

			<ToolsPanelItem
				className="single-column"
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.lineHeight)}
				label={__("Line Height", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("lineHeight", null)}
				isShownByDefault={false}
			>
				<LineHeightControl
					value={activeButton.lineHeight || null}
					onChange={(value) => updateTypographyAttribute("lineHeight", value)}
					__unstableInputWidth="auto"
					size="__unstable-large"
				/>
			</ToolsPanelItem>

			<ToolsPanelItem
				className="single-column"
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.letterSpacing)}
				label={__("Letter Spacing", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("letterSpacing", null)}
				isShownByDefault={false}
			>
				<LetterSpacingControl
					size="__unstable-large"
					__unstableInputWidth="auto"
					value={activeButton.letterSpacing || null}
					onChange={(value) =>
						updateTypographyAttribute("letterSpacing", value)
					}
				/>
			</ToolsPanelItem>
			<ToolsPanelItem
				className="single-column"
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.textDecoration)}
				label={__("Decoration", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("textDecoration", null)}
				isShownByDefault={false}
			>
				<TextDecorationControl
					size="__unstable-large"
					__unstableInputWidth="auto"
					value={activeButton.textDecoration || null}
					onChange={(value) =>
						updateTypographyAttribute("textDecoration", value)
					}
				/>
			</ToolsPanelItem>

			<ToolsPanelItem
				panelId={clientId}
				hasValue={() => !isEmpty(activeButton.textTransform)}
				label={__("Letter case", "ultimate-blocks")}
				onDeselect={() => updateTypographyAttribute("textTransform", null)}
				isShownByDefault={false}
			>
				<TextTransformControl
					value={activeButton.textTransform || null}
					size="__unstable-large"
					__nextHasNoMarginBottom
					onChange={(value) =>
						updateTypographyAttribute("textTransform", value)
					}
				/>
			</ToolsPanelItem>
		</>
	);
}

/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockEditContext,
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import {
	BaseControl,
	__experimentalToolsPanelItem as ToolsPanelItem,
	RangeControl,
	ColorPalette,
	SelectControl,
	ToggleControl,
} from "@wordpress/components";

import { isEmpty } from "lodash";
import { useShadowPresets } from "./utils";

/**
 * Shadow control component for button block
 *
 * @param {Object} props Component props
 * @param {string} props.attrKey The attribute key for shadow settings
 * @param {boolean} props.isShowShadow Whether to show the shadow control
 * @param {boolean} props.showDefaultShadow Whether to show the shadow control by default
 * @return {JSX.Element} Shadow control component
 */
function ShadowControl({
	attrKey = "shadow",
	isShowShadow = true,
	showDefaultShadow = false,
	isButtonBlock = false,
	activeButtonIndex,
}) {
	const { clientId } = useBlockEditContext();
	const attributes = useSelect((select) =>
		select("core/block-editor").getBlockAttributes(clientId),
	);
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	const setAttributes = (newAttributes) => {
		updateBlockAttributes(clientId, newAttributes);
	};

	const { defaultColors } = useSelect((select) => {
		return {
			defaultColors:
				select("core/block-editor")?.getSettings()?.__experimentalFeatures
					?.color?.palette?.default,
		};
	});

	// For button block, we need to get the shadow from the buttons array for the active button
	let shadow = {};
	if (
		isButtonBlock &&
		typeof activeButtonIndex === "number" &&
		attributes.buttons &&
		attributes.buttons[activeButtonIndex]
	) {
		shadow = attributes.buttons[activeButtonIndex][attrKey] || {};
	} else {
		shadow = attributes[attrKey] || {};
	}

	const updateShadowAttribute = (key, value) => {
		if (
			isButtonBlock &&
			typeof activeButtonIndex === "number" &&
			attributes.buttons
		) {
			const updatedButtons = [...attributes.buttons];
			updatedButtons[activeButtonIndex] = {
				...updatedButtons[activeButtonIndex],
				[attrKey]: {
					...shadow,
					[key]: value,
				},
			};
			setAttributes({
				buttons: updatedButtons,
			});
		} else {
			setAttributes({
				[attrKey]: {
					...shadow,
					[key]: value,
				},
			});
		}
	};

	const settings = useSettings("shadow");
	const shadowPresets = useShadowPresets(settings);

	// Create preset options from dynamic presets
	const presetOptions = [
		...(shadowPresets || []).map((preset) => ({
			value: preset.slug,
			label: preset.name,
		})),
		{ value: "custom", label: __("Custom", "ultimate-blocks") },
	];

	const applyPreset = (presetSlug) => {
		if (presetSlug === "unset" || presetSlug === "") {
			if (
				isButtonBlock &&
				typeof activeButtonIndex === "number" &&
				attributes.buttons
			) {
				const updatedButtons = [...attributes.buttons];
				updatedButtons[activeButtonIndex] = {
					...updatedButtons[activeButtonIndex],
					[attrKey]: {},
				};
				setAttributes({
					buttons: updatedButtons,
				});
			} else {
				setAttributes({
					[attrKey]: {},
				});
			}
			return;
		}

		if (presetSlug === "custom") {
			if (isEmpty(shadow) || shadow.preset !== "custom") {
				const customPreset = {
					preset: "custom",
					color: "rgba(0, 0, 0, 0.2)",
					horizontal: 0,
					vertical: 4,
					blur: 6,
					spread: 0,
				};

				if (
					isButtonBlock &&
					typeof activeButtonIndex === "number" &&
					attributes.buttons
				) {
					const updatedButtons = [...attributes.buttons];
					updatedButtons[activeButtonIndex] = {
						...updatedButtons[activeButtonIndex],
						[attrKey]: customPreset,
					};
					setAttributes({
						buttons: updatedButtons,
					});
				} else {
					setAttributes({
						[attrKey]: customPreset,
					});
				}
			} else {
				updateShadowAttribute("preset", "custom");
			}
			return;
		}

		// Find the selected preset and apply its shadow value
		const selectedPreset = shadowPresets?.find(
			(preset) => preset.slug === presetSlug,
		);
		if (selectedPreset) {
			const newPreset = {
				preset: presetSlug,
				shadow: selectedPreset.shadow,
			};

			if (
				isButtonBlock &&
				typeof activeButtonIndex === "number" &&
				attributes.buttons
			) {
				const updatedButtons = [...attributes.buttons];
				updatedButtons[activeButtonIndex] = {
					...updatedButtons[activeButtonIndex],
					[attrKey]: newPreset,
				};
				setAttributes({
					buttons: updatedButtons,
				});
			} else {
				setAttributes({
					[attrKey]: newPreset,
				});
			}
		}
	};

	const hasShadowValue = () => {
		return !isEmpty(shadow) && (shadow.preset || shadow.color || shadow.shadow);
	};

	const resetShadow = () => {
		if (
			isButtonBlock &&
			typeof activeButtonIndex === "number" &&
			attributes.buttons
		) {
			const updatedButtons = [...attributes.buttons];
			updatedButtons[activeButtonIndex] = {
				...updatedButtons[activeButtonIndex],
				[attrKey]: {},
			};
			setAttributes({
				buttons: updatedButtons,
			});
		} else {
			setAttributes({
				[attrKey]: {},
			});
		}
	};

	return (
		<>
			{isShowShadow && (
				<ToolsPanelItem
					panelId={clientId}
					isShownByDefault={showDefaultShadow}
					hasValue={hasShadowValue}
					label={__("Shadow", "ultimate-blocks")}
					resetAllFilter={resetShadow}
					onDeselect={resetShadow}
				>
					<BaseControl>
						<SelectControl
							label={__("Shadow Presets", "ultimate-blocks")}
							value={shadow.preset || ""}
							options={presetOptions}
							onChange={applyPreset}
							__next36pxDefaultSize
							__nextHasNoMarginBottom
						/>
						{shadow.preset === "custom" && (
							<>
								<ColorGradientSettingsDropdown
									{...colorGradientSettings}
									enableAlpha
									title={__("Shadow Color", "ultimate-blocks")}
									popoverProps={{
										placement: "left start",
									}}
									settings={[
										{
											clearable: true,
											resetAllFilter: () =>
												updateShadowAttribute("color", null),
											colorValue: shadow.color,
											colors: defaultColors,
											label: __("Shadow Color", "ultimate-blocks"),
											onColorChange: (newValue) =>
												updateShadowAttribute("color", newValue),
										},
									]}
								/>
								<br />
								<RangeControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__("Horizontal Offset", "ultimate-blocks")}
									value={shadow.horizontal}
									onChange={(value) =>
										updateShadowAttribute("horizontal", value)
									}
									min={-25}
									max={25}
									allowReset={true}
									resetFallbackValue={0}
								/>

								<RangeControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__("Vertical Offset", "ultimate-blocks")}
									value={shadow.vertical}
									onChange={(value) => updateShadowAttribute("vertical", value)}
									min={-25}
									max={25}
									allowReset={true}
									resetFallbackValue={0}
								/>

								<RangeControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__("Blur", "ultimate-blocks")}
									value={shadow.blur}
									onChange={(value) => updateShadowAttribute("blur", value)}
									min={0}
									max={35}
									allowReset={true}
									resetFallbackValue={0}
								/>

								<RangeControl
									__nextHasNoMarginBottom
									__next40pxDefaultSize
									label={__("Spread", "ultimate-blocks")}
									value={shadow.spread}
									onChange={(value) => updateShadowAttribute("spread", value)}
									min={-10}
									max={20}
									allowReset={true}
									resetFallbackValue={0}
								/>
								<br />
								<ToggleControl
									label={__("Inner Shadow", "ultimate-blocks")}
									checked={!!shadow.inset}
									onChange={() => updateShadowAttribute("inset", !shadow.inset)}
								/>
							</>
						)}
					</BaseControl>
				</ToolsPanelItem>
			)}
		</>
	);
}

export default ShadowControl;

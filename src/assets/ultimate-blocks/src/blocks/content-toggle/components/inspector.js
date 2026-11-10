/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const {
	InspectorControls,
	useBlockEditContext,
	__experimentalColorGradientSettingsDropdown: ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients:
		useMultipleOriginColorsAndGradients,
} = wp.blockEditor || wp.editor;
const { PanelBody, PanelRow, FormToggle } = wp.components;

export default function Inspector(props) {
	const {
		onThemeChange,
		onTitleColorChange,
		onCollapseChange,
		onLinkColorChange,
	} = props;
	const { theme, titleColor, titleLinkColor, collapsed } = props.attributes;
	const { clientId } = useBlockEditContext();
	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					{...colorGradientSettings}
					enableAlpha
					panelId={clientId}
					title={__("Color Scheme")}
					settings={[
						{
							colorValue: theme,
							onColorChange: onThemeChange,
							label: __("Title Container Color"),
						},
						{
							colorValue: titleColor,
							onColorChange: onTitleColorChange,
							label: __("Title Color"),
						},
						{
							colorValue: titleLinkColor,
							onColorChange: onLinkColorChange,
							label: __("Title link Color"),
						},
					]}
				/>
			</InspectorControls>
			<InspectorControls>
				<PanelBody title={__("Toggle State")} initialOpen={true}>
					<PanelRow>
						<label htmlFor="ub-content-toggle-state">{__("Collapsed")}</label>
						<FormToggle
							id="ub-content-toggle-state"
							label={__("Collapsed")}
							checked={collapsed}
							onChange={onCollapseChange}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</>
	);
}

import { __ } from "@wordpress/i18n";
import { registerBlockStyle } from "@wordpress/blocks";

const styles = [
	{
		name: "default",
		isDefault: true,
		label: __("Default", "ultimate-blocks"),
	},
	{
		name: "circle",
		label: __("Circle", "ultimate-blocks"),
	},
	{
		name: "rounded",
		label: __("Rounded", "ultimate-blocks"),
	},
	{
		name: "framed",
		label: __("Framed", "ultimate-blocks"),
	},
];

styles.forEach((style) => {
	registerBlockStyle("ub/image", style);
});

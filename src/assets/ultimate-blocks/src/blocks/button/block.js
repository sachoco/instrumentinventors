/**
 * BLOCK: Button Block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//Import Icon
import icon from "./icons/icons";

import {
	version_1_1_2,
	version_1_1_4,
	version_1_1_5,
	version_2_0_0,
	oldAttributes,
	updateFrom,
} from "./oldVersions";

import {
	generateIcon,
	dashesToCamelcase,
	mergeRichTextArray,
	upgradeButtonLabel,
} from "../../common";
import {
	blockControls,
	inspectorControls,
	defaultButtonProps,
	editorDisplay,
	presetIconSize,
	allIcons,
	EditorComponent,
} from "./components";
import { useState } from "react";
import metadata from "./block.json";

import { withDispatch, withSelect, select } from "@wordpress/data";

import { compose } from "@wordpress/compose";
import { __ } from "@wordpress/i18n";
import { registerBlockType, createBlock } from "@wordpress/blocks";

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

registerBlockType("ub/button-block", {
	title: __("Button (Improved)", "ultimate-blocks"),
	icon: icon,
	category: "ultimateblocks",
	keywords: [
		__("Button", "ultimate-blocks"),
		__("Buttons", "ultimate-blocks"),
		__("Ultimate Blocks", "ultimate-blocks"),
	],
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	attributes: oldAttributes,
	supports: {
		inserter: false, //this block is being phased out in favor of the PHP-rendered version
	},
	edit: compose([
		withSelect((select, ownProps) => ({
			block: (select("core/block-editor") || select("core/editor")).getBlock(
				ownProps.clientId,
			),
		})),
		withDispatch((dispatch) => ({
			replaceBlock: (dispatch("core/block-editor") || dispatch("core/editor"))
				.replaceBlock,
		})),
	])(function (props) {
		const { isSelected, block, replaceBlock, attributes, setAttributes } =
			props;

		const [isMouseHovered, toggleMouseHover] = useState(false);
		const [availableIcons, setAvailableIcons] = useState([]);
		const [iconSearchTerm, setIconSearchTerm] = useState("");
		const [iconSearchResultsPage, setIconSearchResultsPage] = useState(0);
		const [activeButtonIndex, setActiveButtonIndex] = useState(-1);
		const [hoveredButton, setHoveredButton] = useState(-1);
		const [enableLinkInput, toggleLinkInput] = useState(false);

		const stateVars = {
			activeButtonIndex,
			setActiveButtonIndex,
			hoveredButton,
			setHoveredButton,
			enableLinkInput,
			toggleLinkInput,
			iconSearchResultsPage,
			setIconSearchResultsPage,
		};

		const {
			buttons,
			buttonText,
			url,
			size,
			buttonColor,
			buttonHoverColor,
			buttonTextColor,
			buttonTextHoverColor,
			buttonRounded,
			chosenIcon,
			iconPosition,
			buttonIsTransparent,
			addNofollow,
			openInNewTab,
			buttonWidth,
		} = attributes;

		if (availableIcons.length === 0) {
			const iconList = Object.keys(allIcons).sort();
			setAvailableIcons(iconList.map((name) => allIcons[name]));
		}

		if (typeof buttons === "undefined") {
			setAttributes({
				buttons: [
					Object.assign({}, defaultButtonProps, {
						buttonText,
						url,
						size,
						buttonColor,
						buttonHoverColor,
						buttonTextColor,
						buttonTextHoverColor,
						buttonRounded,
						chosenIcon,
						iconPosition,
						buttonIsTransparent,
						addNofollow,
						openInNewTab,
						buttonWidth,
					}),
				],
			});
		}

		return [
			//isSelected && blockControls(props), might no longer work

			//isSelected && inspectorControls(props), //might no longer work

			<div className={props.className}>
				<button
					onClick={() => {
						const { buttonText, ...otherAttributes } = attributes;
						replaceBlock(
							block.clientId,
							createBlock(
								"ub/button",
								Object.assign(otherAttributes, {
									buttonText: mergeRichTextArray(attributes.buttonText),
								}),
							),
						);
					}}
				>
					{upgradeButtonLabel}
				</button>
				{editorDisplay({ ...props, ...stateVars })}
			</div>,
		];
	}),

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function (props) {
		const {
			buttonText,
			align,
			url,
			size,
			buttonColor,
			buttonTextColor,
			buttonHoverColor,
			buttonTextHoverColor,
			buttonRounded,
			chosenIcon,
			iconPosition,
			buttonIsTransparent,
			addNofollow,
			openInNewTab,
		} = props.attributes;

		return (
			<div
				className={`${props.className} ub-button-container align-button-${align}`}
			>
				<a
					href={url}
					target={openInNewTab ? "_blank" : "_self"}
					rel={`noopener noreferrer${addNofollow ? " nofollow" : ""}`}
					className={`ub-button-block-main ub-button-${size}`}
					data-defaultColor={buttonColor}
					data-defaultTextColor={buttonTextColor}
					data-hoverColor={buttonHoverColor}
					data-hoverTextColor={buttonTextHoverColor}
					data-buttonIsTransparent={buttonIsTransparent}
					style={{
						backgroundColor: buttonIsTransparent ? "transparent" : buttonColor,
						color: buttonIsTransparent ? buttonColor : buttonTextColor,
						borderRadius: buttonRounded ? "60px" : "0px",
						border: buttonIsTransparent ? `3px solid ${buttonColor}` : "none",
					}}
				>
					<div
						className="ub-button-content-holder"
						style={{
							flexDirection: iconPosition === "left" ? "row" : "row-reverse",
						}}
					>
						{chosenIcon !== "" &&
							allIcons.hasOwnProperty(`fa${dashesToCamelcase(chosenIcon)}`) && (
								<span className="ub-button-icon-holder">
									{generateIcon(
										allIcons[`fa${dashesToCamelcase(chosenIcon)}`],
										presetIconSize[size],
									)}
								</span>
							)}
						<span className={"ub-button-block-btn"}>{buttonText}</span>
					</div>
				</a>
			</div>
		);
	},
	deprecated: [
		updateFrom(version_1_1_2),
		updateFrom(version_1_1_4),
		updateFrom(version_1_1_5),
		updateFrom(version_2_0_0),
	],
});

/**
 * Read the rendered styles of a core button so the transform can carry its
 * colors over. The editor canvas is an iframe in current WordPress versions,
 * so the button markup is not in the admin document, and it is missing
 * altogether when the block was never rendered. Both cases returned null and
 * made `getComputedStyle` throw, which broke the whole transform.
 *
 * @param {string} clientId client id of the core button
 * @return {?CSSStyleDeclaration} computed styles, or null when not rendered
 */
const getRenderedButtonStyle = (clientId) => {
	const selector = `#block-${clientId}>div`;
	const canvas = document.querySelector('iframe[name="editor-canvas"]');
	const buttonElement =
		canvas?.contentDocument?.querySelector(selector) ||
		document.querySelector(selector);

	return buttonElement
		? buttonElement.ownerDocument.defaultView.getComputedStyle(buttonElement)
		: null;
};

/**
 * Fall back to the attributes when the button markup can't be read. Custom
 * colors are kept on the block itself, palette colors only as a slug that has
 * to be looked up in the editor's color settings.
 *
 * @param {Object} attributes attributes of the core button
 * @return {Object} color and backgroundColor, either of which can be undefined
 */
const getButtonColorsFromAttributes = (attributes) => {
	const settings = select("core/block-editor").getSettings();
	//themes using theme.json keep their palettes grouped by origin instead
	const groupedPalettes = Object.values(
		settings.__experimentalFeatures?.color?.palette || {},
	);
	const palette = [settings.colors || [], ...groupedPalettes].flat();
	const fromPalette = (slug) =>
		palette.find((paletteColor) => paletteColor.slug === slug)?.color;

	return {
		color: attributes.style?.color?.text || fromPalette(attributes.textColor),
		backgroundColor:
			attributes.style?.color?.background ||
			fromPalette(attributes.backgroundColor),
	};
};

registerBlockType(metadata.name, {
	...metadata,
	edit: EditorComponent,
	attributes: metadata.attributes,
	save: () => null,
	icon: icon,
	example: {
		attributes: {
			buttonColor: "#f01313",
			size: "medium",
		},
	},
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/buttons"],
				transform: (_, innerBlocks) => {
					const revisedDefaultProps = {
						buttonText: "Button Text",
						url: "",
						size: "medium",
						buttonColor: "#313131",
						buttonHoverColor: "#313131",
						buttonTextColor: "#ffffff",
						buttonTextHoverColor: "#ffffff",
						buttonRounded: false,
						buttonRadius: 0, //retained for compatibility
						buttonRadiusUnit: "px", //retained for compatibility

						topLeftRadius: 0,
						topLeftRadiusUnit: "px",
						topRightRadius: 0,
						topRightRadiusUnit: "px",
						bottomLeftRadius: 0,
						bottomLeftRadiusUnit: "px",
						bottomRightRadius: 0,
						bottomRightRadiusUnit: "px",

						chosenIcon: "",
						iconPosition: "left",
						iconSize: 0,
						iconUnit: "px",
						buttonIsTransparent: false,
						addNofollow: true,
						openInNewTab: true,
						addSponsored: false,
						buttonWidth: "flex",
					};

					let newButtons = innerBlocks.map((ib) => {
						const splitNumFromUnit = (str) => {
							const [, ...arr] = str.match(/(\d*)([\s\S]*)/);
							return [Number(arr[0]), arr[1]];
						};

						let radiusSettings = {};

						if ("style" in ib.attributes && "border" in ib.attributes.style) {
							const br = ib.attributes.style.border.radius;

							if (typeof br === "string") {
								const parsedRadius = splitNumFromUnit(br);

								radiusSettings = Object.assign(radiusSettings, {
									topLeftRadius: parsedRadius[0],
									topLeftRadiusUnit: parsedRadius[1],
									topRightRadius: parsedRadius[0],
									topRightRadiusUnit: parsedRadius[1],
									bottomLeftRadius: parsedRadius[0],
									bottomLeftRadiusUnit: parsedRadius[1],
									bottomRightRadius: parsedRadius[0],
									bottomRightRadiusUnit: parsedRadius[1],

									buttonRadius: parsedRadius[0],
									buttonRadiusUnit: parsedRadius[1],
								});
							} else {
								const topLeft = splitNumFromUnit(br.topLeft || "0px");
								const topRight = splitNumFromUnit(br.topRight || "0px");
								const bottomLeft = splitNumFromUnit(br.bottomLeft || "0px");
								const bottomRight = splitNumFromUnit(br.bottomRight || "0px");

								radiusSettings = Object.assign(radiusSettings, {
									topLeftRadius: topLeft[0],
									topLeftRadiusUnit: topLeft[1],
									topRightRadius: topRight[0],
									topRightRadiusUnit: topRight[1],
									bottomLeftRadius: bottomLeft[0],
									bottomLeftRadiusUnit: bottomLeft[1],
									bottomRightRadius: bottomRight[0],
									bottomRightRadiusUnit: bottomRight[1],
								});
							}
						}

						const oldButtonStyle =
							getRenderedButtonStyle(ib.clientId) ||
							getButtonColorsFromAttributes(ib.attributes);

						const isUsingOutline =
							"className" in ib.attributes &&
							ib.attributes.className === "is-style-outline";

						const oldTextColor =
							oldButtonStyle.color || revisedDefaultProps.buttonTextColor;
						const oldBackgroundColor =
							oldButtonStyle.backgroundColor || revisedDefaultProps.buttonColor;

						//start from a copy so one button's values can't leak into the next one
						return Object.assign(
							{},
							revisedDefaultProps,
							{
								buttonRounded: Object.keys(radiusSettings).length > 0,
								buttonText: ib.attributes.text || "",
								buttonColor: isUsingOutline ? oldTextColor : oldBackgroundColor,
								buttonTextColor: oldTextColor,
								buttonIsTransparent: isUsingOutline,
								url: ib.attributes.url,
							},
							radiusSettings,
						);
					});

					return createBlock("ub/button", { buttons: newButtons });
				},
			},
		],
	},
});

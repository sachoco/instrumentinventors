import icon, { CircProgressIcon, LinearProgressIcon } from "./icons";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
	BlockControls,
	InspectorControls,
	AlignmentControl,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";

import { useSelect } from "@wordpress/data";

import "./blocks-styles";
import Circle from "./Circle";
import Line from "./Line";
import { useEffect } from "react";
import {
	TextControl,
	ToolbarGroup,
	RangeControl,
	PanelBody,
	ToolbarDropdownMenu,
	ToggleControl,
} from "@wordpress/components";
import {
	BorderRadiusControl,
	ColorSettings,
	CustomToggleGroupControl,
	SpacingControl,
} from "../components";
import HalfCircle from "./HalfCircle";
import metadata from "./block.json";
import { getParentBlock } from "../../common";
import { generateStyles, getSpacingCss } from "../utils/styling-helpers";

function ProgressBarMain(props) {
	const {
		attributes: {
			blockID,
			percentage,
			barType,
			detail,
			detailAlign,
			barColor,
			descriptionColor,
			barBackgroundColor,
			barThickness,
			circleSize,
			labelColor,
			percentagePosition,
			textPosition,
			barBorderRadius,
			isStripe,
			isCircleRounded,
			showNumber,
			numberPrefix,
			numberSuffix,
			padding,
			margin,
		},
		isSelected,
		setAttributes,
		block,
		rootBlockClientId,
		className,
	} = props;
	useEffect(() => {
		if (blockID === "") {
			setAttributes({ blockID: block.clientId, percentage: 75 });
		} else {
			if (percentage === -1) {
				setAttributes({ percentage: 25 });
			}
		}
	}, []);
	useEffect(() => {
		const rootBlock = getParentBlock(rootBlockClientId, "core/block");
		if (!rootBlock) {
			setAttributes({ blockID: block.clientId });
		}
	}, [block?.clientId]);

	const styleClipboard = createStyleClipboard("ub_progress_bar_copied_style", [
		"detailAlign",
		"barColor",
		"descriptionColor",
		"barBackgroundColor",
		"barThickness",
		"circleSize",
		"labelColor",
		"percentagePosition",
		"textPosition",
		"barBorderRadius",
		"isStripe",
		"isCircleRounded",
		"padding",
		"margin",
	]);

	const percentagePositionOptions = [
		{
			label: __("Top", "ultimate-blocks"),
			value: "top",
		},
		{
			label: __("Inside", "ultimate-blocks"),
			value: "inside",
		},
		{
			label: __("Bottom", "ultimate-blocks"),
			value: "bottom",
		},
	];

	const textPositionOptions = [
		{
			label: __("Top", "ultimate-blocks"),
			value: "top",
		},
		{
			label: __("Bottom", "ultimate-blocks"),
			value: "bottom",
		},
	];

	const blockClassName = className ?? props.attributes?.className ?? "";
	const isStyleCircle = blockClassName
		?.split(" ")
		.includes("is-style-ub-progress-bar-circle-wrapper");
	const isStyleHalfCircle = blockClassName
		?.split(" ")
		.includes("is-style-ub-progress-bar-half-circle-wrapper");
	const finalClassNames = ["ub_progress-bar", blockClassName];
	if ((isStyleCircle || isStyleHalfCircle) && isCircleRounded) {
		finalClassNames.push("rounded-circle");
	}

	const paddingObj = getSpacingCss(padding);
	const marginObj = getSpacingCss(margin);
	const styles = {
		paddingTop: paddingObj?.top,
		paddingRight: paddingObj?.right,
		paddingBottom: paddingObj?.bottom,
		paddingLeft: paddingObj?.left,
		marginTop: marginObj?.top,
		marginRight: marginObj?.right,
		marginBottom: marginObj?.bottom,
		marginLeft: marginObj?.left,
	};
	const blockProps = useBlockProps({
		className: finalClassNames.join(" "),
		style: generateStyles(styles),
	});
	const labelStyles = {
		width: percentage ? `${percentage}%` : "100%",
		color: labelColor || "inherit",
	};

	if (percentagePosition === "inside" && !isStyleCircle && !isStyleHalfCircle) {
		labelStyles.fontSize = barThickness ? `${barThickness + 5}%` : "6%";
	}
	const lineStyles = {
		"border-top-left-radius": barBorderRadius?.topLeft,
		"border-top-right-radius": barBorderRadius?.topRight,
		"border-bottom-left-radius": barBorderRadius?.bottomLeft,
		"border-bottom-right-radius": barBorderRadius?.bottomRight,
	};
	const progressBarAttributes = {
		percent: percentage,
		barColor,
		barBackgroundColor,
		barThickness,
		labelColor,
		percentagePosition,
		textPosition,
		isStripe,
		detailAlign,
		detail,
		setAttributes,
		alignment: detailAlign,
		showNumber,
		numberPrefix,
		descriptionColor,
		numberSuffix,
		labelStyles: generateStyles(labelStyles),
	};
	return (
		<>
			{isSelected && (
				<BlockControls group="block">
					<AlignmentControl
						value={detailAlign}
						onChange={(nextAlign) => {
							setAttributes({ detailAlign: nextAlign });
						}}
					/>
				</BlockControls>
			)}
			{isSelected && (
				<BlockControls>
					<GenericStyleControl
						attributes={props.attributes}
						setAttributes={setAttributes}
						clipboard={styleClipboard}
						blockName="Progress Bar"
					/>
				</BlockControls>
			)}
			{isSelected && (
				<>
					<InspectorControls group="settings">
						<PanelBody title={__("General", "ultimate-blocks")}>
							<br />
							{!isStyleCircle && !isStyleHalfCircle && (
								<CustomToggleGroupControl
									label={__("Percentage Position", "ultimate-blocks")}
									attributeKey="percentagePosition"
									options={percentagePositionOptions}
								/>
							)}
							<CustomToggleGroupControl
								label={__("Text Position", "ultimate-blocks")}
								attributeKey="textPosition"
								options={textPositionOptions}
							/>
							{!isStyleCircle && !isStyleHalfCircle && (
								<ToggleControl
									__nextHasNoMarginBottom
									checked={isStripe}
									label={__("Stripe", "ultimate-blocks")}
									onChange={() => setAttributes({ isStripe: !isStripe })}
								/>
							)}
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__("Value", "ultimate-blocks")}
								className="ub_progress_bar_value"
								value={percentage}
								onChange={(value) => setAttributes({ percentage: value })}
								min={0}
								max={100}
								allowReset
							/>
						</PanelBody>
						<PanelBody title={__("Number Settings", "ultimate-blocks")}>
							<ToggleControl
								__nextHasNoMarginBottom
								checked={showNumber}
								label={__("Show Number", "ultimate-blocks")}
								onChange={() => setAttributes({ showNumber: !showNumber })}
							/>
							<TextControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={__("Number Prefix", "ultimate-blocks")}
								value={numberPrefix}
								onChange={(newValue) =>
									setAttributes({ numberPrefix: newValue })
								}
							/>
							<TextControl
								__nextHasNoMarginBottom
								__next40pxDefaultSize
								label={__("Number Suffix", "ultimate-blocks")}
								value={numberSuffix}
								onChange={(newValue) =>
									setAttributes({ numberSuffix: newValue })
								}
							/>
						</PanelBody>
					</InspectorControls>
					<InspectorControls group="color">
						<ColorSettings
							attrKey="barColor"
							label={__("Progress Bar Color", "ultimate-blocks")}
							value={barColor}
						/>
						<ColorSettings
							attrKey="barBackgroundColor"
							label={__("Background Bar Color", "ultimate-blocks")}
							value={barBackgroundColor}
						/>
						<ColorSettings
							attrKey="labelColor"
							label={__("Label Color", "ultimate-blocks")}
							value={labelColor}
						/>
						<ColorSettings
							attrKey="descriptionColor"
							label={__("Description Color", "ultimate-blocks")}
							value={descriptionColor}
						/>
					</InspectorControls>
					<InspectorControls group="styles">
						<PanelBody title={__("Style")}>
							<RangeControl
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								label={__("Thickness")}
								value={barThickness}
								onChange={(value) => setAttributes({ barThickness: value })}
								min={1}
								max={100}
								step={0.1}
								allowReset
							/>
							{(isStyleCircle || isStyleHalfCircle) && (
								<RangeControl
									__next40pxDefaultSize
									__nextHasNoMarginBottom
									label={__("Circle size")}
									value={circleSize}
									onChange={(value) => setAttributes({ circleSize: value })}
									min={50}
									max={600}
									allowReset
								/>
							)}
							<ToggleControl
								__nextHasNoMarginBottom
								checked={isCircleRounded}
								label={__("Rounded", "ultimate-blocks")}
								onChange={() =>
									setAttributes({ isCircleRounded: !isCircleRounded })
								}
							/>
						</PanelBody>
						<PanelBody
							title={__("Dimension Settings", "ultimate-blocks")}
							initialOpen={false}
						>
							<SpacingControl
								showByDefault
								attrKey="padding"
								label={__("Padding", "ultimate-blocks")}
							/>
							<SpacingControl
								minimumCustomValue={-Infinity}
								showByDefault
								attrKey="margin"
								label={__("Margin", "ultimate-blocks")}
							/>
						</PanelBody>
					</InspectorControls>
					{!isStyleCircle && !isStyleHalfCircle && (
						<InspectorControls group="border">
							<BorderRadiusControl
								attrKey="barBorderRadius"
								label={__("Bar Border Radius", "ultimate-blocks")}
							/>
						</InspectorControls>
					)}
				</>
			)}
			<div {...blockProps}>
				{(isStyleCircle || isStyleHalfCircle) && textPosition !== "bottom" && (
					<div className="ub_progress-bar-text">
						<RichText
							tagName="p"
							style={generateStyles({
								textAlign: detailAlign,
								color: descriptionColor,
							})}
							placeholder={__("Progress bar description")}
							value={detail}
							onChange={(text) => setAttributes({ detail: text })}
							keepPlaceholderOnFocus={true}
						/>
					</div>
				)}
				{percentage > -1 && ( //linear progress bar fails to render properly unless a value of 0 or greater is inputted
					<>
						{!isStyleCircle && !isStyleHalfCircle && (
							<Line {...progressBarAttributes} lineStyles={lineStyles} />
						)}
						{isStyleCircle && (
							<Circle {...progressBarAttributes} size={circleSize} />
						)}
						{isStyleHalfCircle && (
							<HalfCircle {...progressBarAttributes} size={circleSize} />
						)}
					</>
				)}
				{(isStyleCircle || isStyleHalfCircle) && textPosition === "bottom" && (
					<div className="ub_progress-bar-text">
						<RichText
							tagName="p"
							style={generateStyles({
								textAlign: detailAlign,
								color: descriptionColor,
							})}
							placeholder={__("Progress bar description")}
							value={detail}
							onChange={(text) => setAttributes({ detail: text })}
							keepPlaceholderOnFocus={true}
						/>
					</div>
				)}
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	...metadata,
	icon,
	attributes: metadata.attributes,
	example: {
		attributes: {
			barColor: "#e11b4c",
			barThickness: 2,
		},
	},
	edit: (props) => {
		const { block, rootBlockClientId } = useSelect(
			(select) => {
				const { getBlock, getBlockRootClientId } = select("core/block-editor");
				const block = getBlock(props.clientId);
				return {
					block,
					rootBlockClientId: getBlockRootClientId(block.clientId),
				};
			},
			[props.clientId],
		);

		return (
			<ProgressBarMain
				{...props}
				block={block}
				rootBlockClientId={rootBlockClientId}
			/>
		);
	},

	save: () => null,
});

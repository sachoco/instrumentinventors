import { isEmpty } from "lodash";
import icon from "./icon";
import Timer from "./components";
import { getParentBlock } from "../../common";
import "./blocks-styles";
import { ColorSettings, SpacingControl } from "../components/";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

import { useEffect, useState } from "react";
import metadata from "./block.json";
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import {
	InspectorControls,
	RichText,
	BlockControls,
	useBlockProps,
	InnerBlocks,
} from "@wordpress/block-editor";
import {
	DateTimePicker,
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	SelectControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { generateStyles, getSpacingCss } from "../utils/styling-helpers";

// block.json can only hold a fixed timestamp, so a freshly inserted timer
// gets a real target here instead of starting out already expired.
const DEFAULT_END_DATE = metadata.attributes.endDate.default;
const DEFAULT_COUNTDOWN_DAYS = 7;

const getDefaultEndDate = () => {
	const target = new Date();
	target.setDate(target.getDate() + DEFAULT_COUNTDOWN_DAYS);
	target.setSeconds(0, 0);
	return Math.floor(target.getTime() / 1000);
};

function CountdownMain(props) {
	const [forceUpdate, setForceUpdate] = useState(false);
	const { block, rootBlockClientId } = useSelect((select) => {
		const { getBlock, getBlockRootClientId } =
			select("core/block-editor") || select("core/editor");
		const block = getBlock(props.clientId);
		const rootBlockClientId = getBlockRootClientId(block.clientId);

		return {
			block,
			rootBlockClientId,
		};
	});
	const {
		isSelected,
		setAttributes,
		attributes: {
			blockID,
			style,
			endDate,
			expiryMessage,
			circleColor,
			circleSize,
			messageAlign,
			largestUnit,
			smallestUnit,
			countdownColor,
			unitColor,
			className: blockClassName,
			padding,
			margin,
			enableExpiryContent,
			enableRedirect,
		},
		proExpiryControls,
		expiryContentBlocks,
	} = props;
	const blockStylesClass = [
		{
			id: "is-style-ub-countdown-odometer",
			type: "Odometer",
		},
		{
			id: "is-style-ub-countdown-regular",
			type: "Regular",
		},
		{
			id: "is-style-ub-countdown-circular",
			type: "Circular",
		},
	];
	const hasBlockClass = isEmpty(blockClassName)
		? false
		: blockClassName.split(" ").filter((blockClass) =>
				blockStylesClass.find((styleClass) => {
					if (styleClass.id.includes(blockClass)) {
						return styleClass;
					}
				}),
			).length > 0;
	useEffect(() => {
		const appliedStyleClass = blockStylesClass.find((styleClass) => {
			if (styleClass.type === style) {
				return styleClass;
			}
		});

		if (!hasBlockClass) {
			setAttributes({
				className: isEmpty(blockClassName)
					? appliedStyleClass.id
					: blockClassName + " " + appliedStyleClass.id,
				style: appliedStyleClass.type,
			});
		}
		if (blockID === "") {
			setAttributes({ blockID: block.clientId });
		}
		if (blockID === "" && endDate === DEFAULT_END_DATE) {
			setAttributes({ endDate: getDefaultEndDate() });
		}
	}, []);
	useEffect(() => {
		const appliedStyleClass = hasBlockClass
			? blockStylesClass.filter((styleClass) =>
					blockClassName
						.split(" ")
						.find((blockClass) => styleClass.id.includes(blockClass)),
				)
			: [];
		if (hasBlockClass && appliedStyleClass.length > 0) {
			setAttributes({ style: appliedStyleClass[0].type });
		}
	}, [blockClassName]);
	useEffect(() => {
		const rootBlock = getParentBlock(rootBlockClientId, "core/block");
		if (!rootBlock) {
			setAttributes({ blockID: block.clientId });
		}
	}, [block?.clientId]);

	const timeUnits = ["week", "day", "hour", "minute", "second"];

	const paddingObj = getSpacingCss(padding);
	const marginObj = getSpacingCss(margin);
	const countdownWrapperStyles = {
		paddingTop: paddingObj?.top,
		paddingRight: paddingObj?.right,
		paddingBottom: paddingObj?.bottom,
		paddingLeft: paddingObj?.left,
		marginTop: !isEmpty(marginObj?.top) ? marginObj?.top : "",
		marginRight: !isEmpty(marginObj?.right) ? marginObj?.right : " ",
		marginBottom: !isEmpty(marginObj?.bottom) ? marginObj?.bottom : "",
		marginLeft: !isEmpty(marginObj?.left) ? marginObj?.left : "",
		"--ub-countdown-unit-color": unitColor,
		"--ub-countdown-digit-color": countdownColor,
	};
	const styleClipboard = createStyleClipboard("ub_countdown_copied_style", [
		"circleColor",
		"countdownColor",
		"unitColor",
		"circleSize",
		"messageAlign",
		"padding",
		"margin",
		"style",
	]);
	return (
		<div {...useBlockProps()}>
			{isSelected && (
				<>
					<InspectorControls group="settings">
						<PanelBody title={__("Timer expiration")}>
							<div className="ub-date-time-picker">
								<DateTimePicker
									currentDate={endDate * 1000}
									onChange={(value) => {
										setAttributes({
											endDate: Math.floor(Date.parse(value) / 1000),
										});
									}}
								/>
							</div>
						</PanelBody>
						{proExpiryControls && proExpiryControls}
						<PanelBody title={__("Displaying unit")} initialOpen={false}>
							<SelectControl
								label={__("Largest unit")}
								value={largestUnit}
								options={timeUnits
									.filter((_, i) => timeUnits.indexOf(smallestUnit) > i)
									.map((timeUnit) => ({
										label: __(timeUnit),
										value: timeUnit,
									}))}
								onChange={(largestUnit) => {
									setAttributes({ largestUnit });
									setForceUpdate(true);
								}}
							/>
							<SelectControl
								label={__("Smallest unit")}
								value={smallestUnit}
								options={timeUnits
									.filter((_, i) => timeUnits.indexOf(largestUnit) < i)
									.map((timeUnit) => ({
										label: __(timeUnit),
										value: timeUnit,
									}))}
								onChange={(smallestUnit) => {
									setAttributes({ smallestUnit });
									setForceUpdate(true);
								}}
							/>
						</PanelBody>
					</InspectorControls>
					<InspectorControls group="color">
						{style === "Circular" && (
							<ColorSettings
								attrKey="circleColor"
								label={__("Circle Color", "ultimate-blocks")}
							/>
						)}
						<ColorSettings
							attrKey="countdownColor"
							label={__("Countdown Color", "ultimate-blocks")}
						/>
						<ColorSettings
							attrKey="unitColor"
							label={__("Unit Color", "ultimate-blocks")}
						/>
					</InspectorControls>
					<InspectorControls group="styles">
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
				</>
			)}
			{isSelected && (
				<BlockControls>
					<ToolbarGroup>
						{["left", "center", "right", "justify"].map((a) => (
							<ToolbarButton
								icon={`editor-${a === "justify" ? a : "align" + a}`}
								label={__(
									(a !== "justify" ? "Align " : "") +
										a[0].toUpperCase() +
										a.slice(1),
								)}
								isActive={messageAlign === a}
								onClick={() => setAttributes({ messageAlign: a })}
							/>
						))}
					</ToolbarGroup>
					<GenericStyleControl
						attributes={props.attributes}
						setAttributes={props.setAttributes}
						clipboard={styleClipboard}
						blockName="Countdown"
					/>
				</BlockControls>
			)}
			<div
				className="ub-countdown-wrapper"
				style={generateStyles(countdownWrapperStyles)}
			>
				<Timer
					timerStyle={style}
					deadline={endDate}
					color={circleColor}
					size={circleSize}
					largestUnit={largestUnit}
					smallestUnit={smallestUnit}
					isAnimated={true}
					forceUpdate={forceUpdate}
					countdownColor={countdownColor}
					unitColor={unitColor}
					finishForcedUpdate={() => setForceUpdate(false)}
				/>
				{!enableExpiryContent && !enableRedirect && (
					<RichText
						tagName="div"
						placeholder={__("Text to show after the countdown is over")}
						style={{ textAlign: messageAlign }}
						value={expiryMessage}
						onChange={(text) => setAttributes({ expiryMessage: text })}
						keepPlaceholderOnFocus={true}
					/>
				)}
				{enableRedirect && (
					<p
						style={{
							textAlign: messageAlign,
							fontStyle: "italic",
							color: "#999",
							marginTop: "1em",
						}}
					>
						{__(
							"Users will be redirected when countdown ends.",
							"ultimate-blocks",
						)}
					</p>
				)}
			</div>
			{expiryContentBlocks}
		</div>
	);
}

registerBlockType(metadata.name, {
	...metadata,
	attributes: metadata.attributes,
	icon: icon,
	category: "ultimateblocks",
	example: {},
	edit: CountdownMain,
	save: (props) => {
		// For Pro version with inner blocks (expiry content), we need to save them
		// The block is still dynamic (server-rendered), but InnerBlocks need to be persisted
		const { attributes } = props;
		const { enableExpiryContent } = attributes;

		// Only save InnerBlocks content if expiry content is enabled
		if (enableExpiryContent) {
			return <InnerBlocks.Content />;
		}

		// For regular countdown without inner blocks, return null (fully dynamic)
		return null;
	},
});

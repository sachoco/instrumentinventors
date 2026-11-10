/**
 * BLOCK: social-share
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

// Import Icons

import {
	SortableContainer,
	SortableElement,
	arrayMove,
} from "react-sortable-hoc";
import metadata from "./block.json";
import {
	FacebookIcon,
	TwitterIcon,
	LinkedInIcon,
	PinterestIcon,
	RedditIcon,
	TumblrIcon,
	icon,
} from "./icons/icons";

// Import components
import Inspector from "./inspector";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

import { useEffect, useState } from "react";
import { getParentBlock } from "../../common";
import { generateStyles, getSpacingCss } from "../utils/styling-helpers";

// variables
const iconSizes = {
	normal: 20,
	medium: 30,
	large: 40,
};

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

import {
	BlockControls,
	useBlockProps,
	JustifyContentControl,
} from "@wordpress/block-editor";
import { useSelect } from "@wordpress/data";

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

const SortableItem = SortableElement(
	({ icon, iconSize, iconShape, color, caption, addOutline, borderRadius }) => {
		const iconDetails = {
			facebook: {
				bgColor: color || "#1877f2",
				main: (
					<FacebookIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#1877f2" : "#ffffff"}
					/>
				),
			},
			linkedin: {
				bgColor: color || "#2867b2",
				main: (
					<LinkedInIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#2867b2" : "#ffffff"}
					/>
				),
			},
			pinterest: {
				bgColor: color || "#e60023",
				main: (
					<PinterestIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#e60023" : "#ffffff"}
					/>
				),
			},
			twitter: {
				bgColor: color || "#1d9bf0",
				main: (
					<TwitterIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#1d9bf0" : "#ffffff"}
					/>
				),
			},
			tumblr: {
				bgColor: color || "#001935",
				main: (
					<TumblrIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#001935" : "#ffffff"}
					/>
				),
			},
			reddit: {
				bgColor: color || "#ff4500",
				main: (
					<RedditIcon
						width={iconSize}
						height={iconSize}
						color={iconShape === "none" ? color || "#ff4500" : "#ffffff"}
					/>
				),
			},
		};

		return (
			<div
				style={
					addOutline
						? {
								border: `1px solid ${iconDetails[icon].bgColor}`,
								margin: "5px",
								paddingRight: "5px",
							}
						: null
				}
			>
				<div
					href="#ub-social-share-block-editor"
					className={
						"ub-social-share-icon social-share-icon " + iconShape + " " + icon
					}
					style={{
						width: iconSize * 1.5,
						height: iconSize * 1.5,
						backgroundColor:
							iconShape === "none" ? "transparent" : iconDetails[icon].bgColor,
						borderTopLeftRadius:
							iconShape === "circle" ? "50%" : (borderRadius?.topLeft ?? "0"),
						borderTopRightRadius:
							iconShape === "circle" ? "50%" : (borderRadius?.topRight ?? "0"),
						borderBottomLeftRadius:
							iconShape === "circle"
								? "50%"
								: (borderRadius?.bottomLeft ?? "0"),
						borderBottomRightRadius:
							iconShape === "circle"
								? "50%"
								: (borderRadius?.bottomRight ?? "0"),
						display: "inline-flex",
						boxShadow: iconShape === "none" ? "none" : null,
					}}
				>
					{iconDetails[icon].main}
				</div>
				<span style={{ color: iconDetails[icon].bgColor }}>{caption}</span>
			</div>
		);
	},
);

const SortableList = SortableContainer(
	({
		items,
		iconShape,
		iconSize,
		align,
		orientation,
		color,
		captions,
		useCaptions,
		addOutline,
		borderRadius,
	}) => (
		<div
			className={`social-share-icons align-icons-${align} orientation-icons-${orientation}`}
		>
			{items.map((value, index) => (
				<SortableItem
					key={`item-${value}`}
					index={index}
					icon={value}
					iconShape={iconShape}
					iconSize={iconSize}
					color={color}
					addOutline={addOutline && useCaptions}
					caption={useCaptions ? captions[value] : ""}
					borderRadius={borderRadius}
				/>
			))}
		</div>
	),
);

function SocialShareMain(props) {
	const [hasTransitioned, setHasTransitioned] = useState(false);

	const {
		attributes,
		setAttributes,
		isSelected,
		className,
		block,
		getBlock,
		getClientIdsWithDescendants,
		rootBlockClientId,
	} = props;
	const blockProps = useBlockProps();
	const {
		blockID,
		align,
		iconShape,
		iconOrder,
		buttonColor,
		useCaptions,
		addOutline,
		orientation,
		padding,
		margin,
		iconBorderRadius,
	} = attributes;

	const iconSize = iconSizes[attributes.iconSize];

	const enabledIcon = {
		facebook: attributes.showFacebookIcon,
		twitter: attributes.showTwitterIcon,
		linkedin: attributes.showLinkedInIcon,
		pinterest: attributes.showPinterestIcon,
		reddit: attributes.showRedditIcon,
		tumblr: attributes.showTumblrIcon,
	};

	useEffect(() => {
		if (blockID === "" && block) {
			setAttributes({ blockID: block.clientId });
		}

		if (!hasTransitioned) {
			if (Object.values(enabledIcon).includes(false)) {
				setAttributes({
					iconOrder: iconOrder.filter((iconName) => enabledIcon[iconName]),
					showFacebookIcon: true,
					showTwitterIcon: true,
					showLinkedInIcon: true,
					showPinterestIcon: true,
					showRedditIcon: true,
					showTumblrIcon: true,
				});
			}
			setHasTransitioned(true);
		}
	}, []);
	useEffect(() => {
		if (!block) {
			return;
		}

		const rootBlock = getParentBlock(rootBlockClientId, "core/block");
		if (!rootBlock) {
			setAttributes({ blockID: block.clientId });
		}
	}, [block?.clientId]);

	const styleClipboard = createStyleClipboard("ub_social_share_copied_style", [
		"align",
		"iconShape",
		"iconSize",
		"buttonColor",
		"iconColor",
		"padding",
		"margin",
		"iconBorderRadius",
	]);

	const paddingObj = getSpacingCss(padding);
	const marginObj = getSpacingCss(margin);

	let styles = {
		paddingTop: paddingObj?.top,
		paddingRight: paddingObj?.right,
		paddingBottom: paddingObj?.bottom,
		paddingLeft: paddingObj?.left,
		marginTop: marginObj?.top,
		marginRight: marginObj?.right,
		marginBottom: marginObj?.bottom,
		marginLeft: marginObj?.left,
	};
	return (
		<>
			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={["left", "center", "right"]}
					value={align}
					onChange={(next) => {
						setAttributes({ align: next });
					}}
				/>
			</BlockControls>

			<BlockControls>
				<GenericStyleControl
					attributes={attributes}
					setAttributes={setAttributes}
					clipboard={styleClipboard}
					blockName="Social Share"
				/>
			</BlockControls>
			<Inspector {...props} />
			<div {...blockProps}>
				<div
					id="ub-social-share-block-editor"
					className={className}
					style={generateStyles(styles)}
				>
					<SortableList
						axis="x"
						items={iconOrder}
						onSortEnd={({ oldIndex, newIndex }) =>
							setAttributes({
								iconOrder: arrayMove(iconOrder, oldIndex, newIndex),
							})
						}
						iconSize={iconSize}
						iconShape={iconShape}
						align={align}
						orientation={orientation}
						color={buttonColor}
						useCaptions={useCaptions}
						addOutline={addOutline}
						borderRadius={iconBorderRadius}
						captions={{
							facebook: attributes.facebookCaption,
							twitter: attributes.twitterCaption,
							linkedin: attributes.linkedInCaption,
							pinterest: attributes.pinterestCaption,
							reddit: attributes.redditCaption,
							tumblr: attributes.tumblrCaption,
						}}
					/>
				</div>
			</div>
		</>
	);
}

registerBlockType(metadata.name, {
	...metadata,
	attributes: metadata.attributes,
	icon: icon,
	example: {},
	edit: (props) => {
		const { block, getBlock, getClientIdsWithDescendants, rootBlockClientId } =
			useSelect(
				(select) => {
					const {
						getBlock,
						getClientIdsWithDescendants,
						getBlockRootClientId,
					} = select("core/block-editor");
					// `block` is null when this instance was never actually inserted
					// into the real block-editor store (e.g. a <BlockPreview> preview
					// render), so it can't be looked up by clientId, guard against
					// that instead of throwing here and blanking the whole render.
					const block = getBlock(props.clientId);
					return {
						block,
						getBlock,
						getClientIdsWithDescendants,
						rootBlockClientId: block
							? getBlockRootClientId(block.clientId)
							: null,
					};
				},
				[props.clientId],
			);

		return (
			<SocialShareMain
				{...props}
				block={block}
				getBlock={getBlock}
				getClientIdsWithDescendants={getClientIdsWithDescendants}
				rootBlockClientId={rootBlockClientId}
			/>
		);
	},

	save: () => null,
});

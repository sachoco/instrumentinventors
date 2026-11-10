import { ExpandRoot } from "./components";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

import icon from "./icon";

import { useEffect } from "react";

import { __ } from "@wordpress/i18n";

import { registerBlockType } from "@wordpress/blocks";
import metadata from "./block.json";
import expandPortionMetadata from "./expand-portion/block.json";
import {
	RichText,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
	useBlockProps,
} from "@wordpress/block-editor";

import { useSelect, useDispatch } from "@wordpress/data";

registerBlockType(metadata.name, {
	...metadata,
	icon: icon,
	attributes: metadata.attributes,
	example: {
		innerBlocks: [
			{
				name: "ub/expand-portion",
				attributes: {
					clickText: "show more",
					displayType: "partial",
					isVisible: true,
					toggleAlign: "left",
					parentID: "518fc740-808b-42ad-b0a8-20d7bf928215",
				},
				innerBlocks: [
					{
						name: "core/heading",
						attributes: { content: "This part is initially shown" },
					},
					{
						name: "core/paragraph",
						attributes: {
							content:
								"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare non magna sit amet dapibus. Vestibulum malesuada commodo nisl, nec consequat lectus molestie quis. Mauris ullamcorper orci fringilla lorem posuere, venenatis finibus felis volutpat. Morbi convallis ipsum id cursus efficitur. Cras tristique accumsan leo, sed venenatis nulla venenatis eget. Quisque et pretium dolor, vitae imperdiet tortor. Vestibulum quis elit id orci consequat tempor. Quisque nibh felis, pellentesque non dapibus eget, congue at urna.",
						},
					},
				],
			},
			{
				name: "ub/expand-portion",
				attributes: {
					clickText: "show less",
					displayType: "full",
					isVisible: false,
					toggleAlign: "left",
					parentID: "518fc740-808b-42ad-b0a8-20d7bf928215",
				},
				innerBlocks: [
					{
						name: "core/heading",
						attributes: { content: "This part is not shown initially" },
					},
					{
						name: "core/paragraph",
						attributes: {
							content:
								"Nunc nec turpis posuere, pharetra erat ut, pretium lorem. Aliquam sagittis diam eget magna vehicula dictum nec eget diam. Sed vel lectus aliquam, convallis ligula at, elementum risus. Aliquam egestas aliquam efficitur. Integer pellentesque ipsum et sapien tempus tempor. Nullam auctor dictum ligula, vel gravida sem vulputate quis. In egestas nisl et lorem tristique egestas. Ut id magna laoreet, placerat urna ac, ultricies sapien. Praesent molestie ornare urna, sit amet volutpat quam. Proin fringilla nisi vel elit ultricies posuere. Pellentesque commodo vel nulla in aliquet.",
						},
					},
				],
			},
		],
	},
	edit: (props) => {
		const {
			block,
			getBlock,
			getClientIdsWithDescendants,
			getSelectedBlockClientId,
			rootBlockClientId,
		} = useSelect(
			(select) => {
				const {
					getBlock,
					getSelectedBlockClientId,
					getClientIdsWithDescendants,
					getBlockRootClientId,
				} = select("core/block-editor");

				const block = getBlock(props.clientId);
				return {
					block,
					getBlock,
					getClientIdsWithDescendants,
					getSelectedBlockClientId,
					rootBlockClientId: getBlockRootClientId(block.clientId),
				};
			},
			[props.clientId],
		);
		const { updateBlockAttributes, insertBlock } =
			useDispatch("core/block-editor");

		return (
			<ExpandRoot
				{...props}
				block={block}
				getBlock={getBlock}
				getClientIdsWithDescendants={getClientIdsWithDescendants}
				getSelectedBlockClientId={getSelectedBlockClientId}
				rootBlockClientId={rootBlockClientId}
				updateBlockAttributes={updateBlockAttributes}
				insertBlock={insertBlock}
			/>
		);
	},

	save: () => <InnerBlocks.Content />,
});

function ExpandPortion(props) {
	const {
		attributes,
		setAttributes,
		isSelected,
		block,
		updateBlockAttributes,
		getBlock,
		getBlockRootClientId,
		ConditionalWrapperContent,
	} = props;
	const { clickText, displayType, isVisible, toggleAlign } = attributes;
	const blockProps = useBlockProps();
	const parentBlockID = getBlockRootClientId(block.clientId);

	const styleClipboard = createStyleClipboard(
		"ub_expand_portion_copied_style",
		["toggleAlign"],
	);

	useEffect(() => {
		if (
			props.attributes.parentID === "" ||
			props.attributes.parentID !== getBlock(parentBlockID).attributes.blockID
		) {
			props.attributes.parentID = getBlock(parentBlockID).attributes.blockID;
		}
	}, []);

	return (
		<div {...blockProps}>
			{isSelected && (
				<BlockControls>
					<GenericStyleControl
						attributes={attributes}
						setAttributes={setAttributes}
						clipboard={styleClipboard}
						blockName="Expand Portion"
					/>
					<AlignmentToolbar
						value={toggleAlign} //attribute from parent can't be directly used
						onChange={(newAlignment) => {
							updateBlockAttributes(parentBlockID, {
								toggleAlign: newAlignment,
							});

							getBlock(parentBlockID).innerBlocks.forEach((innerBlock) =>
								updateBlockAttributes(innerBlock.clientId, {
									toggleAlign: newAlignment,
								}),
							);
						}}
						controls={["left", "center", "right"]}
					></AlignmentToolbar>
				</BlockControls>
			)}
			<div
				className={`ub-expand-portion ub-expand-${displayType}${
					displayType === "full" && !isVisible ? " ub-hide" : ""
				}`}
			>
				{ConditionalWrapperContent && ConditionalWrapperContent}
				{!ConditionalWrapperContent && (
					<InnerBlocks
						templateLock={false}
						renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
					/>
				)}
				<RichText
					tagName="a"
					style={{ textAlign: toggleAlign }} //attribute from parent can't be directly used
					value={clickText}
					className="ub-expand-toggle-button"
					onChange={(value) => setAttributes({ clickText: value })}
					placeholder={__(
						`Text for show ${displayType === "full" ? "less" : "more"} button`,
					)}
				/>
			</div>
		</div>
	);
}

registerBlockType(expandPortionMetadata.name, {
	...expandPortionMetadata,
	icon: icon,
	edit: (props) => {
		const { block, getBlock, getBlockRootClientId, rootBlockClientId } =
			useSelect(
				(select) => {
					const { getBlock, getBlockRootClientId } =
						select("core/block-editor");

					const block = getBlock(props.clientId);
					return {
						block,
						getBlock,
						getBlockRootClientId,
						rootBlockClientId: getBlockRootClientId(block.clientId),
					};
				},
				[props.clientId],
			);
		const { updateBlockAttributes } = useDispatch("core/block-editor");

		return (
			<ExpandPortion
				{...props}
				block={block}
				getBlock={getBlock}
				getBlockRootClientId={getBlockRootClientId}
				rootBlockClientId={rootBlockClientId}
				updateBlockAttributes={updateBlockAttributes}
			/>
		);
	},
	save: () => <InnerBlocks.Content />,
});

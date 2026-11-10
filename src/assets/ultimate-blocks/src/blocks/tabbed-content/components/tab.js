import icon from "../icons/icon";
import { useEffect } from "react";
import metadata from "./block.json";
import { getParentBlock } from "../../../common";
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const { InnerBlocks, useBlockProps } = wp.blockEditor || wp.editor;
const { useSelect } = wp.data;

registerBlockType("ub/tab", {
	title: __("Tab"),
	parent: __("ub/tabbed-content"),
	description: __("content of tab"),
	icon: icon,
	category: "ultimateblocks",
	attributes: {
		index: {
			type: "number",
			default: 0,
		},
		isActive: {
			type: "boolean",
			default: true,
		},
	},
	supports: {
		inserter: false,
		reusable: false,
		lock: false,
	},
	edit(props) {
		return (
			<div style={{ display: props.attributes.isActive ? "block" : "none" }}>
				<InnerBlocks templateLock={false} />
			</div>
		);
	},
	save(props) {
		return (
			<div
				className={`wp-block-ub-tabbed-content-tab-content-wrap ${
					props.attributes.isActive ? "active" : "ub-hide"
				}`}
			>
				<InnerBlocks.Content />
			</div>
		);
	},
});

registerBlockType(metadata.name, {
	...metadata,
	icon: icon,
	edit: function TabEdit(props) {
		const { blockParentId, block } = useSelect(
			(select) => {
				const { getBlockRootClientId, getBlock } = select("core/block-editor");
				return {
					blockParentId: getBlockRootClientId(props.clientId),
					block: getBlock(props.clientId),
				};
			},
			[props.clientId],
		);
		const { setAttributes } = props;
		const { parentID, isActive } = props.attributes;
		const blockProps = useBlockProps({
			style: { display: isActive ? "block" : "none" },
		});
		const rootBlock = getParentBlock(props.clientId, "core/block");

		useEffect(() => {
			if (!rootBlock && (parentID === "" || parentID !== blockParentId)) {
				setAttributes({ parentID: blockParentId });
			}
		}, [parentID, blockParentId]);
		const hasInnerBlocks = block?.innerBlocks?.length > 0;
		return (
			<div {...blockProps}>
				<InnerBlocks
					templateLock={false}
					template={[["core/paragraph"]]}
					renderAppender={() =>
						hasInnerBlocks ? false : <InnerBlocks.ButtonBlockAppender />
					}
				/>
			</div>
		);
	},
	save: () => <InnerBlocks.Content />,
});

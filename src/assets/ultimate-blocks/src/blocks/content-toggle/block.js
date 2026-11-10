/**
 * BLOCK: Content Toggle
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//Import Icon
import icon from "./icons/icon";

import { richTextToHTML, mergeRichTextArray } from "../../common";
import { OldPanelContent, PanelContent } from "./components/editorDisplay";
import metadata from "./block.json";
import { version_1_1_2 } from "./oldVersions";

import { __ } from "@wordpress/i18n";
import {
	registerBlockType,
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from "@wordpress/blocks";
import { compose } from "@wordpress/compose";
import {
	withSelect,
	withDispatch,
	useSelect,
	useDispatch,
} from "@wordpress/data";
import { InnerBlocks } from "@wordpress/block-editor";

const attributes = {
	blockID: {
		type: "string",
		default: "",
	},
	theme: {
		type: "string",
		default: "",
	},
	collapsed: {
		type: "boolean",
		default: false,
	},
	collapsedOnMobile: {
		type: "boolean",
		default: false,
	},
	individualCollapse: {
		type: "boolean",
		default: false,
	},
	titleColor: {
		type: "string",
		default: "",
	},
	titleLinkColor: {
		type: "string",
		default: "",
	},
	hasFAQSchema: {
		type: "boolean",
		default: false,
	},
	titleTag: {
		type: "string",
		default: "p",
	},
	preventCollapse: {
		type: "boolean",
		default: false,
	},
	toggleLocation: {
		type: "string",
		default: "right",
	},
	toggleColor: {
		type: "string",
		default: "#000000",
	},
	toggleIcon: {
		type: "string",
		default: "chevron",
	},
	border: {
		type: "boolean",
		default: true,
	},
	showOnlyOne: {
		type: "boolean",
		default: false,
	},
};

const oldAttributes = Object.assign(Object.assign({}, attributes), {
	accordions: {
		source: "query",
		selector: ".wp-block-ub-content-toggle-accordion",
		query: {
			title: {
				type: "array",
				source: "children",
				selector: ".wp-block-ub-content-toggle-accordion-title",
			},
			content: {
				type: "array",
				source: "children",
				selector: ".wp-block-ub-content-toggle-accordion-content",
			},
		},
	},
});

const CONTENT_TOGGLE_DEFAULTS = {
	theme: "#f1f1f1",
	titleColor: "",
	titleLinkColor: "",
	hasFAQSchema: false,
	toggleLocation: "right",
	toggleColor: "#000000",
	toggleIcon: "chevron",
	border: true,
	showOnlyOne: false,
};

const cloneBlocks = (blocks = []) =>
	createBlocksFromInnerBlocksTemplate(blocks);

const stripHTML = (content = "") =>
	content
		.replace(/<[^>]+>/g, " ")
		.replace(/&nbsp;/gi, " ")
		.replace(/\s+/g, " ")
		.trim();

const trimLeadingAnswerMarkup = (content = "") => {
	const withoutLeadingBreaks = content.replace(
		/^(?:\s|&nbsp;|<br\s*\/?>)+/gi,
		"",
	);

	return withoutLeadingBreaks.replace(/^(?:[:\-\u2013\u2014]\s*)+/u, "").trim();
};

const getQuestionParagraphParts = (block) => {
	if (block?.name !== "core/paragraph") {
		return null;
	}

	const content = block?.attributes?.content?.trim();

	if (!content) {
		return null;
	}

	const match = content.match(
		/^\s*<(strong|b)(?:\s[^>]*)?>([\s\S]*?)<\/\1>([\s\S]*)$/i,
	);

	if (!match) {
		return null;
	}

	const title = match[2].trim();
	const remainder = trimLeadingAnswerMarkup(match[3] || "");
	const plainTitle = stripHTML(title);

	if (!plainTitle) {
		return null;
	}

	if (remainder && !/[?:]$/.test(plainTitle)) {
		return null;
	}

	return { title, remainder };
};

const getPanelTitleFromBlock = (block) => {
	if (["core/heading", "ub/advanced-heading"].includes(block?.name)) {
		return block?.attributes?.content?.trim() || "";
	}

	return getQuestionParagraphParts(block)?.title || "";
};

const getQuestionContentBlocks = (block) => {
	const questionParagraphParts = getQuestionParagraphParts(block);

	if (!questionParagraphParts?.remainder) {
		return [];
	}

	return [
		createBlock(
			block.name,
			{
				...block.attributes,
				content: questionParagraphParts.remainder,
			},
			cloneBlocks(block.innerBlocks),
		),
	];
};

const createContentTogglePanelBlock = ({
	panelTitle,
	innerBlocks = [],
	collapsed = false,
}) =>
	createBlock(
		"ub/content-toggle-panel-block",
		{
			panelTitle: panelTitle || __("Toggle"),
			collapsed,
			...CONTENT_TOGGLE_DEFAULTS,
		},
		innerBlocks.length ? innerBlocks : [createBlock("core/paragraph")],
	);

const createContentToggleBlock = ({ innerBlocks, collapsed = false }) =>
	createBlock(
		"ub/content-toggle-block",
		{
			blockID: Math.random().toString(36).substring(2, 11),
			collapsed,
			...CONTENT_TOGGLE_DEFAULTS,
		},
		innerBlocks,
	);

const createPanelsFromFAQBlocks = (selectedBlocks = []) => {
	const panels = [];
	let currentPanel = null;
	let leadingContentBlocks = [];

	selectedBlocks.forEach((block) => {
		const panelTitle = getPanelTitleFromBlock(block);

		if (panelTitle) {
			if (currentPanel) {
				panels.push(currentPanel);
			}

			currentPanel = {
				panelTitle,
				innerBlocks: [
					...leadingContentBlocks,
					...getQuestionContentBlocks(block),
				],
			};
			leadingContentBlocks = [];
			return;
		}

		const clonedBlock = cloneBlocks([block])[0];

		if (!clonedBlock) {
			return;
		}

		if (!currentPanel) {
			leadingContentBlocks.push(clonedBlock);
			return;
		}

		currentPanel.innerBlocks.push(clonedBlock);
	});

	if (currentPanel) {
		panels.push(currentPanel);
	}

	if (!panels.length && leadingContentBlocks.length) {
		panels.push({
			panelTitle: __("Toggle"),
			innerBlocks: leadingContentBlocks,
		});
	}

	return panels.map((panel) =>
		createContentTogglePanelBlock({
			panelTitle: panel.panelTitle,
			innerBlocks: panel.innerBlocks,
		}),
	);
};

const canCreateFAQPanelsFromBlocks = (selectedBlocks = []) =>
	selectedBlocks.length > 1 &&
	selectedBlocks.some((block) => Boolean(getPanelTitleFromBlock(block)));

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

registerBlockType("ub/content-toggle", {
	title: __("Content Toggle"),
	icon: icon,
	category: "ultimateblocks",
	keywords: [
		__("Content Accordion"),
		__("Toggle Collapse"),
		__("Ultimate Blocks"),
	],

	supports: {
		inserter: false,
	},
	attributes,

	edit: compose([
		withSelect((select, ownProps) => {
			const { getBlock, getSelectedBlockClientId, getBlockRootClientId } =
				select("core/block-editor") || select("core/editor");

			return {
				block: getBlock(ownProps.clientId),
				selectedBlock: getSelectedBlockClientId(),
				parentOfSelectedBlock: getBlockRootClientId(getSelectedBlockClientId()),
			};
		}),
		withDispatch((dispatch) => {
			const {
				updateBlockAttributes,
				insertBlock,
				removeBlock,
				selectBlock,
				replaceBlock,
			} = dispatch("core/block-editor") || dispatch("core/editor");

			return {
				updateBlockAttributes,
				insertBlock,
				removeBlock,
				selectBlock,
				replaceBlock,
			};
		}),
	])(OldPanelContent),

	save() {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
	deprecated: [
		{
			attributes: oldAttributes,
			migrate: (attributes) => {
				const { accordions, ...otherProps } = attributes;
				return [
					otherProps,
					accordions.map((a) => {
						let panelContent = [];
						a.content.forEach((paragraph, i) => {
							if (typeof paragraph === "string") {
								panelContent.push(
									createBlock("core/paragraph", {
										content: paragraph,
									}),
								);
							} else if (paragraph.type === "br") {
								if (a.content[i - 1].type === "br") {
									panelContent.push(createBlock("core/paragraph"));
								}
							} else {
								panelContent.push(
									createBlock("core/paragraph", {
										content: richTextToHTML(paragraph),
									}),
								);
							}
						});

						return createBlock(
							"ub/content-toggle-panel",
							{
								theme: attributes.theme,
								titleColor: attributes.titleColor,
								collapsed: attributes.collapsed,
								panelTitle: mergeRichTextArray(a.title),
							},
							panelContent,
						);
					}),
				];
			},
			save: version_1_1_2,
		},
	],
});

registerBlockType(metadata.name, {
	...metadata,
	icon: icon,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/details"],
				transform: (attributes, innerBlocks) => {
					return createContentToggleBlock({
						collapsed: !attributes.showContent,
						innerBlocks: [
							createContentTogglePanelBlock({
								panelTitle: attributes.summary || __("Toggle"),
								collapsed: !attributes.showContent,
								innerBlocks,
							}),
						],
					});
				},
			},
			{
				type: "block",
				blocks: ["*"],
				isMultiBlock: true,
				isMatch: (selectedAttributes, selectedBlocks) =>
					selectedAttributes.length > 1 &&
					canCreateFAQPanelsFromBlocks(selectedBlocks),
				__experimentalConvert: (selectedBlocks) =>
					createContentToggleBlock({
						innerBlocks: createPanelsFromFAQBlocks(selectedBlocks),
					}),
			},
		],
	},
	attributes: metadata.attributes,
	example: { attributes: { titleLinkColor: "invalid" } }, //indicator for displaying in preview
	edit: (props) => {
		const {
			block,
			selectedBlock,
			getBlock,
			getClientIdsWithDescendants,
			rootBlockClientId,
		} = useSelect(
			(select) => {
				const {
					getBlock,
					getSelectedBlockClientId,
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
					selectedBlock: getSelectedBlockClientId(),
					getBlock,
					getClientIdsWithDescendants,
					rootBlockClientId: block
						? getBlockRootClientId(block.clientId)
						: null,
				};
			},
			[props.clientId],
		);
		const {
			updateBlockAttributes,
			insertBlock,
			insertBlocks,
			removeBlock,
			selectBlock,
		} = useDispatch("core/block-editor");

		return (
			<PanelContent
				{...props}
				block={block}
				selectedBlock={selectedBlock}
				getBlock={getBlock}
				getClientIdsWithDescendants={getClientIdsWithDescendants}
				rootBlockClientId={rootBlockClientId}
				updateBlockAttributes={updateBlockAttributes}
				insertBlock={insertBlock}
				insertBlocks={insertBlocks}
				removeBlock={removeBlock}
				selectBlock={selectBlock}
			/>
		);
	},

	save: () => <InnerBlocks.Content />,
});

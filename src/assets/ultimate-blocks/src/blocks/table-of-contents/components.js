import {
	oneColumnIcon,
	twoColumnsIcon,
	threeColumnsIcon,
	plainList,
} from "./icon";
import { Component } from "react";
import { getDescendantBlocks, mergeRichTextArray } from "../../common";
import toLatin from "./localToLatin";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import filterDiacritics from "./removeDiacritics";
import SavedStylesInspector from "$Inc/components/SavedStyles/SavedStylesInspector";
import { BorderControl, SpacingControl } from "../components";
import { Disabled } from "@wordpress/components";
import { edit, Icon, trash } from "@wordpress/icons";
import { ColorSettings, CustomFontSizePicker } from "../components";
import { getSpacingCss } from "../utils/styling-helpers";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

library.add(faEye, faEyeSlash);

const {
	ToggleControl,
	PanelRow,
	PanelBody,
	ToolbarGroup,
	ToolbarButton,
	SelectControl,
	RangeControl,
	TextControl,
	CheckboxControl,
} = wp.components;
const {
	InspectorControls,
	BlockControls,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
} = wp.blockEditor || wp.editor;
const { select, dispatch, subscribe } = wp.data;
const { __ } = wp.i18n;

class OptionalParent extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		if (this.props.enabled) {
			return (
				<div className={this.props.className} style={this.props.style}>
					{this.props.children}
				</div>
			);
		} else {
			return <>{this.props.children}</>;
		}
	}
}

class TableOfContents extends Component {
	constructor(props) {
		super(props);
		this.state = {
			headers: props.headers,
			unsubscribe: null,
			breaks: [],
			currentlyEditedItem: "", //set to clientid of heading
			hasIdMismatch: false,
			replacementHeaders: [],
		};
	}

	componentDidMount() {
		const { updateBlockAttributes } =
			dispatch("core/block-editor") || dispatch("core/editor");
		const { getBlock } = select("core/block-editor") || select("core/editor");

		const getHeadingBlocks = () => {
			let headings = [];

			let pageNum = 1;

			let pageBreaks = [];

			// Get all blocks including template parts and nested structures
			const getAllBlocks = () => {
				const blockEditorSelect =
					select("core/block-editor") || select("core/editor");
				const {
					getBlocks,
					getBlock,
					getClientIdsWithDescendants,
					getBlockRootClientId,
				} = blockEditorSelect;

				// Get root blocks
				let rootBlocks = getBlocks();

				const extractAllBlocks = (blocks) => {
					if (!blocks || !Array.isArray(blocks)) {
						return [];
					}

					let allBlocks = [];
					for (let i = 0; i < blocks.length; i++) {
						const block = blocks[i];

						if (!block || block.name === "ub/table-of-contents-block") {
							continue;
						}

						allBlocks.push(block);

						// Recursively process inner blocks
						if (block.innerBlocks && block.innerBlocks.length > 0) {
							allBlocks.push(...extractAllBlocks(block.innerBlocks));
						}
					}
					return allBlocks;
				};

				const allBlocks = extractAllBlocks(rootBlocks);

				// Check if we're in template viewing mode (has core/post-content block)
				const postContentBlock = allBlocks.find(
					(b) => b.name === "core/post-content",
				);

				// If in template mode, ONLY get blocks from within core/post-content
				// This excludes header and footer template parts
				if (postContentBlock) {
					const fullPostContentBlock = getBlock(postContentBlock.clientId);
					if (fullPostContentBlock?.innerBlocks?.length > 0) {
						return extractAllBlocks(fullPostContentBlock.innerBlocks);
					}

					// Fallback: get descendants and filter out TOC, post-content, and blocks in template-parts
					const postContentDescendants = getClientIdsWithDescendants(
						postContentBlock.clientId,
					);
					if (postContentDescendants?.length > 0) {
						const fetchedBlocks = [];
						const isInTemplatePart = (clientId) => {
							let currentId = clientId;
							while (currentId) {
								const parentId = getBlockRootClientId(currentId);
								if (!parentId) break;
								const parentBlock = getBlock(parentId);
								if (parentBlock?.name === "core/template-part") return true;
								if (parentBlock?.name === "core/post-content") break;
								currentId = parentId;
							}
							return false;
						};

						for (const descId of postContentDescendants) {
							const block = getBlock(descId);
							if (
								block &&
								block.name !== "ub/table-of-contents-block" &&
								block.name !== "core/post-content" &&
								!isInTemplatePart(descId)
							) {
								fetchedBlocks.push(block);
							}
						}
						return fetchedBlocks;
					}
				}

				return allBlocks;
			};

			const rootBlocks = getAllBlocks();

			// Process all blocks (now flattened from all levels)
			rootBlocks.forEach((block) => {
				if (block.name === "core/heading") {
					headings.push(block);
					pageBreaks.push(pageNum);
				} else if (block.name === "ub/advanced-heading") {
					let newBlock = Object.assign({}, block);
					let blockAttributes = block.attributes;
					newBlock.attributes = Object.assign({}, blockAttributes, {
						level: Number(blockAttributes.level.charAt(1)),
					});
					headings.push(newBlock);
					pageBreaks.push(pageNum);
				} else if (block.name === "uagb/advanced-heading") {
					let newBlock = Object.assign({}, block);
					let blockAttributes = block.attributes;
					newBlock.attributes = Object.assign(blockAttributes, {
						content: blockAttributes.headingTitle || "",
					});
					headings.push(newBlock);
					pageBreaks.push(pageNum);
				} else if (block.name === "themeisle-blocks/advanced-heading") {
					if (
						["h1", "h2", "h3", "h4", "h5", "h6"].includes(block.attributes.tag)
					) {
						let newBlock = Object.assign({}, block);
						let blockAttributes = block.attributes;
						newBlock.attributes = Object.assign(blockAttributes, {
							level: Number(blockAttributes.tag.charAt(1)),
							anchor: `themeisle-otter ${blockAttributes.id}`,
						});
						headings.push(newBlock);
						pageBreaks.push(pageNum);
					}
				} else if (block.name === "kadence/advancedheading") {
					let newBlock = Object.assign({}, block);
					if (!("content" in newBlock.attributes)) {
						newBlock.attributes.content = "";
					}
					headings.push(newBlock);
					pageBreaks.push(pageNum);
				} else if (block.name === "generateblocks/headline") {
					let newBlock = Object.assign({}, block);
					let blockAttributes = block.attributes;
					if (
						["h1", "h2", "h3", "h4", "h5", "h6"].includes(
							newBlock.attributes.element,
						)
					) {
						newBlock.attributes = Object.assign(
							{},
							{
								content: Array.isArray(blockAttributes.content)
									? mergeRichTextArray(blockAttributes.content)
									: blockAttributes.content,
								level: Number(blockAttributes.element.charAt(1)),
								anchor: blockAttributes.elementId,
							},
						);
						headings.push(newBlock);
						pageBreaks.push(pageNum);
					}
				} else if (block.name === "ub/content-toggle-panel-block") {
					if (block.attributes.useToggleInToC) {
						let newBlock = Object.assign({}, block);
						let blockAttributes = block.attributes;
						newBlock.attributes = Object.assign(
							{},
							{
								content: blockAttributes.panelTitle,
								level: Number(blockAttributes.titleTag.charAt(1)),
								anchor: blockAttributes.toggleID,
							},
						);
						headings.push(newBlock);
						pageBreaks.push(pageNum);
					}
				} else if (block.name === "core/nextpage") {
					pageNum++;
				}
			});

			if (JSON.stringify(this.state.breaks) !== JSON.stringify(pageBreaks)) {
				this.setState({ breaks: pageBreaks });
			}

			return headings;
		};

		const setHeadings = (checkIDs = true) => {
			const { removeDiacritics } = this.props;
			const headers = getHeadingBlocks()
				.filter((header) => header && header.attributes) // Filter out null/undefined
				.map((header) =>
					Object.assign(header.attributes, {
						clientId: header.clientId,
						blockName: header.name,
					}),
				);

			headers.forEach((heading, key) => {
				// Add null check for heading
				if (!heading) return;

				if (
					!heading.anchor ||
					heading.anchor.indexOf("themeisle-otter ") === -1
				) {
					heading.anchor = `${key}-${
						typeof heading.content === "undefined"
							? ""
							: (this.props.allowToLatin
									? toLatin("all", heading.content.toString())
									: heading.content.toString()
								)
									.toLowerCase()
									.replace(/( |<.+?>|&nbsp;)/g, "-")
					}`;

					heading.anchor = heading.anchor
						.replace(/[^\w\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s-]/g, "")
						.replace(/-{2,}/g, "-");

					if (removeDiacritics) {
						heading.anchor = filterDiacritics(heading.anchor).replace(
							/[\u0300-\u036F\u1AB0-\u1AFF\u1DC0-\u1DFF\u20D0-\u20FF]/g,
							"",
						);
					}

					heading.anchor = encodeURIComponent(heading.anchor);

					// Get the current block once to avoid multiple calls
					const currentBlock = getBlock(heading.clientId);

					if (
						heading.blockName === "generateblocks/headline" &&
						currentBlock &&
						currentBlock.attributes &&
						heading.anchor !== currentBlock.attributes.anchor
					) {
						updateBlockAttributes(heading.clientId, {
							anchor: heading.anchor,
						});
					}

					if (
						heading.blockName === "ub/advanced-heading" &&
						currentBlock &&
						currentBlock.attributes &&
						heading.anchor !== currentBlock.attributes.anchor
					) {
						updateBlockAttributes(heading.clientId, {
							anchor: heading.anchor,
						});
					}

					if (
						heading.blockName === "ub/content-toggle-panel-block" &&
						currentBlock &&
						currentBlock.attributes &&
						heading.anchor !== currentBlock.attributes.toggleID
					) {
						updateBlockAttributes(heading.clientId, {
							toggleID: heading.anchor,
						});
					}
				}
			});

			const currentIDs = this.state.headers
				? this.state.headers.map((header) => header.clientId)
				: [];

			const hasHeadings =
				Array.isArray(this.state.headers) && this.state.headers.length > 0;

			const newHeaders = headers.map((header, i) => ({
				blockName: header.blockName,
				clientId: header.clientId,
				content: header.content,
				level: header.level,
				anchor: header.anchor,
				index: i,
				disabled:
					hasHeadings &&
					this.state.headers[i] &&
					"disabled" in this.state.headers[i]
						? checkIDs
							? currentIDs.indexOf(header.clientId) > -1
								? this.state.headers[currentIDs.indexOf(header.clientId)]
										.disabled
								: false
							: this.state.headers[i].disabled
						: false,
				customContent:
					hasHeadings &&
					this.state.headers[i] &&
					"customContent" in this.state.headers[i]
						? checkIDs
							? currentIDs.indexOf(header.clientId) > -1
								? this.state.headers[currentIDs.indexOf(header.clientId)]
										.customContent
								: ""
							: this.state.headers[i].customContent
						: "",
			}));

			if (JSON.stringify(newHeaders) !== JSON.stringify(this.state.headers)) {
				if (Array.isArray(this.state.headers)) {
					if (this.state.headers.length === newHeaders.length) {
						let hasMismatch = false;

						this.state.headers.some(
							(h, i) => h.clientId !== newHeaders[i].clientId,
						);

						if (checkIDs && hasMismatch) {
							this.setState({
								hasIdMismatch: true,
								replacementHeaders: newHeaders,
							});
						} else {
							this.setState({
								headers: this.state.headers.map((hd, i) => {
									const defaultReplacement =
										this.state.headers[
											this.state.headers
												.map((h) => h.clientId)
												.indexOf(newHeaders[i].clientId)
										] || hd;
									return Object.assign({}, newHeaders[i], {
										disabled:
											newHeaders[i].disabled || defaultReplacement.disabled,
										customContent:
											newHeaders[i].customContent ||
											defaultReplacement.customContent,
									});
								}),
							});
						}
					} else {
						this.setState({
							hasIdMismatch: true,
							replacementHeaders: newHeaders,
						});
					}
				} else {
					this.setState({ headers: newHeaders });
				}
			}
		};

		setHeadings(false);

		const unsubscribe = subscribe(() => setHeadings());
		this.setState({ unsubscribe });

		// bind setHeadings to component context
		this.setHeadings = setHeadings.bind(this);
	}

	componentWillUnmount() {
		if (this.state.unsubscribe) {
			this.state.unsubscribe();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// call header manipulation to trigger latin alphabet conversion of links
		const { setAttributes, attributes } = this.props.blockProp;
		const { headers, replacementHeaders, breaks, currentlyEditedItem } =
			this.state;

		if (
			this.props.allowToLatin !== prevProps.allowToLatin ||
			this.props.removeDiacritics !== prevProps.removeDiacritics
		) {
			this.setHeadings();
			setAttributes({ links: JSON.stringify(headers) });
			return;
		}

		if (JSON.stringify(headers) !== JSON.stringify(prevState.headers)) {
			setAttributes({ links: JSON.stringify(headers) });
		}
		if (breaks !== attributes.gaps) {
			setAttributes({ gaps: breaks });
		}

		if (this.state.hasIdMismatch) {
			const oldIDs = Array.isArray(headers)
				? headers.map((h) => h.clientId)
				: [];
			const newIDs = replacementHeaders.map((h) => h.clientId);

			if (oldIDs.length === newIDs.length) {
				let mismatchLocs = [];
				for (let i = 0; i < replacementHeaders.length; i++) {
					if (headers[i].clientId !== replacementHeaders[i].clientId) {
						mismatchLocs.push(i);
					}
				}
				let replacements = JSON.parse(JSON.stringify(replacementHeaders)).sort(
					(a, b) =>
						newIDs.indexOf(a.clientId) > newIDs.indexOf(b.clientId) ? 1 : -1,
				);

				if (mismatchLocs.length < 1) {
					replacements = replacements.map((h, i) =>
						Object.assign({}, h, {
							disabled: headers[newIDs.indexOf(headers[i].clientId)].disabled,
							customContent:
								headers[newIDs.indexOf(headers[i].clientId)].customContent,
						}),
					);
				}

				this.setState({ headers: JSON.parse(JSON.stringify(replacements)) });
			} else {
				let diff = [];
				let currentHeaders = JSON.parse(JSON.stringify(headers)) || [];
				if (oldIDs.length < newIDs.length) {
					let insertionSpots = [];
					newIDs.forEach((nh, i) => {
						if (oldIDs.indexOf(nh) === -1) {
							diff.push(nh);
							insertionSpots.push(i);
						}
					});

					insertionSpots.forEach((index, i) => {
						const currentHeader = replacementHeaders.filter(
							(nh) => nh.clientId === diff[i],
						)[0];
						currentHeaders.splice(index, 0, currentHeader);
					});
				} else {
					let deletionSpots = [];

					oldIDs.forEach((nh, i) => {
						if (newIDs.indexOf(nh) === -1) {
							diff.push(nh);
							deletionSpots.push(i);
						}
					});

					if (newIDs.length) {
						// Sort in reverse order to avoid index shifting when deleting
						deletionSpots.sort((a, b) => b - a);

						deletionSpots.forEach((index) => {
							// Check if the header exists at this index
							if (currentHeaders[index]) {
								// Check if heading was split and needs attribute transfer
								if (
									index !== currentHeaders[index].index &&
									currentHeaders[currentHeaders[index].index]
								) {
									//heading split, transfer extra attributes of old heading to first of two new ones
									Object.assign(currentHeaders[currentHeaders[index].index], {
										disabled: currentHeaders[index].disabled,
										customContent: currentHeaders[index].customContent,
									});
								}
								// Remove the item
								currentHeaders.splice(index, 1);
							}
						});
					} else {
						currentHeaders = [];
					}
				}
				this.setState({ headers: currentHeaders });
			}

			this.setState({ hasIdMismatch: false });
		}

		if (this.props.canRemoveItemFocus) {
			if (currentlyEditedItem) {
				this.setState({ currentlyEditedItem: "" });
			}
			this.props.itemFocusRemoved();
		}
	}

	render() {
		const {
			allowedHeaders,
			blockProp,
			style,
			numColumns,
			listStyle,
			listIcon,
		} = this.props;

		const { parseProList } = blockProp;

		const { isSelected } = blockProp;

		const { listColor, listBackgroundColor } = blockProp.attributes;

		const { headers, currentlyEditedItem } = this.state;

		const placeItem = (arr, item) => {
			if (arr.length === 0 || arr[0].level === item.level) {
				arr.push(Object.assign({}, item));
			} else if (arr[arr.length - 1].level < item.level) {
				if (!arr[arr.length - 1].children) {
					arr[arr.length - 1].children = [Object.assign({}, item)];
				} else placeItem(arr[arr.length - 1].children, item);
			}
		};

		const makeHeaderArray = (origHeaders) => {
			let array = [];

			origHeaders
				.filter((header) => allowedHeaders[header.level - 1])
				.filter((header) => !header.disabled || isSelected)
				.forEach((header) => placeItem(array, header));

			return array;
		};

		const readCustomHeadingInput = () => {
			const revisedHeaders = JSON.parse(JSON.stringify(this.state.headers));

			const currentlyEditedHeader = revisedHeaders.filter(
				(h) => h.clientId === currentlyEditedItem,
			)[0];

			if (
				currentlyEditedHeader.customContent ===
				currentlyEditedHeader.content.replace(/<.+?>/g, "")
			) {
				//no changes detected
				revisedHeaders[currentlyEditedHeader.index].customContent = "";
				this.setState({ headers: revisedHeaders });
			}
			this.setState({ currentlyEditedItem: "" });
		};

		const parseList = (list) =>
			list.map((item) => (
				<li>
					<OptionalParent
						enabled={["plain", "bulleted"].includes(listStyle)}
						style={{
							display: "flex",
							justifyItems: "space-between",
						}}
					>
						{isSelected && currentlyEditedItem === item.clientId ? (
							<input
								type="text"
								value={item.customContent}
								onChange={(e) => {
									const revisedHeaders = JSON.parse(
										JSON.stringify(this.state.headers),
									);
									revisedHeaders[item.index].customContent = e.target.value;
									this.setState({ headers: revisedHeaders });
								}}
								onBlur={readCustomHeadingInput}
							/>
						) : (
							<a
								href={`#${item.anchor}`}
								dangerouslySetInnerHTML={{
									__html: `${item.disabled ? "<del>" : ""}${
										item.customContent ||
										(typeof item.content === "undefined"
											? ""
											: item.content.replace(/(<.+?>)/g, ""))
									}${item.disabled ? "</del>" : ""}`,
								}}
							/>
						)}
						{isSelected && (
							<div className="ub_toc_button_container">
								{!item.disabled && (
									<button
										onClick={() => {
											const revisedHeaders = JSON.parse(
												JSON.stringify(this.state.headers),
											);

											if (!revisedHeaders[item.index].customContent) {
												revisedHeaders[item.index].customContent =
													revisedHeaders[item.index].content.replace(
														/<.+?>/g,
														"",
													);
												this.setState({ headers: revisedHeaders });
											}
											this.setState({ currentlyEditedItem: item.clientId });
										}}
									>
										<Icon icon={edit} />
									</button>
								)}
								<button
									onClick={() => {
										const revisedHeaders = JSON.parse(
											JSON.stringify(this.state.headers),
										);
										revisedHeaders[item.index].disabled =
											!revisedHeaders[item.index].disabled;
										this.setState({ headers: revisedHeaders });
									}}
								>
									<Icon icon={trash} />
								</button>
							</div>
						)}
					</OptionalParent>
					{item.children &&
						(listStyle === "numbered" ? (
							<ol>{parseList(item.children)}</ol>
						) : (
							<ul
								style={{
									listStyle: listStyle === "plain" ? "none" : null,
								}}
							>
								{parseList(item.children)}
							</ul>
						))}
				</li>
			));

		if (!isSelected) {
			if (currentlyEditedItem) {
				readCustomHeadingInput();
			}
		}

		if (
			headers.length > 0 &&
			headers.filter((header) => allowedHeaders[header.level - 1]).length > 0
		) {
			const { itemSpacing } = this.props.blockProp.attributes;
			const itemSpacingCss = getSpacingCss(itemSpacing || {});

			return (
				<div
					style={{
						...style,
						"--ub-toc-item-spacing": itemSpacingCss?.top || undefined,
					}}
					className={`ub_table-of-contents-container ub_table-of-contents-${numColumns}-column`}
				>
					{listStyle === "numbered" ? (
						<ol>
							{parseProList
								? parseProList(
										makeHeaderArray(headers),
										currentlyEditedItem,
										this.state,
										this.setState.bind(this),
										readCustomHeadingInput,
									)
								: parseList(makeHeaderArray(headers))}
						</ol>
					) : (
						<ul
							className={listIcon ? "fa-ul" : null}
							style={{
								listStyle: listStyle === "plain" ? "none" : null,
							}}
						>
							{parseProList
								? parseProList(
										makeHeaderArray(headers),
										currentlyEditedItem,
										this.state,
										this.setState.bind(this),
										readCustomHeadingInput,
									)
								: parseList(makeHeaderArray(headers))}
						</ul>
					)}
					{this.props.showMoreLink}
				</div>
			);
		} else {
			return (
				blockProp && (
					<p className="ub_table-of-contents-placeholder">
						{__("Add a heading to begin generating the table of contents")}
					</p>
				)
			);
		}
	}
}

export const inspectorControls = (props) => {
	const {
		attributes,
		setAttributes,
		stickyControl,
		savedStylePro,
		toggleButtonTypeControl,
		iconControlPro,
	} = props;

	const {
		allowedHeaders,
		showList,
		hideOnMobile,
		allowToCHiding,
		enableShowMore,
		showMoreLimit,
		showMoreText,
		showLessText,
		enableSmoothScroll,
		allowToLatin,
		removeDiacritics,
		scrollOption,
		scrollOffset,
		scrollTarget,
		scrollTargetType,
		titleColor,
		titleBackgroundColor,
		listStyle,
		listIconColor,
		listColor,
		listBackgroundColor,
		numColumns,
		showText,
		hideText,
		linkToDivider,
		toggleButtonType,
		isSticky,
		titleFontSize,
		listFontSize,
	} = attributes;

	const { updateBlockAttributes } =
		dispatch("core/block-editor") || dispatch("core/editor");
	const { getBlocks } = select("core/block-editor") || select("core/editor");
	// Color settings are now handled by the ColorSettings component

	return (
		<>
			<InspectorControls group="settings">
				{savedStylePro && savedStylePro}
				<PanelBody title={__("Allowed Headings")}>
					<div className="ub_toc_heading_selection">
						{allowedHeaders.map((a, i) => (
							<CheckboxControl
								label={`H${i + 1}`}
								checked={a}
								onChange={() =>
									setAttributes({
										allowedHeaders: [
											...allowedHeaders.slice(0, i),
											!allowedHeaders[i],
											...allowedHeaders.slice(i + 1),
										],
									})
								}
							/>
						))}
					</div>
				</PanelBody>
				<PanelBody title={__("Layout")} initialOpen={false}>
					<PanelRow>
						<p>{__("Columns")}</p>
						<ToolbarGroup>
							<ToolbarButton
								className={"ub_toc_column_selector"}
								icon={oneColumnIcon}
								label={__("One column")}
								isPrimary={numColumns === 1}
								onClick={() => setAttributes({ numColumns: 1 })}
							/>
							<ToolbarButton
								className={"ub_toc_column_selector"}
								icon={twoColumnsIcon}
								label={__("Two columns")}
								isPrimary={numColumns === 2}
								onClick={() => setAttributes({ numColumns: 2 })}
							/>
							<ToolbarButton
								className={"ub_toc_column_selector"}
								icon={threeColumnsIcon}
								label={__("Three columns")}
								isPrimary={numColumns === 3}
								onClick={() => setAttributes({ numColumns: 3 })}
							/>
						</ToolbarGroup>
					</PanelRow>
					<PanelRow>
						<p>{__("List type")}</p>
						<ToolbarGroup>
							<ToolbarButton
								icon="editor-ul"
								label={__("Bulleted list")}
								isPrimary={listStyle === "bulleted"}
								onClick={() => setAttributes({ listStyle: "bulleted" })}
							/>
							<ToolbarButton
								icon="editor-ol"
								label={__("Numbered list")}
								isPrimary={listStyle === "numbered"}
								onClick={() => setAttributes({ listStyle: "numbered" })}
							/>
							<ToolbarButton
								icon={plainList}
								label={__("Plain list")}
								isPrimary={listStyle === "plain"}
								onClick={() => setAttributes({ listStyle: "plain" })}
							/>
						</ToolbarGroup>
					</PanelRow>
					<br></br>
					{iconControlPro && iconControlPro}
				</PanelBody>
				<PanelBody title={__("Collapsible")} initialOpen={false}>
					<ToggleControl
						label={__("Collapsible", "ultimate-blocks")}
						id="ub_toc_toggle_display"
						checked={allowToCHiding}
						onChange={(allowToCHiding) =>
							setAttributes({
								allowToCHiding,
								showList: allowToCHiding ? showList : true,
								hideOnMobile: false,
							})
						}
					/>
					{allowToCHiding && (
						<>
							{!toggleButtonType ||
								(toggleButtonType && toggleButtonType === "text" && (
									<>
										<TextControl
											label={__("Show text", "ultimate-blocks")}
											value={showText}
											onChange={(showText) => setAttributes({ showText })}
										/>
										<TextControl
											label={__("Hide text", "ultimate-blocks")}
											value={hideText}
											onChange={(hideText) => setAttributes({ hideText })}
										/>
									</>
								))}

							<ToggleControl
								label={__("Initial Show", "ultimate-blocks")}
								id="ub_show_toc"
								checked={showList}
								onChange={() => setAttributes({ showList: !showList })}
							/>
							<ToggleControl
								label={__("Initial Hide on Mobile", "ultimate-blocks")}
								id="ub_hide_on_mobile"
								checked={hideOnMobile}
								onChange={() => setAttributes({ hideOnMobile: !hideOnMobile })}
							/>
							{toggleButtonTypeControl && toggleButtonTypeControl}
						</>
					)}
				</PanelBody>
				<PanelBody title={__("Show more", "ultimate-blocks")} initialOpen={false}>
					<ToggleControl
						label={__("Show more link", "ultimate-blocks")}
						help={__(
							"Shorten long lists. The rest of the items appear when the link is clicked.",
							"ultimate-blocks",
						)}
						checked={enableShowMore}
						onChange={(enableShowMore) => setAttributes({ enableShowMore })}
					/>
					{enableShowMore && (
						<>
							<RangeControl
								label={__("Items shown", "ultimate-blocks")}
								value={showMoreLimit}
								onChange={(showMoreLimit) =>
									setAttributes({ showMoreLimit: showMoreLimit || 1 })
								}
								min={1}
								max={30}
							/>
							<TextControl
								label={__("Show more text", "ultimate-blocks")}
								placeholder={__("Show more", "ultimate-blocks")}
								value={showMoreText}
								onChange={(showMoreText) => setAttributes({ showMoreText })}
							/>
							<TextControl
								label={__("Show less text", "ultimate-blocks")}
								placeholder={__("Show less", "ultimate-blocks")}
								value={showLessText}
								onChange={(showLessText) => setAttributes({ showLessText })}
							/>
						</>
					)}
				</PanelBody>
				<PanelBody title={__("Scroll")} initialOpen={false}>
					<SelectControl
						label={__("Scroll offset adjustment")}
						value={scrollOption}
						options={[
							{
								label: __("Relative to first available fixed/sticky element"),
								value: "auto",
							},
							{
								label: __("Relative to a specific element"),
								value: "namedelement",
							},
							{ label: __("Fixed height"), value: "fixedamount" },
							{ label: __("No adjustments"), value: "off" },
						]}
						onChange={(scrollOption) => setAttributes({ scrollOption })}
					/>
					{scrollOption === "namedelement" && (
						<>
							<SelectControl
								label={__("Scroll reference name type")}
								value={scrollTargetType}
								options={["id", "class", "element"].map((a) => ({
									label: __(a),
									value: a,
								}))}
								onChange={(scrollTargetType) =>
									setAttributes({ scrollTargetType })
								}
							/>
							<TextControl
								label={__("Reference element for scroll offset")}
								value={scrollTarget}
								onChange={(scrollTarget) => setAttributes({ scrollTarget })}
							/>
						</>
					)}
					{scrollOption === "fixedamount" && (
						<RangeControl
							label={__("Scroll offset (pixels)")}
							value={scrollOffset}
							onChange={(scrollOffset) => setAttributes({ scrollOffset })}
							min={0}
							max={200}
							allowReset
						/>
					)}
					<ToggleControl
						label={__("Enable smooth scrolling", "ultimate-blocks")}
						id="ub_toc_scroll"
						checked={enableSmoothScroll}
						onChange={() => {
							const tocInstances = getBlocks().filter(
								(block) => block.name === "ub/table-of-contents-block",
							);
							tocInstances.forEach((instance) => {
								updateBlockAttributes(instance.clientId, {
									enableSmoothScroll: !enableSmoothScroll,
								});
							});
						}}
					/>
				</PanelBody>
				{stickyControl && stickyControl}
				<PanelBody title={__("Additional")} initialOpen={false}>
					<Disabled isDisabled={isSticky} style={{ marginBottom: "24px" }}>
						<ToggleControl
							label={__("Link to divider", "ultimate-blocks")}
							checked={linkToDivider}
							onChange={() => setAttributes({ linkToDivider: !linkToDivider })}
						/>
					</Disabled>

					<ToggleControl
						label={__("Romanize anchor links", "ultimate-blocks")}
						id="ub_toc_enable_latin_conversion"
						checked={allowToLatin}
						onChange={(e) => setAttributes({ allowToLatin: e })}
					/>
					<ToggleControl
						label={__("Remove diacritics from anchor links", "ultimate-blocks")}
						id="ub_toc_toggle_diacritics"
						checked={removeDiacritics}
						onChange={(removeDiacritics) => setAttributes({ removeDiacritics })}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="typography">
				<CustomFontSizePicker
					attrKey="titleFontSize"
					label={__("Title Font Size", "ultimate-blocks")}
				/>
				<CustomFontSizePicker
					attrKey="listFontSize"
					label={__("List Font Size", "ultimate-blocks")}
				/>
			</InspectorControls>
			<InspectorControls group="styles">
				<SavedStylesInspector
					attributes={() => {
						// eslint-disable-next-line no-unused-vars
						const { blockID, title, ...rest } = attributes;

						return rest;
					}}
					setAttribute={setAttributes}
					previewAttributeCallback={(attr) => attr}
					previewElementCallback={(el) => el}
					previewsEnabled={false}
				/>
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
					<SpacingControl
						showByDefault
						attrKey="itemSpacing"
						label={__("Item Spacing", "ultimate-blocks")}
						sides={["top"]}
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorSettings
					label={__("Title Color", "ultimate-blocks")}
					attrKey="titleColor"
				/>
				<ColorSettings
					label={__("Title Background Color", "ultimate-blocks")}
					attrKey="titleBackgroundColor"
				/>
				<ColorSettings
					label={__("List Color", "ultimate-blocks")}
					attrKey="listColor"
				/>
				<ColorSettings
					label={__("List Background Color", "ultimate-blocks")}
					attrKey="listBackgroundColor"
				/>
				{listStyle !== "plain" && (
					<ColorSettings
						label={
							listStyle === "numbered"
								? __("Item number color", "ultimate-blocks")
								: __("List icon color", "ultimate-blocks")
						}
						attrKey="listIconColor"
					/>
				)}
				{isSticky && (
					<ColorSettings
						label={__("Sticky Button Icon Color", "ultimate-blocks-pro")}
						attrKey="stickyButtonIconColor"
					/>
				)}
			</InspectorControls>
			<InspectorControls group="border">
				<BorderControl
					showDefaultBorder
					showDefaultBorderRadius
					attrBorderKey="border"
					attrBorderRadiusKey="borderRadius"
					borderLabel={__("Border", "ultimate-blocks")}
					borderRadiusLabel={__("Border Radius", "ultimate-blocks")}
				/>
			</InspectorControls>
		</>
	);
};

export const blockControls = (props) => {
	const { setAttributes } = props;
	const { numColumns, titleAlignment, listStyle } = props.attributes;

	const styleClipboard = createStyleClipboard(
		"ub_table_of_contents_copied_style",
		[
			"numColumns",
			"listStyle",
			"titleAlignment",
			"listTextColor",
			"listFontSize",
			"linkColor",
			"enableSmoothScroll",
			"scrollOffset",
			"backgroundColor",
			"titleColor",
			"titleFontSize",
			"border",
			"borderRadius",
			"padding",
			"margin",
		],
	);

	return (
		<BlockControls>
			<GenericStyleControl
				attributes={props.attributes}
				setAttributes={setAttributes}
				clipboard={styleClipboard}
				blockName="Table of Contents"
			/>
			<ToolbarGroup>
				<ToolbarButton
					className={"ub_toc_column_selector"}
					icon={oneColumnIcon}
					label={__("One column")}
					isPrimary={numColumns === 1}
					onClick={() => setAttributes({ numColumns: 1 })}
				/>
				<ToolbarButton
					className={"ub_toc_column_selector"}
					icon={twoColumnsIcon}
					label={__("Two columns")}
					isPrimary={numColumns === 2}
					onClick={() => setAttributes({ numColumns: 2 })}
				/>
				<ToolbarButton
					className={"ub_toc_column_selector"}
					icon={threeColumnsIcon}
					label={__("Three columns")}
					isPrimary={numColumns === 3}
					onClick={() => setAttributes({ numColumns: 3 })}
				/>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarButton
					icon="editor-ul"
					label={__("Bulleted list")}
					isPrimary={listStyle === "bulleted"}
					onClick={() => setAttributes({ listStyle: "bulleted" })}
				/>
				<ToolbarButton
					icon="editor-ol"
					label={__("Numbered list")}
					isPrimary={listStyle === "numbered"}
					onClick={() => setAttributes({ listStyle: "numbered" })}
				/>
				<ToolbarButton
					icon={plainList}
					label={__("Plain list")}
					isPrimary={listStyle === "plain"}
					onClick={() => setAttributes({ listStyle: "plain" })}
				/>
			</ToolbarGroup>
			<AlignmentToolbar
				value={titleAlignment}
				onChange={(value) => setAttributes({ titleAlignment: value })}
			/>
		</BlockControls>
	);
};

export const editorDisplay = (props) => {
	const {
		setAttributes,
		canRemoveItemFocus,
		toggleCanRemoveItemFocus,
		hideElementPro,
		listIcon,
		toggleButtonType,
		styleTagPro,
		showAllItems,
		setShowAllItems,
	} = props;

	const {
		links,
		title,
		allowedHeaders,
		showList,
		allowToCHiding,
		numColumns,
		listStyle,
		titleAlignment,
		allowToLatin,
		removeDiacritics,
		titleColor,
		titleBackgroundColor,
		listColor,
		listBackgroundColor,
		listIconColor,
		blockID,
		showText,
		hideText,
		titleFontSize,
		listFontSize,
		enableShowMore,
		showMoreLimit,
		showMoreText,
		showLessText,
	} = props.attributes;

	const visibleHeaderCount = (links ? JSON.parse(links) : []).filter(
		(header) => allowedHeaders[header.level - 1] && !header.disabled,
	).length;

	const toggleShowAll = (event) => {
		event.preventDefault();
		setShowAllItems(!showAllItems);
	};

	const showMoreLink =
		enableShowMore && visibleHeaderCount > showMoreLimit ? (
			<a
				className="ub_table-of-contents-show-more"
				role="button"
				tabIndex={0}
				aria-expanded={showAllItems}
				onClick={toggleShowAll}
				onKeyDown={(event) => {
					if (event.key === "Enter" || event.key === " ") {
						toggleShowAll(event);
					}
				}}
			>
				{showAllItems
					? showLessText || __("Show less", "ultimate-blocks")
					: showMoreText || __("Show more", "ultimate-blocks")}
			</a>
		) : null;

	return (
		<>
			<div
				className="ub_table-of-contents-header"
				style={{
					textAlign: titleAlignment,
					backgroundColor: titleBackgroundColor,
				}}
			>
				<div
					className="ub_table-of-contents-title"
					style={{ color: titleColor, fontSize: titleFontSize || undefined }}
				>
					<RichText
						placeholder={__("Optional title")}
						className="ub_table-of-contents-title"
						onFocus={() => toggleCanRemoveItemFocus(true)}
						onChange={(text) => setAttributes({ title: text })}
						value={title}
						keepPlaceholderOnFocus={true}
					/>
				</div>
				{allowToCHiding && (
					<div id="ub_table-of-contents-header-toggle">
						{!toggleButtonType ||
							(toggleButtonType && toggleButtonType === "text" && (
								<div
									id="ub_table-of-contents-toggle"
									style={{ color: titleColor }}
								>
									[
									<a
										className="ub_table-of-contents-toggle-link"
										href="#"
										style={{ color: titleColor }}
										onClick={() => setAttributes({ showList: !showList })}
									>
										{showList ? hideText || __("hide") : showText || __("show")}
									</a>
									]
								</div>
							))}
						{hideElementPro && hideElementPro}
					</div>
				)}
			</div>
			{showList && (
				<TableOfContents
					listStyle={listStyle}
					listIcon={listIcon ? listIcon : ""}
					numColumns={numColumns}
					allowedHeaders={allowedHeaders}
					headers={links && JSON.parse(links)}
					blockProp={props}
					allowToLatin={allowToLatin}
					removeDiacritics={removeDiacritics}
					canRemoveItemFocus={canRemoveItemFocus}
					itemFocusRemoved={() => toggleCanRemoveItemFocus(false)}
					style={{
						backgroundColor: listBackgroundColor,
						color: listColor,
						fontSize: listFontSize || undefined,
					}}
					toggleButtonType={toggleButtonType}
					showMoreLink={showMoreLink}
				/>
			)}
			{styleTagPro ? (
				styleTagPro
			) : (
				<style
					dangerouslySetInnerHTML={{
						__html: `#block-${blockID} .ub_table-of-contents-container li{
							color: ${listIconColor};
						}
						#block-${blockID} .ub_table-of-contents-container a{
							color: ${listColor};
						}`,
					}}
				/>
			)}
		</>
	);
};

export default TableOfContents;

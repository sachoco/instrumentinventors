/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { MenuItem } from "@wordpress/components";
import { BlockSettingsMenuControls } from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";

/**
 * Generic Style Control Component
 *
 * A reusable component that adds copy/paste style options to any block's settings menu.
 *
 * @param {Object} props Component properties
 * @param {Object} props.attributes Block attributes
 * @param {Function} props.setAttributes Function to update attributes
 * @param {Object} props.clipboard Clipboard object with copy, get, has, clear methods
 * @param {string} props.blockName Display name for the block (e.g., "Image", "Icon")
 * @returns {JSX.Element} Component
 *
 * @example
 *  In your block's component
 *  import { createStyleClipboard, GenericStyleControl } from "$Inc/components/GenericStyleControl";
 *
 *  const imageClipboard = createStyleClipboard("ub_image_copied_style", [
 *    "height", "width", "border", "borderRadius"
 *  ]);
 *
 *  function MyBlockComponent({ attributes, setAttributes }) {
 *    return (
 *      <GenericStyleControl
 *        attributes={attributes}
 *        setAttributes={setAttributes}
 *        clipboard={imageClipboard}
 *        blockName="Image"
 *      />
 *    );
 *  }
 */
function GenericStyleControl({
	attributes,
	setAttributes,
	clipboard,
	blockName = "Style",
}) {
	const [canPaste, setCanPaste] = useState(clipboard.has());
	const { createSuccessNotice } = useDispatch("core/notices");

	// Update the paste button state when the component mounts or clipboard changes
	useEffect(() => {
		setCanPaste(clipboard.has());
	}, [clipboard.get()]);

	/**
	 * Handle copying style from the current block
	 */
	const handleCopyStyle = () => {
		const copied = clipboard.copy(attributes);
		if (copied) {
			// Force update the paste button state
			setCanPaste(true);
			createSuccessNotice(__(`${blockName} style copied!`, "ultimate-blocks"), {
				type: "snackbar",
				isDismissible: true,
			});
		}
	};

	/**
	 * Handle pasting style to the current block
	 */
	const handlePasteStyle = () => {
		const pasteableStyle = clipboard.get();
		if (pasteableStyle) {
			setAttributes(pasteableStyle);
			createSuccessNotice(
				__(`${blockName} style applied!`, "ultimate-blocks"),
				{
					type: "snackbar",
					isDismissible: true,
				},
			);
		}
	};

	return (
		<BlockSettingsMenuControls>
			<MenuItem onClick={handleCopyStyle}>
				{__("Copy Style", "ultimate-blocks")}
			</MenuItem>
			<MenuItem onClick={handlePasteStyle} disabled={!canPaste}>
				{__("Paste Style", "ultimate-blocks")}
			</MenuItem>
		</BlockSettingsMenuControls>
	);
}

export default GenericStyleControl;

export { createStyleClipboard } from "./clipboard";

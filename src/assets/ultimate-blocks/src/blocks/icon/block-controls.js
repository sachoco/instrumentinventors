/**
 * Wordpress Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelect } from "@wordpress/data";
import { ToolbarGroup, ToolbarDropdownMenu } from "@wordpress/components";
import {
	BlockControls,
	useBlockEditContext,
	JustifyContentControl,
} from "@wordpress/block-editor";

import CustomLinkControl from "./components/LinkControl";
import IconReplaceControl from "./components/MediaReplaceControl";
import GenericStyleControl, {
	createStyleClipboard,
} from "$Inc/components/GenericStyleControl";

function CustomBlockControls({ onReset, onLibraryOpen, onCustomInserterOpen }) {
	const { clientId } = useBlockEditContext();

	const block = useSelect((select) =>
		select("core/block-editor").getBlock(clientId),
	);
	const { updateBlockAttributes } = useDispatch("core/block-editor");
	const attributes = block?.attributes;
	const setAttributes = (newAttributes) =>
		updateBlockAttributes(clientId, newAttributes);

	// Create clipboard instance for icon styles
	const iconClipboard = createStyleClipboard("ub_icon_copied_style", [
		"size",
		"iconColor",
		"iconHoverColor",
		"iconBackground",
		"iconHoverBackground",
		"iconGradientBackground",
		"iconHoverGradientBackground",
		"iconRotation",
		"padding",
		"margin",
		"borderRadius",
		"border",
		"justification",
		"className",
	]);

	return (
		<BlockControls>
			<ToolbarGroup>
				<JustifyContentControl
					value={attributes.justification}
					allowedControls={["left", "center", "right"]}
					onChange={(next) => {
						setAttributes({ justification: next });
					}}
				/>
			</ToolbarGroup>
			<CustomLinkControl
				attributes={attributes}
				setAttributes={setAttributes}
			/>
			<GenericStyleControl
				attributes={attributes}
				setAttributes={setAttributes}
				clipboard={iconClipboard}
				blockName="Icon"
			/>
			<ToolbarGroup>
				<IconReplaceControl
					onReset={onReset}
					onLibraryOpen={onLibraryOpen}
					onCustomInserterOpen={onCustomInserterOpen}
				/>
			</ToolbarGroup>
		</BlockControls>
	);
}
export default CustomBlockControls;

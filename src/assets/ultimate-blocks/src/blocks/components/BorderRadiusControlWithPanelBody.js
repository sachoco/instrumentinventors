/**
 * WordPress Dependencies
 */
import { __ } from "@wordpress/i18n";
import {
	useBlockEditContext,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from "@wordpress/block-editor";
import { useSelect, useDispatch } from "@wordpress/data";
import { BaseControl } from "@wordpress/components";
import { splitBorderRadius } from "../utils/styling-helpers";

export default function BorderRadiusControlWithPanelBody({
	label,
	attrKey,
	values,
	onChange,
	help,
}) {
	const { clientId } = useBlockEditContext();

	const attributes = useSelect(
		(select) => {
			if (!attrKey) return {};
			return select("core/block-editor").getBlockAttributes(clientId);
		},
		[clientId, attrKey],
	);

	const { updateBlockAttributes } = useDispatch("core/block-editor");

	const resolvedValues = attrKey ? attributes?.[attrKey] : values;

	const handleChange = (newValues) => {
		const splitted = splitBorderRadius(newValues);
		if (onChange) {
			onChange(splitted);
		}
		if (attrKey) {
			updateBlockAttributes(clientId, { [attrKey]: splitted });
		}
	};

	return (
		<BaseControl className="ub-show-custom-label" label={label} help={help}>
			<BorderRadiusControl values={resolvedValues} onChange={handleChange} />
		</BaseControl>
	);
}

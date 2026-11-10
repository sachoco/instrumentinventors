import { get } from "lodash";
import {
	generateStyles,
	getBorderCSS,
	getSingleSideBorderValue,
} from "../utils/styling-helpers";

function Image(props) {
	const { attributes, imageRef } = props;

	const sizeSlug = get(attributes, "sizeSlug", "large");
	const imageSrc = get(
		attributes,
		`media.sizes.${sizeSlug}.url`,
		attributes.media?.url ?? "",
	);
	const mediaAlt = get(attributes, "alt", "");
	const aspectRatio = get(attributes, "aspectRatio", "");
	const scale = get(attributes, "scale", "none");
	const width = get(attributes, "width", "");
	const height = get(attributes, "height", "");
	const borderAttr = get(attributes, "border", {
		top: "",
		right: "",
		bottom: "",
		left: "",
	});
	const borderRadius = get(attributes, "borderRadius", {
		topLeft: "",
		topRight: "",
		bottomLeft: "",
		bottomRight: "",
	});
	const border = getBorderCSS(borderAttr);
	let styles = {
		width,
		height,
		aspectRatio,
		objectFit: scale,
		borderTopLeftRadius: borderRadius.topLeft,
		borderTopRightRadius: borderRadius.topRight,
		borderBottomLeftRadius: borderRadius.bottomLeft,
		borderBottomRightRadius: borderRadius.bottomRight,
		borderTop: getSingleSideBorderValue(border, "top"),
		borderRight: getSingleSideBorderValue(border, "right"),
		borderBottom: getSingleSideBorderValue(border, "bottom"),
		borderLeft: getSingleSideBorderValue(border, "left"),
	};
	return (
		<img
			ref={imageRef}
			style={generateStyles(styles)}
			src={imageSrc}
			alt={mediaAlt}
		/>
	);
}

export default Image;

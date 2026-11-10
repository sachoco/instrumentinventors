import { createBlock, registerBlockType } from "@wordpress/blocks";

import "./style.scss";
import "./block-styles";
import edit from "./edit";

import metadata from "./block.json";

registerBlockType(metadata, {
	icon: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M21 4C21.5523 4 22 4.44772 22 5V19C22 19.5523 21.5523 20 21 20H3C2.44772 20 2 19.5523 2 19V5C2 4.44772 2.44772 4 3 4H21ZM4.66699 5.33301C4.11482 5.33301 3.66718 5.78088 3.66699 6.33301V15.0488L7.36523 11.792C7.53454 11.6431 7.78248 11.6258 7.9707 11.75L10.7168 13.5645C10.9171 13.6968 11.1831 13.6681 11.3506 13.4961L15.8457 8.87598C16.0316 8.68492 16.3352 8.6734 16.5352 8.84961L20.333 12.1953V6.33301C20.3328 5.78088 19.8852 5.33301 19.333 5.33301H4.66699Z"
				fill="#E11B4C"
			/>
			<circle cx="10.6966" cy="8.60422" r="1.84015" fill="#E11B4C" />
		</svg>
	),
	edit,
	save: () => null,
	transforms: {
		from: [
			{
				type: "block",
				blocks: ["core/image"],
				transform: (attributes) =>
					createBlock("ub/image", {
						media: {
							id: attributes.id,
							url: attributes.url,
						},
						alt: attributes.alt,
						caption: attributes.caption,
						href: attributes.href,
						linkDestination: attributes.linkDestination,
						linkTarget: attributes.linkTarget,
						linkClass: attributes.linkClass,
						rel: attributes.rel,
						align: attributes.align,
						width: attributes.width,
						height: attributes.height,
						sizeSlug: attributes.sizeSlug,
						aspectRatio: attributes.aspectRatio,
						scale: attributes.scale,
						border: attributes?.style?.border
							? (() => {
									const border = { ...attributes.style.border };
									delete border.radius;
									return border;
								})()
							: {},
						borderRadius: attributes?.style?.border?.radius
							? typeof attributes?.style?.border?.radius === "string"
								? {
										topLeft: attributes?.style?.border?.radius,
										topRight: attributes?.style?.border?.radius,
										bottomLeft: attributes?.style?.border?.radius,
										bottomRight: attributes?.style?.border?.radius,
									}
								: attributes?.style?.border?.radius
							: {},
						margin: attributes?.style?.spacing?.margin,
					}),
			},
		],
	},
});

const { createBlock } = wp.blocks;

const transforms = {
	from: [
		{
			type: "prefix",
			prefix: "#h1",
			transform: () => createBlock("ub/advanced-heading", { level: "h1" }),
		},
		{
			type: "prefix",
			prefix: "#h2",
			transform: () => createBlock("ub/advanced-heading", { level: "h2" }),
		},
		{
			type: "prefix",
			prefix: "#h3",
			transform: () => createBlock("ub/advanced-heading", { level: "h3" }),
		},
		{
			type: "prefix",
			prefix: "#h4",
			transform: () => createBlock("ub/advanced-heading", { level: "h4" }),
		},
		{
			type: "prefix",
			prefix: "#h5",
			transform: () => createBlock("ub/advanced-heading", { level: "h5" }),
		},
		{
			type: "prefix",
			prefix: "#h6",
			transform: () => createBlock("ub/advanced-heading", { level: "h6" }),
		},
		{
			type: "block",
			blocks: ["core/heading"],
			transform: (attributes) =>
				createBlock("ub/advanced-heading", {
					content: attributes.content,
					level: `h${attributes.level}`,
					alignment: attributes.textAlign,
					...(attributes.hasOwnProperty("style") && {
						fontWeight: attributes?.style?.typography?.fontWeight,
						fontSize: attributes?.style?.typography?.fontSize,
						textTransform: attributes?.style?.typography?.textTransform,
						fontFamily: attributes?.style?.typography?.fontFamily,
						lineHeight: attributes?.style?.typography?.lineHeight,
						letterSpacing: Number(attributes?.style?.typography?.letterSpacing),
						textColor: attributes?.style?.color?.text,
						backgroundColor: attributes?.style?.color?.background,
						padding: {
							top: attributes?.style?.spacing?.padding?.top,
							right: attributes?.style?.spacing?.padding?.right,
							bottom: attributes?.style?.spacing?.padding?.bottom,
							left: attributes?.style?.spacing?.padding?.left,
						},
						margin: {
							top: attributes?.style?.spacing?.margin?.top,
							right: attributes?.style?.spacing?.margin?.right,
							bottom: attributes?.style?.spacing?.margin?.bottom,
							left: attributes?.style?.spacing?.margin?.left,
						},
					}),
				}),
		},
		{
			type: "block",
			blocks: ["core/paragraph"],
			transform: (attributes) =>
				createBlock("ub/advanced-heading", {
					content: attributes.content,
					level: `h2`,
					alignment: attributes.align,
					...(attributes.hasOwnProperty("style") && {
						fontWeight: attributes?.style?.typography?.fontWeight,
						fontSize: attributes?.style?.typography?.fontSize,
						textTransform: attributes?.style?.typography?.textTransform,
						fontFamily: attributes?.style?.typography?.fontFamily,
						lineHeight: attributes?.style?.typography?.lineHeight,
						letterSpacing: Number(attributes?.style?.typography?.letterSpacing),
						textColor: attributes?.style?.color?.text,
						backgroundColor: attributes?.style?.color?.background,
						padding: {
							top: attributes?.style?.spacing?.padding?.top,
							right: attributes?.style?.spacing?.padding?.right,
							bottom: attributes?.style?.spacing?.padding?.bottom,
							left: attributes?.style?.spacing?.padding?.left,
						},
						margin: {
							top: attributes?.style?.spacing?.margin?.top,
							right: attributes?.style?.spacing?.margin?.right,
							bottom: attributes?.style?.spacing?.margin?.bottom,
							left: attributes?.style?.spacing?.margin?.left,
						},
					}),
				}),
		},
	],
};

export default transforms;

import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import {
	BorderControl,
	ColorSettings,
	ColorSettingsWithGradient,
	SpacingControlWithToolsPanel,
	TabsPanelControl,
} from "../components";
import { __ } from "@wordpress/i18n";
import { InspectorControls, HeightControl } from "@wordpress/block-editor";
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	FormTokenField,
} from "@wordpress/components";
import { addQueryArgs } from "@wordpress/url";
import apiFetch from "@wordpress/api-fetch";

const MAX_POSTS_COLUMNS = 3;

export default function Inspector(props) {
	const [categoriesList, setCategoriesList] = useState([]);
	const [tagsList, setTagsList] = useState([]);
	const [authorsList, setAuthorsList] = useState([]);
	const [stillMounted, setStillMounted] = useState(false);
	const [orderDropdownVal, setOrderDropdownval] = useState(0);

	const {
		attributes: {
			checkPostImage,
			postImageWidth,
			preservePostImageAspectRatio,
			postImageHeight,
			checkPostAuthor,
			checkPostDate,
			checkPostExcerpt,
			checkPostLink,
			excerptLength,
			readMoreText,
			amountPosts,
			postLayout,
			columns,
			categories, //old stringified list
			excludedCategories,
			categoryArray,
			orderBy,
			order,
			checkPostTitle,
			postTitleTag,
			authorArray,
			tagArray,
			isEqualHeight,
			rowGap,
			columnGap,
		},
		setAttributes,
		posts,
		customPostTypeSelector,
		paginationPanel,
		taxonomySettings,
		displayTaxonomyControl,
		loadMoreBorderRadius,
		proNormalStateColors,
		proHoverStateColors,
		proManualSelectionPanel,
	} = props;

	useEffect(() => {
		setStillMounted(true);

		return () => setStillMounted(false);
	}, []);

	useEffect(() => {
		if (stillMounted) {
			apiFetch({ path: addQueryArgs("/wp/v2/categories", { per_page: -1 }) })
				.then((categoriesList) => {
					setCategoriesList(categoriesList);
				})
				.catch(() => {
					if (stillMounted) {
						setCategoriesList([]);
					}
				});

			apiFetch({ path: addQueryArgs("/wp/v2/tags", { per_page: -1 }) })
				.then((tagsList) => {
					setTagsList(tagsList);
				})
				.catch(() => {
					if (stillMounted) {
						setTagsList([]);
					}
				});

			apiFetch({
				path: addQueryArgs("/wp/v2/users", { per_page: -1, who: "authors" }),
			})
				.then((authorsList) => {
					setAuthorsList(authorsList);
				})
				.catch(() => {
					if (stillMounted) {
						setAuthorsList([]);
					}
				});
		}
	}, [stillMounted]);

	useEffect(() => {
		//initialize orderDropdownVal
		if (orderBy === "title") {
			setOrderDropdownval(order === "asc" ? 2 : 3);
		}
		if (orderBy === "date") {
			setOrderDropdownval(order === "desc" ? 0 : 1);
		}
	}, []);

	// Helper functions to convert between IDs and names
	const getAuthorNames = (authorIds) => {
		return authorIds
			.map((id) => authorsList.find((author) => author.id === id)?.name)
			.filter(Boolean);
	};

	const getAuthorIds = (authorNames) => {
		return authorNames
			.map((name) => authorsList.find((author) => author.name === name)?.id)
			.filter(Boolean);
	};

	const getTagNames = (tagIds) => {
		return tagIds
			.map((id) => tagsList.find((tag) => tag.id === id)?.name)
			.filter(Boolean);
	};

	const getTagIds = (tagNames) => {
		return tagNames
			.map((name) => tagsList.find((tag) => tag.name === name)?.id)
			.filter(Boolean);
	};

	const getCategoryNames = (categoryObjects) => {
		// categoryArray stores full objects, not just IDs
		return categoryObjects.map((cat) => cat.name);
	};

	const getCategoryObjects = (categoryNames) => {
		return categoryNames
			.map((name) => categoriesList.find((cat) => cat.name === name))
			.filter(Boolean);
	};

	const hasPosts = Array.isArray(posts) && posts.length;

	// Post type options
	const postTypeOptions = [
		{ value: "grid", label: __("Grid", "ultimate-blocks") },
		{ value: "list", label: __("List", "ultimate-blocks") },
	];

	const categorySuggestions = categoriesList.reduce(
		(accumulator, category) => ({
			...accumulator,
			[category.name]: category,
		}),
		{},
	);

	const normalStateColors = (
		<>
			<ColorSettings
				attrKey="postTitleColor"
				label={__("Title Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="authorColor"
				label={__("Author Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="dateColor"
				label={__("Date Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="excerptColor"
				label={__("Excerpt Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="linkColor"
				label={__("Link Color", "ultimate-blocks")}
			/>
			<ColorSettingsWithGradient
				attrBackgroundKey="linkBackgroundColor"
				attrGradientKey="linkBackgroundGradient"
				label={__("Link Background", "ultimate-blocks")}
			/>
			<ColorSettingsWithGradient
				attrBackgroundKey="postBackgroundColor"
				attrGradientKey="postBackgroundGradient"
				label={__("Post Background", "ultimate-blocks")}
			/>
			{proNormalStateColors && proNormalStateColors}
		</>
	);

	const hoverStateColors = (
		<>
			<ColorSettings
				attrKey="postTitleColorHover"
				label={__("Title Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="authorColorHover"
				label={__("Author Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="dateColorHover"
				label={__("Date Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="excerptColorHover"
				label={__("Excerpt Color", "ultimate-blocks")}
			/>
			<ColorSettings
				attrKey="linkColorHover"
				label={__("Link Color", "ultimate-blocks")}
			/>
			<ColorSettingsWithGradient
				attrBackgroundKey="linkBackgroundColorHover"
				attrGradientKey="linkBackgroundGradientHover"
				label={__("Link Background", "ultimate-blocks")}
			/>
			<ColorSettingsWithGradient
				attrBackgroundKey="postBackgroundColorHover"
				attrGradientKey="postBackgroundGradientHover"
				label={__("Post Background", "ultimate-blocks")}
			/>
			{proHoverStateColors && proHoverStateColors}
		</>
	);

	return (
		<>
			<InspectorControls group="settings">
				<PanelBody title={__("General", "ultimate-blocks")}>
					{Array.isArray(posts) && posts.length > 0 && (
						<>
							<SelectControl
								__next40pxDefaultSize
								label={__("Grid Type", "ultimate-blocks")}
								options={postTypeOptions}
								value={postLayout}
								onChange={(postLayout) => setAttributes({ postLayout })}
							/>
							{"grid" === postLayout && (
								<RangeControl
									__next40pxDefaultSize
									label={__("Columns", "ultimate-blocks")}
									value={columns}
									onChange={(columns) => setAttributes({ columns })}
									min={1}
									max={
										!hasPosts
											? MAX_POSTS_COLUMNS
											: Math.min(MAX_POSTS_COLUMNS, posts.length)
									}
								/>
							)}
						</>
					)}
					<ToggleControl
						label={__("Equal Height", "ultimate-blocks-pro")}
						checked={isEqualHeight}
						onChange={() => setAttributes({ isEqualHeight: !isEqualHeight })}
					/>
					<HeightControl
						label={__("Row Gap", "ultimate-blocks-pro")}
						value={rowGap}
						onChange={(newValue) => setAttributes({ rowGap: newValue })}
					/>
					<HeightControl
						label={__("Column Gap", "ultimate-blocks-pro")}
						value={columnGap}
						onChange={(newValue) => setAttributes({ columnGap: newValue })}
					/>
				</PanelBody>
				<PanelBody title={__("Query", "ultimate-blocks")} initialOpen={false}>
					{customPostTypeSelector && customPostTypeSelector}

					<FormTokenField
						__next40pxDefaultSize
						label={__("Authors", "ultimate-blocks")}
						value={getAuthorNames(authorArray)}
						suggestions={authorsList.map((author) => author.name)}
						onChange={(authorNames) => {
							const authorIds = getAuthorIds(authorNames);
							setAttributes({ authorArray: authorIds });
						}}
						__experimentalShowHowTo={false}
					/>

					<FormTokenField
						__next40pxDefaultSize
						label={__("Tags", "ultimate-blocks")}
						value={getTagNames(tagArray)}
						suggestions={tagsList.map((tag) => tag.name)}
						onChange={(tagNames) => {
							const tagIds = getTagIds(tagNames);
							setAttributes({ tagArray: tagIds });
						}}
						__experimentalShowHowTo={false}
					/>

					<br />
					<SelectControl
						__next40pxDefaultSize
						label={__("Order By", "ultimate-blocks")}
						options={[
							__("Newest to oldest"),
							__("Oldest to newest"),
							__("A → Z"),
							__("Z → A"),
						].map((a, i) => ({ value: i, label: a }))}
						value={orderDropdownVal}
						onChange={(newDropVal) => {
							setOrderDropdownval(newDropVal);
							setAttributes({
								order: newDropVal % 3 === 0 ? "desc" : "asc",
								orderBy: newDropVal > 1 ? "title" : "date",
							});
						}}
					/>

					<FormTokenField
						__next40pxDefaultSize
						label={__("Included Categories", "ultimate-blocks")}
						value={getCategoryNames(categoryArray)}
						suggestions={categoriesList
							.filter(
								(cur) =>
									!excludedCategories.some((other) => cur.id === other.id) &&
									!categoryArray.some((other) => cur.id === other.id),
							)
							.map((cat) => cat.name)}
						onChange={(categoryNames) => {
							const categoryObjects = getCategoryObjects(categoryNames);
							setAttributes({ categoryArray: categoryObjects });
						}}
						__experimentalShowHowTo={false}
					/>

					<FormTokenField
						__next40pxDefaultSize
						label={__("Excluded Categories", "ultimate-blocks")}
						value={getCategoryNames(excludedCategories)}
						suggestions={categoriesList
							.filter(
								(cur) =>
									!excludedCategories.some((other) => cur.id === other.id) &&
									!categoryArray.some((other) => cur.id === other.id),
							)
							.map((cat) => cat.name)}
						onChange={(categoryNames) => {
							const categoryObjects = getCategoryObjects(categoryNames);
							setAttributes({ excludedCategories: categoryObjects });
						}}
						__experimentalShowHowTo={false}
					/>

					<RangeControl
						__next40pxDefaultSize
						label={__("Number of items")}
						value={amountPosts}
						onChange={(amountPosts) => setAttributes({ amountPosts })}
						min={1}
						max={100}
					/>
					{taxonomySettings && taxonomySettings}
					{proManualSelectionPanel && proManualSelectionPanel}
				</PanelBody>
				{paginationPanel && paginationPanel}
				{Array.isArray(posts) && posts.length > 0 && (
					<PanelBody
						title={__("Display", "ultimate-blocks")}
						initialOpen={false}
					>
						<ToggleControl
							label={__("Display Featured Image", "ultimate-blocks")}
							checked={checkPostImage}
							onChange={(checkPostImage) => setAttributes({ checkPostImage })}
						/>
						{checkPostImage && (
							<>
								<TextControl
									__next40pxDefaultSize
									label={__("Post Image Width", "ultimate-blocks")}
									type="number"
									min={1}
									value={postImageWidth}
									onChange={(val) =>
										setAttributes({ postImageWidth: Number(val) })
									}
								/>
								<ToggleControl
									label={__("Preserve Aspect Ratio", "ultimate-blocks")}
									checked={preservePostImageAspectRatio}
									onChange={(preservePostImageAspectRatio) =>
										setAttributes({ preservePostImageAspectRatio })
									}
								/>
								{!preservePostImageAspectRatio && (
									<TextControl
										__next40pxDefaultSize
										label={__("Post Image Height", "ultimate-blocks")}
										type="number"
										min={1}
										value={postImageHeight}
										onChange={(val) =>
											setAttributes({ postImageHeight: Number(val) })
										}
									/>
								)}
							</>
						)}
						<ToggleControl
							label={__("Display Author", "ultimate-blocks")}
							checked={checkPostAuthor}
							onChange={(checkPostAuthor) => setAttributes({ checkPostAuthor })}
						/>
						<ToggleControl
							label={__("Display Date", "ultimate-blocks")}
							checked={checkPostDate}
							onChange={(checkPostDate) => setAttributes({ checkPostDate })}
						/>
						<ToggleControl
							label={__("Display Excerpt", "ultimate-blocks")}
							checked={checkPostExcerpt}
							onChange={(checkPostExcerpt) =>
								setAttributes({ checkPostExcerpt })
							}
						/>
						{checkPostExcerpt && (
							<RangeControl
								__next40pxDefaultSize
								label={__("Excerpt Length", "ultimate-blocks")}
								value={excerptLength}
								onChange={(value) => setAttributes({ excerptLength: value })}
								min={0}
								max={200}
							/>
						)}
						<ToggleControl
							label={__("Display Continue Reading Link", "ultimate-blocks")}
							checked={checkPostLink}
							onChange={(checkPostLink) => setAttributes({ checkPostLink })}
						/>
						{checkPostLink && (
							<TextControl
								__next40pxDefaultSize
								label={__("Customize Continue Reading Text", "ultimate-blocks")}
								type="text"
								value={readMoreText}
								onChange={(value) => setAttributes({ readMoreText: value })}
							/>
						)}
						<ToggleControl
							label={__("Display Title", "ultimate-blocks")}
							checked={checkPostTitle}
							onChange={(checkPostTitle) => setAttributes({ checkPostTitle })}
						/>
						{checkPostTitle && (
							<SelectControl
								__next40pxDefaultSize
								label={__("Title tag", "ultimate-blocks")}
								options={["h2", "h3", "h4"].map((a) => ({
									value: a,
									label: __(a),
								}))}
								value={postTitleTag}
								onChange={(postTitleTag) => setAttributes({ postTitleTag })}
							/>
						)}
						{displayTaxonomyControl && displayTaxonomyControl}
					</PanelBody>
				)}
			</InspectorControls>
			<InspectorControls group="color">
				<TabsPanelControl
					tabs={[
						{
							name: "normalState",
							title: __("Normal", "ultimate-blocks"),
							component: normalStateColors,
						},
						{
							name: "hoverState",
							title: __("Hover", "ultimate-blocks"),
							component: hoverStateColors,
						},
					]}
				/>
			</InspectorControls>
			<InspectorControls group="dimensions">
				<SpacingControlWithToolsPanel
					showByDefault
					attrKey="padding"
					label={__("Padding", "ultimate-blocks")}
				/>
				<SpacingControlWithToolsPanel
					minimumCustomValue={-Infinity}
					showByDefault
					attrKey="margin"
					label={__("Margin", "ultimate-blocks")}
				/>
				<SpacingControlWithToolsPanel
					showByDefault
					attrKey="contentPadding"
					label={__("Content Padding", "ultimate-blocks")}
				/>
				<SpacingControlWithToolsPanel
					showByDefault
					attrKey="linkPadding"
					label={__("Link Padding", "ultimate-blocks")}
				/>
				<SpacingControlWithToolsPanel
					showByDefault
					attrKey="postPadding"
					label={__("Post Padding", "ultimate-blocks")}
				/>
			</InspectorControls>
			<InspectorControls group="border">
				<BorderControl
					isShowBorder={false}
					showDefaultBorderRadius
					attrBorderRadiusKey="imageBorderRadius"
					borderRadiusLabel={__("Image Border Radius", "ultimate-blocks")}
				/>
				<BorderControl
					isShowBorder={false}
					showDefaultBorderRadius
					attrBorderRadiusKey="postBorderRadius"
					borderRadiusLabel={__("Post Border Radius", "ultimate-blocks")}
				/>
				<BorderControl
					isShowBorder={false}
					showDefaultBorderRadius
					attrBorderRadiusKey="linkBorderRadius"
					borderRadiusLabel={__("Link Border Radius", "ultimate-blocks")}
				/>
				{loadMoreBorderRadius && loadMoreBorderRadius}
			</InspectorControls>
		</>
	);
}

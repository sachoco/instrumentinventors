// eslint-disable-next-line no-unused-vars
import React from 'react';

export const WIZARD_STEPS = [
	{ id: 1, label: 'Blocks' },
	{ id: 2, label: 'Plugins' },
	{ id: 3, label: 'Newsletter' },
	{ id: 4, label: 'Upgrade' },
	{ id: 5, label: 'Done' },
];

export const BLOCK_CATEGORIES = [
	{
		id: 'content',
		label: 'Content',
		blocks: [
			{ name: 'ub/content-toggle-block', label: 'Content Toggle' },
			{ name: 'ub/tabbed-content-block', label: 'Tabbed Content' },
			{ name: 'ub/expand', label: 'Expand' },
			{ name: 'ub/styled-box', label: 'Styled Box' },
			{ name: 'ub/styled-list', label: 'Styled List' },
			{ name: 'ub/advanced-heading', label: 'Heading' },
			{ name: 'ub/divider', label: 'Divider' },
		],
	},
	{
		id: 'conversion',
		label: 'Conversion & Engagement',
		blocks: [
			{ name: 'ub/call-to-action-block', label: 'Call to Action' },
			{ name: 'ub/testimonial', label: 'Testimonial' },
			{ name: 'ub/star-rating-block', label: 'Star Rating' },
			{ name: 'ub/review', label: 'Review' },
			{ name: 'ub/countdown', label: 'Countdown' },
			{ name: 'ub/counter', label: 'Counter' },
			{ name: 'ub/progress-bar', label: 'Progress Bar' },
			{ name: 'ub/button', label: 'Buttons' },
		],
	},
	{
		id: 'media',
		label: 'Media',
		blocks: [
			{ name: 'ub/image-slider', label: 'Image Slider' },
			{ name: 'ub/image', label: 'Image' },
			{ name: 'ub/advanced-video', label: 'Video' },
		],
	},
	{
		id: 'seo',
		label: 'SEO & Discovery',
		blocks: [
			{ name: 'ub/table-of-contents-block', label: 'Table of Contents' },
			{ name: 'ub/how-to', label: 'How To' },
			{ name: 'ub/post-grid', label: 'Post Grid' },
			{ name: 'ub/content-filter-block', label: 'Content Filter' },
		],
	},
	{
		id: 'social',
		label: 'Social',
		blocks: [
			{ name: 'ub/social-share', label: 'Social Share' },
			{ name: 'ub/click-to-tweet', label: 'Post on X' },
			{ name: 'ub/icon', label: 'Icon' },
		],
	},
];

export const PRO_BLOCKS = [
	{ name: 'ub-pro/coupon', label: 'Coupon' },
	{ name: 'ub-pro/timeline', label: 'Timeline' },
	{ name: 'ub-pro/image-hotspots', label: 'Image Hotspots' },
];

export const RECOMMENDED_PLUGINS = [
	{
		slug: 'tableberg',
		name: 'Tableberg',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Native Gutenberg tables with cell-level styling, responsive controls, and no shortcodes.',
		defaultSelected: true,
	},
	{
		slug: 'galleryberg-gallery-block',
		name: 'Galleryberg',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Tiles, masonry, justified, and square layouts with built-in lightbox and hover effects.',
		defaultSelected: true,
	},
	{
		slug: 'sliderberg',
		name: 'Sliderberg',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Content carousels for images, testimonials, and rich layouts. Lightweight, no jQuery.',
		defaultSelected: true,
	},
];

export const OPTIONAL_PLUGINS = [
	{
		slug: 'convertforce',
		name: 'ConvertForce',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Gutenberg-native notification bars, lightbox popups, and slide-ins. No extra builder.',
		defaultSelected: false,
	},
	{
		slug: 'opinioncamp',
		name: 'OpinionCamp',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Gutenberg-native poll plugin for collecting votes and feedback. No shortcodes, no external accounts.',
		defaultSelected: false,
	},
	{
		slug: 'assistcamp',
		name: 'AssistCamp',
		badge: 'Free',
		badgeClass: 'ub-wiz-badge--free',
		description:
			'Gutenberg-native documentation and knowledge base builder with 10 custom blocks and live search.',
		defaultSelected: false,
	},
];

export const BUNDLE_PLUGINS = [
	{
		name: 'Ultimate Blocks',
		tagline: 'Unlock 25+ advanced Gutenberg blocks.',
		color: '#E11B4C',
		logo: 'https://ultimateblocks.com/wp-content/uploads/2025/11/Ultimate-Blocks-.png',
	},
	{
		name: 'Tableberg',
		tagline: 'Create beautiful, responsive tables in seconds.',
		color: '#6B21A8',
		logo: 'https://ultimateblocks.com/wp-content/uploads/2025/11/Tableberg.png',
	},
	{
		name: 'Galleryberg',
		tagline: 'Build stunning image galleries with lightbox.',
		color: '#B91C1C',
		logo: 'https://ultimateblocks.com/wp-content/uploads/2025/11/Galleryberg.png',
	},
	{
		name: 'Sliderberg',
		tagline: 'Slide anything. Add image, video & text to sliders.',
		color: '#0369A1',
		logo: 'https://ultimateblocks.com/wp-content/uploads/2025/11/Sliderberg.png',
	},
];

export const LIFETIME_BENEFITS = [
	'Unlimited Sites',
	'Lifetime Priority Support',
	'Lifetime Updates',
	'One-time Payment',
];

export const DONE_CARDS = [
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					x="3"
					y="3"
					width="18"
					height="18"
					rx="2"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					d="M8 12h8M12 8v8"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: 'Add your first block',
		description:
			'Open any post or page and search for an Ultimate Blocks block inside the editor.',
		linkLabel: 'Open block editor →',
		linkHref: window.ubSetupWizardData
			? window.ubSetupWizardData.newPostUrl || '/wp-admin/post-new.php'
			: '/wp-admin/post-new.php',
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4 6h16M4 10h16M4 14h10"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: 'Browse the docs',
		description:
			'Step-by-step guides and video walkthroughs for every block and setting.',
		linkLabel: 'View documentation →',
		linkHref: 'https://ultimateblocks.com/docs/',
	},
	{
		icon: (
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					cx="12"
					cy="12"
					r="9"
					stroke="currentColor"
					strokeWidth="1.5"
				/>
				<path
					d="M12 8v4l3 3"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</svg>
		),
		title: 'Get support',
		description:
			"Something not working? Our team responds within 24 hours on business days.",
		linkLabel: 'Contact support →',
		linkHref: 'https://ultimateblocks.com/support/',
	},
];

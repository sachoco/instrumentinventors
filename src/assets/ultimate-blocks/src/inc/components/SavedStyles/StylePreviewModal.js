import React, { useEffect, useState } from 'react';
import { Spinner } from '@wordpress/components';
import { BlockPreview } from '@wordpress/block-editor';
import { PortalBase } from '$Library/ub-common/Components';
import { connectWithStore } from '$Library/ub-common/Inc';
import SavedStylesManager from '$Manager/SavedStylesManager';
import { decidePreviewBackground } from '$BlockStores/savedStyles/actions';

/**
 * Style preview modal component.
 *
 * @param {Object}   props                     component properties
 * @param {Object[]} props.previewBlocks       block objects to preview, rendered via <BlockPreview>
 * @param {string}   props.targetQuery         query for portal parent
 * @param {Object}   [props.anchorRef]         ref to the hovered list item to align the preview with; falls back to the top of the scrolled container when absent
 * @param {string}   props.styleTitle          style title
 * @param {Function} props.pageBackgroundColor editor page background color function, will be supplied via HOC
 * @class
 */
function StylePreviewModal({
	styleTitle,
	previewBlocks,
	targetQuery,
	anchorRef,
	pageBackgroundColor,
}) {
	const [modalPosition, setModalPosition] = useState({});

	const defaultTopMargin = 16;

	/**
	 * useEffect hook
	 */
	useEffect(() => {
		setModalPosition(calculatePosition());
	}, []);

	/**
	 * Calculate preview modal position, aligned with the hovered list item
	 * when available (rather than always sitting near the top of the panel).
	 *
	 * @return {Object} position data
	 */
	function calculatePosition() {
		const position = {};
		const targetContainer = document.querySelector(targetQuery);

		if (!targetContainer) {
			return position;
		}

		const anchorElement = anchorRef?.current;

		if (anchorElement) {
			const containerRect = targetContainer.getBoundingClientRect();
			const anchorRect = anchorElement.getBoundingClientRect();
			const relativeTop =
				anchorRect.top -
				containerRect.top +
				targetContainer.scrollTop;

			position.top = `${relativeTop}px`;
		} else {
			position.top = `${
				targetContainer.scrollTop + defaultTopMargin
			}px`;
		}

		return position;
	}

	return (
		<PortalBase targetQuery={targetQuery}>
			<div style={modalPosition} className={'ub-pro-style-preview-modal'}>
				<div className={'preview-container'}>
					<div
						className={'page-simulation'}
						style={{ backgroundColor: pageBackgroundColor() }}
					>
						{previewBlocks ? (
							<div className={'block-preview-content'}>
								{/* The default viewportWidth (1200, a desktop
								    viewport) shrinks content to a sliver inside
								    this small ~286px-wide box. Matching it exactly
								    to the box width made multi-item rows (e.g.
								    Social Share's icons) wrap awkwardly, since
								    they didn't have room to lay out in one line.
								    600 approximates a typical content column: wide
								    enough for content to lay out normally, while
								    still scaling down to a legible size for the
								    thumbnail. */}
								<BlockPreview blocks={previewBlocks} viewportWidth={600} />
							</div>
						) : (
							<Spinner />
						)}
					</div>
				</div>
				<div className={'title-container'}>{styleTitle}</div>
			</div>
		</PortalBase>
	);
}

// store action mapping
const actionMapping = (dispatch, select) => {
	return {
		pageBackgroundColor: decidePreviewBackground(dispatch, select),
	};
};

/**
 * @module StylePreviewModal
 */
export default connectWithStore(
	SavedStylesManager.storeNamespace,
	null,
	actionMapping
)(StylePreviewModal);

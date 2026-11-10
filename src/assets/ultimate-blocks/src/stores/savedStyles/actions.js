import apiFetch from '@wordpress/api-fetch';
import { createBlock } from '@wordpress/blocks';
import { v4 as uuidV4 } from 'uuid';
import types from '$BlockStores/savedStyles/types';
import { getRenderedPreview } from '$BlockStores/savedStyles/selectors';

/**
 * Store actions.
 *
 * @type {Object}
 */
const actions = {
	/**
	 * Set active item id.
	 *
	 * @param {string|null} id style id
	 */
	setActiveItemId(id) {
		return {
			type: types.SET_ACTIVE_ITEM_ID,
			id,
		};
	},
	/**
	 * Set selected item id.
	 *
	 * @param {string|null} id style id
	 */
	setSelectedItemId(id) {
		return {
			type: types.SET_SELECTED_ITEM_ID,
			id,
		};
	},
	/**
	 * Set advanced controls' visibility.
	 *
	 * @param {boolean} status status
	 */
	setAdvancedControlsVisibility(status) {
		return {
			type: types.SET_ADVANCED_CONTROLS_VISIBILITY,
			status,
		};
	},
	/**
	 * Set status for showing previews.
	 *
	 * @param {boolean} status status
	 */
	setShowPreviewStatus(status) {
		return {
			type: types.SET_SHOW_PREVIEWS,
			status,
		};
	},
	/**
	 * Set callback function for attribute render preparation.
	 *
	 * @param {Function} callback callback function to assign
	 * @return {Object} action object
	 */
	setAttributeRenderPreparation(callback) {
		return {
			type: types.SET_ATTRIBUTE_RENDER_PREPARATION,
			callback,
		};
	},
	/**
	 * Set callback function for element render preparation.
	 *
	 * @param {Function} callback callback function to assign
	 * @return {Object} action object
	 */
	setElementRenderPreparation(callback) {
		return {
			type: types.SET_ELEMENT_RENDER_PREPARATION,
			callback,
		};
	},
	/**
	 * Set store as busy.
	 *
	 * @return {Object} action object
	 */
	setSavedStylesBusy() {
		return {
			type: types.SET_BUSY_STATE,
			status: true,
		};
	},
	/**
	 * Set store as idle.
	 *
	 * @return {Object} action object
	 */
	setSavedStylesIdle() {
		return {
			type: types.SET_BUSY_STATE,
			status: false,
		};
	},
	/**
	 * Save and update block styles.
	 *
	 * @param {Object} styles styles
	 *
	 * @return {Object} action object
	 */
	saveAllBlockStyles(styles) {
		return {
			type: types.SAVE_ALL_BLOCK_STYLES,
			styles,
		};
	},
	/**
	 * Update a style.
	 *
	 * @param {string} blockType      type of block
	 * @param {string} styleId        style id
	 * @param {Object} newStyleObject new style object
	 * @return {Object} action object
	 */
	updateStyle(blockType, styleId, newStyleObject) {
		return {
			type: types.UPDATE_STYLE,
			blockType,
			styleId,
			styleObject: newStyleObject,
		};
	},
	/**
	 * Set a style default for a block.
	 *
	 * @param {string} blockType type of block
	 * @param {string} styleId   style id
	 * @return {Object} action object
	 */
	setStyleAsDefault(blockType, styleId) {
		return {
			type: types.SET_STYLE_DEFAULT,
			blockType,
			styleId,
		};
	},
	/**
	 * Cache a block preview for later use.
	 *
	 * @param {string}          blockType     block type
	 * @param {string}          styleId       style id
	 * @param {string|Object[]} previewOutput either an html string (REST render path) or an array of block objects (block-creation render path, for <BlockPreview>)
	 * @return {Object} action object
	 */
	cacheBlockPreview(blockType, styleId, previewOutput) {
		return {
			type: types.CACHE_BLOCK_PREVIEW,
			blockType,
			styleId,
			html: previewOutput,
		};
	},
	/**
	 * Update style title.
	 *
	 * @param {string} styleId   style id
	 * @param {string} blockType block type
	 * @param {string} newTitle  new style title
	 * @return {Object} action object
	 */
	updateStyleTitle(styleId, blockType, newTitle) {
		return {
			type: types.UPDATE_STYLE_TITLE,
			id: styleId,
			blockType,
			title: newTitle,
		};
	},
	/**
	 * Set value of editor page background value to store data.
	 *
	 * @param {string} pageColor editor page color
	 * @return {Object} action object
	 */
	setPageBackgroundColor(pageColor) {
		return {
			type: types.SET_PAGE_BACKGROUND_COLOR,
			pageColor,
		};
	},
	/**
	 * Set block type for preview render.
	 *
	 * @param {string} blockType block type
	 */
	setRenderPreviewBlockType(blockType) {
		return {
			type: types.SET_PREVIEW_BLOCK_TYPE,
			blockType,
		};
	},
	/**
	 * Set blocks ids available on editor load
	 *
	 * @param {Array} [blockIds=[]] block ids
	 */
	setStartupBlockIds(blockIds = []) {
		return {
			type: types.SET_STARTUP_BLOCK_IDS,
			blockIds,
		};
	},
	/**
	 * Set preview render status for current block.
	 *
	 * @param {boolean} [status=true] status
	 */
	setPreviewsEnabledStatus(status = true) {
		return {
			type: types.SET_PREVIEW_ENABLED_STATUS,
			status,
		};
	},
	/**
	 * Set current block type override.
	 *
	 * @param {string} blockType block type
	 */
	setCurrentBlockTypeOverride(blockType) {
		return {
			type: types.SET_CURRENT_BLOCK_TYPE_OVERRIDE,
			blockType,
		};
	},
};

/**
 * Start an operation that will set the app in busy state.
 *
 * @param {Object}   dispatch                    action dispatch object
 * @param {Function} dispatch.setSavedStylesBusy setSavedStylesBusy function
 * @param {Function} dispatch.setSavedStylesIdle setSavedStylesIdle function
 *
 * @return {Promise} promise
 */
export const startBusyOperation = ({
	setSavedStylesBusy,
	setSavedStylesIdle,
}) => {
	return new Promise((res) => {
		setSavedStylesBusy();
		return res(setSavedStylesIdle);
	});
};

/**
 * Save all default styles to server.
 *
 * @param {Object}   dispatch                action dispatch object.
 * @param {Object}   select                  store select object
 * @param {Function} select.getDefaultStyles getDefaultStyles function
 * @param {Function} select.getOptions       getOptions function
 * @return {Promise} promise
 */
const saveDefaultStylesToServer = (
	dispatch,
	{ getDefaultStyles, getOptions }
) => {
	return startBusyOperation(dispatch).then((setIdle) => {
		const requestForm = new FormData();
		requestForm.append(
			'defaultStyles',
			btoa(JSON.stringify(getDefaultStyles()))
		);

		return apiFetch({
			path: getOptions('restPath'),
			method: 'POST',
			body: requestForm,
		})
			.then(() => {
				// do nothing
			})
			.finally(() => {
				setIdle();
			});
	});
};

/**
 * Save styles to server.
 *
 * @param {Object}   dispatch                       namespaced action dispatch object
 * @param {Object}   select                         store selector object
 * @param {Function} select.getComponentSavedStyles getComponentSavedStyles selector
 * @param {Function} select.getOptions              getOptions selector
 * @return {Promise} promise
 */
const saveStylesToServer = (
	dispatch,
	{ getComponentSavedStyles, getOptions }
) => {
	return startBusyOperation(dispatch).then((setIdle) => {
		const encodedStyles = btoa(JSON.stringify(getComponentSavedStyles()));
		const restPath = getOptions('restPath');

		const restForm = new FormData();
		restForm.append('styles', encodedStyles);

		return apiFetch({ path: restPath, method: 'POST', body: restForm })
			.then(() => {
				// do nothing
			})
			.finally(() => {
				setIdle();
			});
	});
};

/**
 * Delete a static style.
 *
 * @param {Object}   dispatch            store dispatch object
 * @param {Object}   select              store select object
 * @param {Function} select.getOptions   get store options
 * @param {Function} select.getBlockType get type of currently active block
 * @return {Function} action function
 */
const deleteStaticStyle =
	(dispatch, { getOptions, getBlockType }) =>
	(styleId) => {
		const staticDeleteRestRoute = getOptions('staticDeleteRestRoute');
		const staticDeleteNonce = getOptions('staticWriteNonce');
		const blockType = getBlockType();
		const formData = new FormData();

		formData.append('styleId', styleId);
		formData.append('blockType', blockType);
		formData.append('nonce', staticDeleteNonce);

		return startBusyOperation(dispatch).then((setIdle) => {
			return apiFetch({
				path: staticDeleteRestRoute,
				method: 'POST',
				body: formData,
			})
				.then(() => {
					// do nothing
				})
				.finally(() => {
					setIdle();
				});
		});
	};

/**
 * Save style as static
 *
 * @param {Object}   dispatch            store dispatch object
 * @param {Object}   select              store select object
 * @param {Function} select.getOptions   get store options
 * @param {Function} select.getBlockType get current block type
 * @return {Function} action function
 */
const saveStaticStyle =
	(dispatch, { getOptions, getBlockType }) =>
	(styleObject) => {
		const staticRestPath = getOptions('staticWriteRestRoute');
		const staticNonce = getOptions('staticWriteNonce');

		if (staticRestPath && staticNonce) {
			const [styleId] = Object.keys(styleObject).filter((k) =>
				Object.prototype.hasOwnProperty.call(styleObject, k)
			);

			const { title, styles } = styleObject[styleId];

			return startBusyOperation(dispatch).then((setIdle) => {
				const formData = new FormData();
				const encodedStyles = btoa(JSON.stringify(styles));

				formData.append('nonce', staticNonce);
				formData.append('styleId', styleId);
				formData.append('title', title);
				formData.append('styles', encodedStyles);
				formData.append('blockType', getBlockType());

				return apiFetch({
					path: staticRestPath,
					method: 'POST',
					body: formData,
				})
					.then()
					.finally(() => {
						setIdle();
					});
			});
		}
	};

/**
 * Prepare style object.
 *
 * @param {string}   styleTitle   title
 * @param {Object}   styleContent content
 * @param {Function} callback     function callback
 * @param {boolean}  isStatic     style is static
 *
 * @return {Object} style object
 */
const prepareStyleObject = (
	styleTitle,
	styleContent,
	callback = () => {},
	isStatic = false
) => {
	let styleId = uuidV4();

	if (isStatic) {
		styleId = `ub-dev-${styleId}`;
	}

	callback(styleId);

	return {
		[styleId]: {
			title: styleTitle,
			styles: styleContent,
		},
	};
};

/**
 * Check if supplied id belongs to a static style.
 *
 * @param {string} styleId style id
 */
function isStaticStyle(styleId) {
	return styleId.startsWith('ub-dev');
}

/**
 * Add a new style to a block.
 *
 * @param {Object} dispatch store action dispatch object
 * @param {Object} select   store selector object
 * @return {Function} middleware applied function to use inside centralized data store
 */
const addBlockStyle = (dispatch, select) => (newStyleObject) => {
	const { getComponentSavedStyles, getBlockType } = select;

	const blockType = getBlockType();
	const componentSavedStyles = getComponentSavedStyles(blockType);

	return setBlockStyles(
		dispatch,
		select
	)({ ...componentSavedStyles, ...newStyleObject });
};

/**
 * Set new styles to a block.
 * This function will replace all the available styles of a block with supplied new ones.
 *
 * @param {Object} dispatch store action dispatch object
 * @param {Object} select   store selector object
 * @return {Function} middleware applied function to use inside centralized data store
 */
const setBlockStyles = (dispatch, select) => (newStyles) => {
	const { saveAllBlockStyles } = dispatch;
	const { getComponentSavedStyles, getBlockType } = select;

	const blockType = getBlockType();
	const allStyles = getComponentSavedStyles();

	allStyles[blockType] = newStyles;

	saveAllBlockStyles(allStyles);
};

/**
 * Save supplied style both to frontend and server.
 *
 * @param {Object} dispatch action dispatch object
 * @param {Object} select   store selector object
 * @return {Function} middleware applied function to use inside centralized data store
 */
export const saveStyle =
	(dispatch, select) =>
	(styleName, styleObject, isStatic = false) => {
		let newStyleId = null;
		const newStyleObject = prepareStyleObject(
			styleName,
			styleObject,
			(id) => {
				newStyleId = id;
			},
			isStatic
		);

		addBlockStyle(dispatch, select)(newStyleObject);

		if (isStatic) {
			return saveStaticStyle(
				dispatch,
				select
			)(newStyleObject).then(() => newStyleId);
		}

		// save new styles to server to keep them persistent
		return saveStylesToServer(dispatch, select).then(() => newStyleId);
	};

/**
 * Get style object of a saved style from supplied arguments.
 *
 * @param {Object}   dispatch                       store action dispatch object
 * @param {Object}   select                         store selector object`
 * @param {Function} select.getComponentStyleName   get component style name
 * @param {Function} select.getComponentStyleObject get component style content
 * @param {Function} select.getBlockType            get current active block type
 * @return {Function} middleware applied function to use inside centralized data store
 */
const getStyleObject =
	(
		dispatch,
		{ getComponentStyleName, getComponentStyleObject, getBlockType }
	) =>
	(styleId) => {
		const styleContent = getComponentStyleObject(styleId);
		const styleName = getComponentStyleName(getBlockType(), styleId);

		return {
			[styleId]: {
				title: styleName,
				styles: styleContent,
			},
		};
	};

/**
 * Update a saved style with new properties.
 *
 * @param {Object} dispatch store action dispatch object
 * @param {Object} select   store selector object`
 * @return {Function} middleware applied function to use inside centralized data store
 */
export const updateSavedStyle =
	(dispatch, select) => async (styleId, styleObject) => {
		const { updateStyle } = dispatch;
		const { getBlockType } = select;

		updateStyle(getBlockType(), styleId, styleObject);

		// generate updated preview for style
		await getRenderedPreviewThunk(dispatch, select)(styleId, false, true);

		if (isStaticStyle(styleId)) {
			const staticStyleObject = getStyleObject(dispatch, select)(styleId);

			return saveStaticStyle(
				dispatch,
				select
			)(staticStyleObject).then(() => styleId);
		}
		return saveStylesToServer(dispatch, select).then(() => styleId);
	};

/**
 * Delete a saved style and save modified styles to server.
 *
 * If no style id is supplied for the returned function, currently selected saved style will be used.
 *
 * @param {Object} dispatch store action dispatch object
 * @param {Object} select   store selector object`
 * @return {Function} middleware applied function to use inside centralized data store
 */
export const deleteStyle =
	(dispatch, select) =>
	(styleId = null) => {
		const { getBlockType, getComponentSavedStyles, getSelectedItemId } =
			select;
		const blockStyles = getComponentSavedStyles(getBlockType());

		// if no style id is provided, use the id of currently selected item
		// this function might be called directly from a component which provide an event for style id, in that case, use currently selected item id
		const finalStyleId =
			typeof styleId === 'string'
				? styleId || getSelectedItemId()
				: getSelectedItemId();

		const newBlockStyles = Object.keys(blockStyles)
			.filter((styleKey) => {
				if (
					Object.prototype.hasOwnProperty.call(blockStyles, styleKey)
				) {
					return styleKey !== finalStyleId;
				}

				return false;
			})
			.reduce((carry, id) => {
				carry[id] = blockStyles[id];
				return carry;
			}, {});

		setBlockStyles(dispatch, select)(newBlockStyles);

		if (isStaticStyle(finalStyleId)) {
			deleteStaticStyle(dispatch, select)(finalStyleId);
		} else {
			saveStylesToServer(dispatch, select).then(() => {
				// do nothing...
			});
		}
	};

/**
 * Apply style to component.
 *
 * @param {Object} dispatch action dispatch object
 * @param {Object} select   store selector object
 * @return {Function} middleware applied function to use inside centralized data store
 */
export const applyStyleToComponent =
	(dispatch, select) => (styleId, blockType, defaultStyle, setAttribute) => {
		const styleObject = select.getComponentStyleObject(blockType, styleId);

		if (styleObject) {
			const finalObject = {
				...defaultStyle,
				...styleObject,
			};

			// mark component to not apply default style again
			if (finalObject.applyDefaultStyle) {
				finalObject.applyDefaultStyle = false;
			}

			setAttribute(finalObject);
		}
	};

/**
 * Set a style default for active block.
 *
 * This function is thunk middleware applied version of the default one on actions object.
 *
 * @param {Object} dispatch action dispatch object
 * @param {Object} select   store select object
 * @return {Function} middleware applied store dispatch function
 */
export const setStyleAsDefaultThunk = (dispatch, select) => (styleId) => {
	const { setStyleAsDefault } = dispatch;
	const { getBlockType } = select;

	setStyleAsDefault(getBlockType(), styleId);
	saveDefaultStylesToServer(dispatch, select).then(() => {
		// do nothing
	});
};

/**
 * Generate saved style preview via block creation method.
 *
 * This method should be preferred for dynamic blocks.
 *
 * Builds the preview block tree entirely in memory and hands it to
 * <BlockPreview>, an isolated preview renderer that never touches the
 * real editor's block list. This used to insert a real block into the
 * actual post content (at the very top, via `core/block-editor`'s
 * insertBlock) to render it, then capture its outerHTML and remove it
 * again — which made a real block visibly flash into the post on every
 * hover (the whole editor appeared to "bounce"), and if that insert/
 * remove cycle was ever interrupted (component unmount, autosave firing
 * mid-flight) the temporary block could get persisted into the saved
 * post as an invalid block.
 *
 * @param {Object} select  store select object
 * @param {string} styleId style id
 * @return {Object[]} array of block objects, ready for <BlockPreview blocks={...} />
 */
const generatePreviewViaBlock = async (select, styleId) => {
	const {
		getRenderPreviewBlockType,
		getComponentTypeFromStyleId,
		getActiveEditorBlock,
	} = select;

	const currentActiveBlockType = getComponentTypeFromStyleId(styleId);

	// decide preview block type. If not overridden, use currently active block's type
	const targetBlockType =
		getRenderPreviewBlockType() || currentActiveBlockType;

	// use current active block type for attribute preparation
	const renderAttributes = prepareAttributesForRender(
		select,
		styleId,
		currentActiveBlockType
	);

	// Reuse the currently selected block's real inner content for the preview
	// (instead of an empty shell) when previewing that same block type, so
	// InnerBlocks-based blocks (e.g. Accordion) render actual content instead
	// of an empty box. <BlockPreview> does not auto-populate a block's
	// InnerBlocks template the way inserting a block into the real editor did.
	const activeBlock = getActiveEditorBlock();
	const innerBlocks =
		activeBlock && activeBlock.name === targetBlockType
			? activeBlock.innerBlocks
			: [];

	const targetBlock = createBlock(
		targetBlockType,
		renderAttributes,
		innerBlocks
	);

	return [targetBlock];
};

/**
 * Prepare preview render attributes.
 *
 * @param {Object}        select        store select object
 * @param {string}        styleId       style id
 * @param {string | null} componentName component name, only supply it to override target block type, else currently active block will be used
 * @return {Object} render attributes
 */
function prepareAttributesForRender(select, styleId, componentName = null) {
	const {
		getRenderAttributePreparationCallback,
		getComponentStyleObject,
		getComponentStyleName,
	} = select;

	return getRenderAttributePreparationCallback()(
		getComponentStyleObject(
			componentName ? componentName : styleId,
			componentName ? styleId : null
		),
		getComponentStyleName(
			componentName ? componentName : styleId,
			componentName ? styleId : null
		)
	);
}

/**
 * Generate saved style preview via rest endpoint.
 *
 * @param {Object} select  store select object
 * @param {string} styleId style id
 * @return {Promise<string>} promise object
 */
const generatePreviewViaRest = (select, styleId) => {
	const { getOptions, getBlockType } = select;

	const blockType = getBlockType();

	const preparedAttributes = prepareAttributesForRender(select, styleId);

	preparedAttributes.blockID = styleId;

	return apiFetch({
		path:
			getOptions('restPath') +
			`/render?block=${blockType}&attributes=${btoa(
				JSON.stringify(preparedAttributes)
			)}`,
		method: 'GET',
	}).then((resp) => {
		if (resp.data.status === 200) {
			const { response } = resp.data;

			return response;
		}
	});
};

/**
 * Get html preview of a saved style.
 *
 * @param {Object} dispatch action dispatch object
 * @param {Object} select   store select object
 * @return {Function} middleware applied store dispatch function
 */
export const getRenderedPreviewThunk =
	(dispatch, select) =>
	(styleId, useRest = false, force = false) => {
		return new Promise((res) => {
			const renderedPreview = getRenderedPreview(select)(styleId);

			if (force || !renderedPreview) {
				const { getComponentTypeFromStyleId } = select;
				const { cacheBlockPreview } = dispatch;

				if (useRest) {
					return generatePreviewViaRest(select, styleId).then(
						(generatedPreview) => {
							// cache generated preview for future use
							cacheBlockPreview(
								getComponentTypeFromStyleId(styleId),
								styleId,
								generatedPreview
							);
							return res(generatedPreview);
						}
					);
				}

				return generatePreviewViaBlock(select, styleId).then(
					(generatedPreview) => {
						// cache generated preview for future use
						cacheBlockPreview(
							getComponentTypeFromStyleId(styleId),
							styleId,
							generatedPreview
						);

						return res(generatedPreview);
					}
				);
			}
			return res(renderedPreview);
		});
	};

/* eslint-disable jsdoc/check-param-names */
/**
 * Decide preview background color.
 *
 * @param {Object}   dispatch                        action dispatch object
 * @param {Object}   select                          store select object
 * @param {Function} dispatch.setPageBackgroundColor set page background color action
 * @param {Function} select.getPageBackgroundColor   get page background color selector
 * @return {Function} middleware applied store dispatch function
 */
/* eslint-enable jsdoc/check-param-names */
export const decidePreviewBackground =
	({ setPageBackgroundColor }, { getPageBackgroundColor }) =>
	() => {
		let currentBg = getPageBackgroundColor();
		if (!currentBg) {
			const editorWrapper = document.querySelector(
				'.editor-styles-wrapper'
			);

			if (editorWrapper) {
				currentBg = getComputedStyle(editorWrapper).backgroundColor;
				setPageBackgroundColor(currentBg);
			}
		}

		return currentBg;
	};

/**
 * Toggle show previews status.
 *
 * @param {Object} dispatch store dispatch object
 * @param {Object} select   store select object
 */
export const toggleShowPreviews = (dispatch, select) => () => {
	const { isShowPreviewsEnabled } = select;
	const { setShowPreviewStatus } = dispatch;

	setShowPreviewStatus(!isShowPreviewsEnabled());
};

/**
 * Update style title action.
 *
 * @param {Object} dispatch store dispatch object
 * @param {Object} select   store select object
 * @return {Function} action function
 */
export const updateStyleTitleAction =
	(dispatch, select) => (styleId, newTitle) => {
		const { getBlockType } = select;
		const { updateStyleTitle } = dispatch;

		updateStyleTitle(styleId, getBlockType(), newTitle);

		if (isStaticStyle(styleId)) {
			const staticStyleObject = getStyleObject(dispatch, select)(styleId);
			return saveStaticStyle(
				dispatch,
				select
			)(staticStyleObject).then(() => {
				getRenderedPreviewThunk(dispatch, select)(styleId, false, true);
			});
		}
		return saveStylesToServer(dispatch, select).then(() => {
			// generate updated preview for style
			getRenderedPreviewThunk(dispatch, select)(styleId, false, true);
		});
	};

/**
 * @module actions
 */
export default actions;

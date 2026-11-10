import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import assetsSlice from "$Stores/settings-menu/slices/assets";
import appSlice from "$Stores/settings-menu/slices/app";
import blocksSlice from "$Stores/settings-menu/slices/blocks";
import extensionsSlice from "$Stores/settings-menu/slices/extension";
import versionControlSlice from "$Stores/settings-menu/slices/versionControl";
import deepmerge from "deepmerge";
import initialState from "$Stores/settings-menu/initialState";
import pluginStatusSlice from "$Stores/settings-menu/slices/pluginStatus";

/**
 * Prepare data for pro only block upsells.
 *
 * @param {Object} proOnlyBlockList pro only block list
 *
 * @return {Array} pro block upsell data
 */
function prepareProOnlyBlockUpsellData(proOnlyBlockList) {
	return Object.keys(proOnlyBlockList)
		.filter((key) =>
			Object.prototype.hasOwnProperty.call(proOnlyBlockList, key),
		)
		.reduce((carry, blockName) => {
			const {
				desc: info,
				label: title,
				icon,
				screenshot,
			} = proOnlyBlockList[blockName];

			carry.push(
				generateBlockInfoObject(
					blockName,
					title,
					info,
					icon,
					false,
					true,
					screenshot,
				),
			);

			return carry;
		}, []);
}

/**
 * Generate block info object compatible with settings menu store.
 *
 * @param {string}            name                 block registry name
 * @param {string}            title                block title
 * @param {string}            info                 block info
 * @param {React.ElementType} icon                 icon element
 * @param {boolean}           active               active status
 * @param {boolean}           [pro=false]          block pro status
 * @param {string | null}     [screenshotUrl=null] screenshot url for upsell
 * @return {Object} block info object
 */
function generateBlockInfoObject(
	name,
	title,
	info,
	icon,
	active,
	pro = false,
	screenshotUrl = null,
) {
	return {
		name,
		title,
		info: Array.isArray(info) ? info : [info],
		icon,
		active,
		pro,
		screenshotUrl,
	};
}

/**
 * Create settings menu store.
 *
 * @return {Object} store
 */
function createStore() {
	// eslint-disable-next-line no-undef
	const appData = { ...ubAdminMenuData };
	// eslint-disable-next-line no-undef
	ubAdminMenuData = null;

	// Pull icon/title from the block registry when available (free blocks),
	// but don't rely on it for the final list (pro blocks may not be present).
	// eslint-disable-next-line no-undef
	const registeredBlocks = wp?.data?.select("core/blocks")?.getBlockTypes?.();
	const registeredBlockByName = Array.isArray(registeredBlocks)
		? registeredBlocks
				.filter((blockData) => blockData?.name)
				.reduce((carry, blockData) => {
					carry[blockData.name] = blockData;
					return carry;
				}, {})
		: {};

	// Build blocks list from localized app data (avoids relying on block registry timing).
	const { statusData = [], info = {} } = appData.blocks || {};
	const reducedBlocks = statusData.reduce((carry, current) => {
		const {
			name,
			label: title,
			active: blockStatus = false,
			screenshotUrl,
		} = current;

		if (!name) {
			return carry;
		}

		const blockInfo = Array.isArray(info[name]) ? info[name] : [];

		// Prevent duplicate React keys by de-duping by block name.
		const existing = carry.find((b) => b.name === name);
		if (existing) {
			existing.active = blockStatus;
			existing.title = existing.title || title || name;
			existing.info = existing.info?.length ? existing.info : blockInfo;
			existing.screenshotUrl = existing.screenshotUrl || screenshotUrl || null;
			return carry;
		}

		const registryBlock = registeredBlockByName[name];
		const resolvedTitle = registryBlock?.title || title || name;
		const resolvedIcon =
			registryBlock?.icon?.src ??
			'<span class="dashicons dashicons-block-default"></span>';

		carry.push(
			generateBlockInfoObject(
				name,
				resolvedTitle,
				blockInfo,
				resolvedIcon,
				blockStatus,
				false,
				screenshotUrl || null,
			),
		);

		return carry;
	}, []);

	const { blocks: proBlocks } = appData.upsells;
	const proBlockUpsell = prepareProOnlyBlockUpsellData(proBlocks);

	// all blocks available including upsell versions of pro blocks or pro blocks themselves
	const allRegistered = proBlockUpsell.reduce((carry, current) => {
		const { name: proBlockName } = current;

		//check if pro block name is already in reduced lists which will tell us it is already registered by pro version of plugin, so we will only add pro property to block object
		// if not inject the upsell data to current block list
		const registeredProBlock = carry.find(({ name }) => name === proBlockName);
		if (registeredProBlock) {
			registeredProBlock.pro = true;
			registeredProBlock.icon = current.icon;
			registeredProBlock.screenshotUrl =
				registeredProBlock.screenshotUrl || current.screenshotUrl || null;
		} else {
			carry.push(current);
		}

		return carry;
	}, reducedBlocks);

	const { contentData, ...preloadedAssets } = appData.assets;

	let preloadedState = {
		app: {
			content: contentData,
		},
		assets: preloadedAssets,
		blocks: {
			registered: allRegistered,
		},
		extensions: {
			registered: appData.extensions.statusData,
		},
		versionControl: appData.versionControl,
		pluginStatus: appData.pluginStatus,
	};

	// merge with default store state
	preloadedState = deepmerge(initialState, preloadedState);

	return configureStore({
		reducer: {
			assets: assetsSlice,
			app: appSlice,
			blocks: blocksSlice,
			extensions: extensionsSlice,
			versionControl: versionControlSlice,
			pluginStatus: pluginStatusSlice,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
		preloadedState,
	});
}

/**
 * @module createStore
 */
export default createStore;

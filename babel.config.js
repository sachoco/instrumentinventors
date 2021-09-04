import { getBabelPresets } from '@wpackio/scripts';

module.exports = api => {
	// create cache based on NODE_ENV
	api.cache.using(() => process.env.NODE_ENV);

	const presetOptions = {
		noDynamicImport: false,
		noImportMeta: false,
		noClassProperties: false,
		noJsonStrings: false,
		noRuntime: false,
		hasReact: true,
		presetEnv: {
			// Override Options for @babel/preset-env
			useBuiltIns: 'usage',
		},
		presetReact: {
			// Override Options for @babel/preset-react
		},
	};

	// make test aware changes
	const isTest = api.env('test');

	if (isTest) {
		// since jest only understands commonjs modules
		presetOptions.presetEnv.modules = 'commonjs';
	}

	const babelConfig = {
		presets: getBabelPresets(presetOptions, 'typescript'),
		plugins: ['@babel/plugin-proposal-private-methods'],
	};

	return babelConfig;
};

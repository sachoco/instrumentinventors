const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const path = require('path');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const { DefinePlugin } = require('webpack');
const DevelopmentComponentIgnorePlugin = require('./src/__development/webpack/plugin/DevelopmentComponentIgnorePlugin');

// ignore list to mark given components as development specific
const developmentComponentIgnoreList = [
	'ActivateBlockOnStartup',
	'DevelopmentComponent',
];

const customConfig = {
	...defaultConfig,
	entry: {
		blocks: path.resolve(process.cwd(), 'src', 'blocks.js'),
		priority: path.resolve(process.cwd(), 'src', 'priority.js'),
		'ub-admin-settings': path.resolve(
			process.cwd(),
			'admin',
			'js',
			'src',
			'ub-admin-settings.js'
		),
		'setup-wizard': path.resolve(
			process.cwd(),
			'admin',
			'js',
			'src',
			'setup-wizard.js'
		),
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve.alias,
			$BlockStores: path.resolve(__dirname, 'src', 'stores'),
			$Inc: path.resolve(__dirname, 'src', 'inc'),
			$Base: path.resolve(__dirname, 'src', 'base'),
			$Library: path.resolve(__dirname, 'library'),
			$Manager: path.resolve(__dirname, 'src', 'inc', 'managers'),
			$Development: path.resolve(__dirname, 'src', '__development'),

			// Admin app aliases, previously declared for Parcel in package.json.
			$Containers: path.resolve(__dirname, 'admin', 'js', 'src', 'containers'),
			$Components: path.resolve(__dirname, 'admin', 'js', 'src', 'components'),
			$Data: path.resolve(__dirname, 'admin', 'js', 'src', 'data'),
			$AdminInc: path.resolve(__dirname, 'admin', 'js', 'src', 'inc'),
			$HOC: path.resolve(__dirname, 'admin', 'js', 'src', 'hoc'),
			$Stores: path.resolve(__dirname, 'admin', 'js', 'src', 'stores'),
			$Styles: path.resolve(__dirname, 'admin', 'css', 'src'),
			$EditorComponents: path.resolve(__dirname, 'src', 'inc', 'components'),

			// Keep the automatic JSX runtime on WordPress' React instance rather
			// than letting webpack inline React's own copy. See the shim for why.
			'react/jsx-runtime': path.resolve(
				__dirname,
				'src',
				'shims',
				'jsx-runtime.js'
			),
			'react/jsx-dev-runtime': path.resolve(
				__dirname,
				'src',
				'shims',
				'jsx-runtime.js'
			),
		},
		extensions: [...defaultConfig.resolve.extensions, '.js'],
	},
	plugins: [
		...defaultConfig.plugins.filter(
			(p) => !(p instanceof CleanWebpackPlugin)
		),
		new IgnoreEmitPlugin(['blocks.build.asset.php', /\.map$/]),
		new DefinePlugin({
			UB_ENV: JSON.stringify(defaultConfig.mode),
		}),
		new DevelopmentComponentIgnorePlugin(
			developmentComponentIgnoreList,
			defaultConfig.mode === 'production'
		),
	],
	output: {
		filename: '[name].build.js',
	},
};

module.exports = customConfig;

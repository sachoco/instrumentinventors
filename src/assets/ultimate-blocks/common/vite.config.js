import react from '@vitejs/plugin-react';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	// set when this copy ships inside the plugin: the entries below are
	// relative to this folder, and a build lands straight in the folder
	// the plugin loads the library from
	root: __dirname,
	build: {
		outDir: path.resolve(__dirname, '../library/ub-common'),
		emptyOutDir: true,
		target: 'ES6',
		lib: {
			entry: {
				'Components/index': './src/Components.js',
				'Components/client': './src/styles/client.js',
				'Components/editor': './src/styles/editor.js',
				'Inc/index': './src/Inc.js',
			},
			formats: ['cjs'],
		},
		cssCodeSplit: true,
		rollupOptions: {
			output: {
				assetFileNames: 'Components/[name].css',
				chunkFileNames: '.Chunks/[hash].js',
			},
		},
		minify: 'esbuild',
		sourcemap: 'inline',
	},
	resolve: {
		alias: {
			'@Containers': path.resolve(__dirname, './src/containers'),
			'@Inc': path.resolve(__dirname, './src/inc'),
		},
	},
	plugins: [react(), peerDepsExternal()],
	test: {
		alias: {
			'@Containers': path.resolve(__dirname, './src/containers'),
			'@Inc': path.resolve(__dirname, './src/inc'),
		},
		include: ['./__tests__/**/*.test.{js,jsx}'],
		watch: ['./src/**/**.*', './dist/**/*.*'],
		forceRerunTriggers: [
			'./src/containers/TestComponent/TestComponent.jsx',
		],
		globals: true,
		environment: 'jsdom',
	},
});

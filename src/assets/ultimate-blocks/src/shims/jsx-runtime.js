/**
 * Automatic JSX runtime shim.
 *
 * `@wordpress/dependency-extraction-webpack-plugin` v3 only externalizes bare
 * `react` and `react-dom` requests, not `react/jsx-runtime`. Any dependency
 * compiled with the automatic JSX runtime therefore gets React's own copy of
 * the runtime inlined into our bundle, and that inlined copy tags the elements
 * it creates for the React version it was built against.
 *
 * React 19 renamed the element marker from `react.element` to
 * `react.transitional.element`, so elements produced by an inlined React 18
 * runtime are unrecognisable to the React 19 that WordPress now loads, and
 * rendering them throws "Objects are not valid as a React child".
 *
 * Routing the automatic runtime through `@wordpress/element` guarantees every
 * element is created by the single React instance WordPress provides, whichever
 * version that happens to be.
 *
 * Once this plugin's minimum supported WordPress version is 6.6 or later, this
 * shim can be dropped in favour of externalizing `react/jsx-runtime` to the
 * `react-jsx-runtime` script handle that WordPress registers from 6.6 onwards.
 */
import { createElement, Fragment } from '@wordpress/element';

/**
 * Create an element from the arguments the automatic JSX runtime passes.
 *
 * `createElement` copies `config` into props and pulls `key` out of it, so
 * forwarding `config` untouched preserves `children` exactly as the automatic
 * runtime built it, including any keys already assigned to them.
 *
 * @param {*}      type     element type
 * @param {Object} config   element props, including `children`
 * @param {*}      maybeKey key supplied separately by the automatic runtime
 * @return {Object} react element
 */
const jsx = (type, config, maybeKey) =>
	createElement(
		type,
		maybeKey === undefined ? config : { ...config, key: maybeKey }
	);

export { jsx, jsx as jsxs, jsx as jsxDEV, Fragment };

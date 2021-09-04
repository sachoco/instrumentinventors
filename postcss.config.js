/* eslint-disable global-require, import/no-extraneous-dependencies */
// module.exports = {
// 	// You can add more plugins and other postcss config
// 	// For more info see
// 	// <https://github.com/postcss/postcss-loader#configuration>
// 	// There is no need to use cssnano, webpack takes care of it!
// 	plugins: [require('tailwindcss')],
// 	plugins: [require('autoprefixer')],
// };

// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   }
// }
module.exports = (api) => {
  // // `api.file` - path to the file
  // // `api.mode` - `mode` value of webpack, please read https://webpack.js.org/configuration/mode/
  // // `api.webpackLoaderContext` - loader context for complex use cases
  // // `api.env` - alias `api.mode` for compatibility with `postcss-cli`
  // // `api.options` - the `postcssOptions` options
  //
  // if (/\.sss$/.test(api.file)) {
  //   return {
  //     // You can specify any options from https://postcss.org/api/#processoptions here
  //     parser: "sugarss",
  //     plugins: [
  //       // Plugins for PostCSS
  //       ["postcss-short", { prefix: "x" }],
  //       "postcss-preset-env",
  //     ],
  //   };
  // }

  return {
    // You can specify any options from https://postcss.org/api/#processoptions here
    plugins: [
      // Plugins for PostCSS
      // "postcss-import",
      'tailwindcss/nesting',
      "tailwindcss",
      "autoprefixer",
    ],
  };
};

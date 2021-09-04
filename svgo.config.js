// const { extendDefaultPlugins } = require('svgo');
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize options
          removeTitle: false,
          // or disable plugins
          removeViewBox: false,
        },
      },
    },
  ],
};

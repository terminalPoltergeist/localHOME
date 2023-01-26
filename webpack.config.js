const path = require('path');
// const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    index: [path.join(__dirname,  "client", "src", "index.js")],
    settings: [path.join(__dirname, "client", "src", "settings.js")]
  },
  output: {
    path: path.join(__dirname, 'client/build'),
    filename: "[name].js",
    publicPath: '/build/',
    clean: true,
  },
  resolve: {
    modules: ['client/src/components']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ],
        // include: path.resolve(__dirname, 'client/src/styles')
      },
    ],
  },
  mode: 'development'
};


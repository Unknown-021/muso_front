const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const base = require('./webpack.base.config');
const isProduction = process.env.NODE_ENV === 'production';
const srcPath = path.resolve(process.cwd(), 'src');
const { APP_NAME, SEARCH_APP_NAME } = require('./webpack.constants');

module.exports = merge(base, {
    entry: {
      // TODO: Implement app filename hashing
      [APP_NAME]: path.join(srcPath, 'client-entry.js'),
      [SEARCH_APP_NAME]: path.join(srcPath, 'search-entry.js')
    },
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/public/',
      filename: '[name].js',
      sourceMapFilename: '[name].js.map',
    },
    resolve: {
      extensions: ['.js', '.vue'],
    },
    plugins: (isProduction
      ? [
        new MiniCssExtractPlugin({
          filename: '[name].css',
        })
      ]
      : [
        new webpack.HotModuleReplacementPlugin()
      ]
    ),
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                url: false,
              },
            },
            'resolve-url-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['assets/styles/'],
                }
              },
            },
          ],
        },
      ]
    }
});

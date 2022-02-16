const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          {
            loader: 'vue-svg-loader',
            options: {
              svgo: {
                // TODO: Add { removeDimensions: true } plugin in the future
                plugins: [{ removeViewBox: false }]
              }
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|eot|woff|woff2|ttf)$/i,
        include: resolve('src/assets'),
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: '[path][name].[ext]',
              context: 'src/assets',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')],
        exclude: file => (
          /node_modules/.test(file) && !/\.vue\.js/.test(file)
        ),
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    modules: [
      path.resolve(__dirname, '..', 'src'),
      'node_modules',
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};

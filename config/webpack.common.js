const dotenvWebpack = require('dotenv-webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');

const paths = require('./paths')

module.exports = {
  entry: paths.src + "/index.js",
  output: {
    filename: 'bundle.js',
    path: paths.build,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(svg|woff|woff2|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              filename: '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|ico)$/,
        use: ['url-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: paths.src + '/index.html'
    }),
    new dotenvWebpack({
      path: paths.app + '/.env'
    }),
    new CleanWebpackPlugin(['dist'], { root: paths.app })
  ],
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty'
  }
}
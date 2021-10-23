const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const port = process.env.PORT || 3000

const prodenv = process.env.NODE_ENV === 'prod'

const plugins = [
  new HtmlWebpackPlugin({
    template: 'public/index.html',
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: 'public/styles.css', to: 'dist' }],
  }),
]

if (!prodenv) {
  plugins.concat(new BundleAnalyzerPlugin())
}

module.exports = {
  mode: prodenv ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: '/.css$/',
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins,
  devServer: {
    static: './dist',
    host: 'localhost',
    port: port,
    historyApiFallback: true,
  },
}

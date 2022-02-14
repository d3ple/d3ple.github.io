require('dotenv-flow').config()

const Dotenv = require('dotenv-webpack');
const { SourceMapDevToolPlugin } = require("webpack")
const { resolve, join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const resolvePath = (p) => resolve(__dirname, p)

const config = {
  mode: !isDev ? 'production' : 'development',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    publicPath: '/',
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [join(__dirname, 'src'), 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    alias: {
      '~': resolvePath('src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      // Поддержка scss модулей :D
      {
        test: /\.module\.scss$/,
        use: [
          { loader: isDev ? MiniCssExtractPlugin.loader : 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                'src/styles/variables.scss',
                'src/styles/helpers/_mixins.scss',
                'src/styles/helpers/_media.scss',
              ]
            }
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'style-resources-loader',
            options: {
              patterns: [
                'src/styles/variables.scss',
                'src/styles/helpers/_mixins.scss',
                'src/styles/helpers/_media.scss',
              ]
            }
          }
        ],
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        exclude: /node_modules/,
        use: [
          { 
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            }
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: isDev ? './.env.development' : './.env.production',
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false
    }),
    new ESLintPlugin({
      cache: isDev,
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[hash].css'
    }),
  ]
}

if (!isDev) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.devServer = {
    port: process.env.DEV_PORT || 3000,
    historyApiFallback: true,
    hot: true,
    compress: true,
  };
}

module.exports = config
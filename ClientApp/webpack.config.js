'use strict';
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const autoprefixer = require('autoprefixer');
const glob = require('glob');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: () => {
    const jsMapped = glob.sync('./src/js/*.ts')
      .reduce((entries, entry) =>
        Object.assign(entries, { [entry.split('/').pop().replace('.ts', '')]: entry }),
        {});

    const componentMapped =
      glob.sync('./src/components/**/*.ts')
        .reduce((entries, entry) =>
          Object.assign(entries, { [entry.split('/').slice(-2)[0]]: entry }),
          jsMapped);

    return componentMapped;
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'wwwroot', 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    cascade: false,
                    grid: 'no-autoreplace'
                  })
                ]
              }
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    alias: {
      uswds: path.resolve(__dirname, 'node_modules/uswds/dist'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  optimization: {
    moduleIds: 'deterministic',
    minimizer: [
      `...`,
      new CssMinimizerPlugin()
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          test: /[\\/]node_modules[\\/](?!jquery)(.*?)[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all'
        }
      }
    }
  }
};

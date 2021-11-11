import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import { EnvironmentPlugin, DefinePlugin } from 'webpack';

const shouldAnalyze = !process.env.NODE_ENV || ['development'].includes(process.env.NODE_ENV);
const shouldStartDevServer = !process.env.NODE_ENV || ['development'].includes(process.env.NODE_ENV);
const isDevMode = !process.env.NODE_ENV || ['development', 'local', 'docker'].includes(process.env.NODE_ENV);

export const getClientConfig = (target) => {
  let additionalPlugins = [];
  if (shouldAnalyze) {
    if (target === 'web') {
      additionalPlugins = [
        new BundleAnalyzerPlugin({
          defaultSizes: 'gzip',
          openAnalyzer: false,
        }),
      ];
    }
  } else {
    additionalPlugins = [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ];
  }

  let devServer;
  if (shouldStartDevServer) {
    devServer = {
      contentBase: path.join(__dirname, 'dist'),
      watchContentBase: true,
      compress: true,
      hot: true,
      port: 3000,
    };
  }

  return {
    name: target === 'web' ? 'browser' : 'ssr',
    mode: isDevMode ? 'development' : 'production',
    target,
    devtool: 'source-map',
    entry: `./src/index-${target}.tsx`,
    node: {
      __dirname: true,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
          ],
        },
        {
          test: /\.scss$/,
          use: [
            'isomorphic-style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
              },
            },
          ],
        },
        {
          test: /\.(md)$/i,
          use: [
            {
              loader: 'raw-loader',
            },
          ],
        },
      ],
    },
    externals: target === 'node' ? [
      '@loadable/component',
      nodeExternals({
        allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i],
      }),
    ] : undefined,
    output: {
      path: path.resolve(__dirname, 'dist', target === 'web' ? 'browser' : 'ssr'),
      filename: isDevMode ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/dist/browser/',
      libraryTarget: target === 'node' ? 'commonjs2' : undefined,
    },
    plugins: [
      new LoadablePlugin(),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
        chunkFilename: isDevMode ? '[id].css' : '[id].[contenthash].css',
      }),
      new CopyPlugin({
        patterns: [
          {from: 'src/asset/favicon.ico', to: './favicon.ico'},
          {from: 'src/asset/images/gold-on-blue.png', to: './favicon.png'},
        ],
      }),
      new LodashModuleReplacementPlugin(),
      new EnvironmentPlugin(['NODE_ENV']),
      new DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
      ...additionalPlugins,
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
      },
      fallback: {
        'fs': false,
        'tls': false,
        'net': false,
        'path': require.resolve('path-browserify'),
        'zlib': false,
        'http': false,
        'https': false,
        'stream': false,
        'crypto': false,
        'crypto-browserify': false,
      },
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const splitMap = [
                {name: 'core-js', packages: ['core-js']},
                {
                  name: 'react', packages: [
                    'react',
                    'react-router',
                    'react-router-dom',
                    'react-redux',
                    'redux',
                    'react-dom',
                    'react-transition-group',
                  ],
                },
                {name: 'axios', packages: ['axios']},
                {name: 'lodash', packages: ['lodash']},
                {name: 'auth0-spa', packages: ['auth0']},
                {name: 'react-icons', packages: ['react-icons']},
                {name: 'markdown', packages: ['react-markdown', 'remark-parse']},
              ];
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1].replace('@', '');
              const splitPackage = splitMap.filter((e) => e.packages.includes(packageName));
              const splitName = (splitPackage.length) ? splitPackage[0].name : 'packages';

              return `vendor-${splitName}`;
            },
          },
        },
      },
    },
    devServer,
  };
};

import path from 'path';
import WebpackMd5Hash from 'webpack-md5-hash';
import nodeExternals from 'webpack-node-externals';

export const getServerConfig = () => {
  return {
    name: 'server',
    mode: 'production',
    target: 'node',
    devtool: 'source-map',
    entry: './src/server.ts',
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
      ],
    },
    externals: [
      nodeExternals(),
    ],
    output: {
      path: path.resolve(__dirname, 'dist', 'server'),
      filename: 'start.js',
      publicPath: '/dist/browser/',
    },
    context: path.resolve(__dirname),
    node: {
      __dirname: true,
    },
    plugins: [
      new WebpackMd5Hash(),
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      alias: {
        '@src': path.resolve(__dirname, 'src/'),
      },
    },
  };
};

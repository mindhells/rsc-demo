import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import NodemonPlugin from 'nodemon-webpack-plugin';
import ReactServerWebpackPlugin from 'react-server-dom-webpack/plugin';
import nodeExternals from 'webpack-node-externals';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const browserslistTarget = '>0.3%, last 5 version and not dead';

const clientConfig = {
  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  resolve: {
    conditionNames: ['browser', '...'],
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.js'],
    },
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: false,
              dynamicImport: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
          env: {
            mode: 'entry',
            targets: browserslistTarget,
            coreJs: '3.37.1',
          },
          isModule: true,
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              // The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources and CSS modules/ICSS imports.
              // 0 => no loaders (default);
              // 1 => sass-loader;
              importLoaders: 1,
              modules: {
                namedExport: false,
                exportLocalsConvention: 'as-is',
                localIdentName: '[local]-[hash:base64:6]',
              },
            },
          },
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "client",
          type: "css/mini-extract",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new ReactServerWebpackPlugin({
      isServer: false,
    }),
    new MiniCSSExtractPlugin({
      filename: 'public/[name].css',
    }),
  ],
};

const serverConfig = {
  dependencies: ['client'],
  name: 'server',
  mode: 'development',
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      importType: 'module',
    }),
  ],
  node: false,
  target: 'node16',
  devtool: 'inline-source-map',
  entry: {
    server: './src/server.ts',
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'module',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    conditionNames: ['react-server', '...'],
    extensionAlias: {
      '.js': ['.tsx', '.ts', '.js'],
    },
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
              dynamicImport: true,
            },
            target: 'es2022',
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
          isModule: true,
          sourceMaps: true,
        },
      },
      {
        test: /\.(client|action).tsx?$/,
        loader: require.resolve('./webpack-loaders/RSCNodeLoader.js'),
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCSSExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              // The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources and CSS modules/ICSS imports.
              // 0 => no loaders (default);
              // 1 => sass-loader;
              importLoaders: 1,
              modules: {
                namedExport: false,
                exportLocalsConvention: 'as-is',
                localIdentName: '[local]-[hash:base64:6]',
              },
            },
          },
          {
            loader: require.resolve('sass-loader'),
          },
        ],
      },
    ],
  },
  watchOptions: {
    ignored: ['**/dist', '**/node_modules'],
    aggregateTimeout: 300,
  },
  plugins: [
    new NodemonPlugin({
      script: './dist/server.js',
      nodeArgs: [
        '--inspect=0.0.0.0:9229',
        '--enable-source-maps',
        '--conditions=react-server',
      ],
      watch: [resolve(__dirname, 'dist', 'server.js')],
      env: {
        NODE_ENV: 'development',
      },
    }),
    new MiniCSSExtractPlugin({
      filename: 'public/[name].css',
      chunkFilename: 'public/chunk-[name].css',
    }),
  ],
};

export default [clientConfig, serverConfig].filter(Boolean);

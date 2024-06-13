import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';

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
    path: resolve(__dirname, 'dist', 'client'),
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
    ],
  },
};

const serverConfig = {
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
    errorDetails: true
  },
  module: {
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
  ],
};

export default [clientConfig, serverConfig].filter(Boolean);

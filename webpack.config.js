const path = require('path');
const nodeExternals = require('webpack-node-externals'); // Fix bug for express
const WebpackShellPlugin = require('webpack-shell-plugin'); // Run command after build finish
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // Resolve module in tsconfig.json for webpack
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;
module.exports = {
    entry: './src/server.ts',
    watch: NODE_ENV === 'development',
    mode: NODE_ENV,
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: false,
                            compilerOptions: {
                                removeComments: false,
                            },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    context: path.resolve(__dirname),
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/modules', to: './modules' }, // Copy files module
            ],
        }),
    ],
};

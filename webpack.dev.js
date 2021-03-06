const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: "development",
    entry: {
        app: path.join(__dirname, './src/app.js')
    },
    output: {
        path: path.join(__dirname, './public'),
        filename: "[name].bundle.js"
    },
    devServer: {
        contentBase: './',
        hot: true
    },
    devtool: "inline-source-map",


    resolve: {
        extensions: ['.vue', '.js', '.css'],
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },
    plugins: [
        new ManifestPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {from: 'static', to: 'static'}
        ]),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            showErrors: true,
        })
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ],
            },

            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }

            }
        ]
    },
};

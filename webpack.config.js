const path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var StyleLintPlugin = require('stylelint-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    plugins: [
        new CleanWebpackPlugin(['build'], {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin("styles.css"),
        new StyleLintPlugin({
            context: "src",
            configFile: '.stylelintrc.json',
            files: '**/*.scss',
            failOnError: false,
            quiet: false,
            failOnWarning: false,
            failOnError: false,
            testing: false,
            syntax: 'scss'

        }),
        new HtmlWebpackPlugin()
    ],
    entry: ['./src/js/app.ts', './src/scss/main.scss'],
    module: {
        rules: [{
            test: /\.ts$/,
            enforce: 'pre',
            loader: 'tslint-loader',
            options: {
                configuration: {
                    rules: {
                        quotemark: [true, 'double']
                    }
                },

                emitErrors: true,
                failOnHint: true,
                typeCheck: true,
                fix: true,
                tsConfigFile: 'tsconfig.json'
            }
        }, {
            test: /\.tsx?$/,
            use: 'ts-loader',
            // exclude: /node_modules/
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            })
        }]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'build')
    }
};
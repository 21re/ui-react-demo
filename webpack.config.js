const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const outputPath = path.join(__dirname, 'lib');

module.exports = {
    devtool: 'source-map',

    entry: {
        'demo': [
            './ui/demo/app.tsx',
            './ui/demo/demo.scss',
        ],
    },

    output: {
        path: outputPath,
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        publicPath: '/assets/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.scss', '.css', '.html', '.tsx'],
        unsafeCache: true,
        symlinks: false
    },

    module: {
        rules: [{
            test: /\.ts$/,
            use: ["awesome-typescript-loader"],
            exclude: /node_modules/
        }, {
            test: /\.tsx$/,
            use: ['awesome-typescript-loader'],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            use: ['babel-loader?{"presets":["es2015"],"cacheDirectory":true}'],
            exclude: /(node_modules|bower_components)/
        }, {
            test: /\.scss$/,
            use: ["file-loader?name=[name].css", "extract-loader", "css-loader", "resolve-url-loader", "sass-loader?sourceMap"]
        }, {
            test: /\.css$/,
            use: ["file-loader?name=[name].css", "extract-loader", "css-loader"]
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.(ttf|jpg|png|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            use: 'file-loader?name=[name].[ext]'
        }]
    },

    plugins: [
        new WriteFilePlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': process.env.NODE_ENV  ? JSON.stringify(process.env.NODE_ENV) : JSON.stringify('production')
        }),
    ]
};

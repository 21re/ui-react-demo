const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const jwt = require('jsonwebtoken');

const outputPath = path.join(__dirname, 'target', 'web', 'public', 'main', 'assets');

const scopes = {
    api: ["S", "CA"],
    dashboard: ["S", "BY"],
    offer: ["S", "BY"],
    object: ["S", "BY"],
    circle: ["S", "BY"],
    search: ["S", "BY"],
    workspace: ["S", "BY"]
};
const encodedScopes = new Buffer(JSON.stringify(scopes)).toString('base64');

function createDevToken() {
    return jwt.sign({
        org: "98e48bc8-478b-4b91-99c2-f7f69f054512",
        scopes: scopes
    }, '\x12\x34\x56\x78', {subject: 'customer/VC215', expiresIn: '5m'});
}

module.exports = {
    devtool: 'source-map',

    entry: {
        'demo': [
            './ui/app.tsx',
            './ui/demo.scss',
        ],
    },

    devServer: {
        port: 8000,
        historyApiFallback: true,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080',
                rewrite: function (req) {
                    req.headers['Authorization'] = 'Bearer ' + createDevToken();
                },
                onProxyReq: function (proxyReq, req, res) {
                    proxyReq.setHeader('Authorization', 'Bearer ' + createDevToken());
                    proxyReq.setHeader('X-Debug', 'true');
                }
            },
            '/': {
                target: 'http://localhost:8080',
                onProxyReq: function (proxyReq, req, res) {
                    proxyReq.setHeader('Authorization', 'Bearer ' + createDevToken());

                    res.setHeader('Set-Cookie', 'AUTH_SCOPES=' + encodedScopes + ';Path=/');
                }
            }
        }
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
        new CopyWebpackPlugin([
            'doc/*.yaml',
        ]),
    ]
};

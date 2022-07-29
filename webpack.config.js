var path = require("path")
var webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',  
  entry: [
    //'./src/style.scss',
    './src/index.js'
  ],
  output: {
    path: path.resolve('./build/', ),
    
    publicPath: '/',
    filename: 'bundle.[hash].js'
  },
  devtool: 'inline-source-map',
  module: {
        rules: [
            { 
                test: /\.js$/, 
                use: 'babel-loader', 
                exclude: /node_modules/,
            },
            {
                test: /\.jsx$/, 
                use: 'babel-loader', 
                exclude: /node_modules/,
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                loader: "expose-loader",
                options: {
                    exposes: {
                        globalName: "$",
                        override: true,
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(otf|eot|svg|ttf|woff|woff2|png|jpg|jpeg)/,
                use: "url-loader?limit=8192"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader" ]
            },
        ],
    },
    
 
  plugins: [
        new HtmlWebpackPlugin({
          template: 'public/index.html',
          favicon: 'public/favicon.ico'
        }),
        
        new BundleTracker({filename: './webpack-stats.json'}),
        
        new CopyWebpackPlugin([
            {from: './public/.htaccess'},
            
            {
                from: './src/images',
                to: 'images/[name].[ext]',
            },
            {
                from: './node_modules/bootstrap-sass/assets/fonts/bootstrap',
                to: 'fonts/bootstrap/[name].[ext]',
            },
            
            // Coderline AlphaTab
            {from: './node_modules/@coderline/alphatab/dist/font/', to: 'font/[name].[ext]'},
            {from: './node_modules/@coderline/alphatab/dist/soundfont/', to: 'soundfont/[name].[ext]'},
        ]),
        
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    
    ],
};
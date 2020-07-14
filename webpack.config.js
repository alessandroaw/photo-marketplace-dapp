const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		filename: '[name].[contentHash].js',
		path: path.join(__dirname, 'dist'),
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{ test: /\.vue$/, use: 'vue-loader' },
			{ test: /\.css$/, use: ['vue-style-loader', 'css-loader'] },
			{ test: /\.(png|jpg|gif|svg)$/, use: 'file-loader' },
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new VueLoaderPlugin(),
	],
	resolve: {
		alias: {
			vue$: 'vue/dist/vue',
		},
	},
};

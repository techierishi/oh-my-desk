const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './app/index.jsx',

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					}
				]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|cur)$/,
				loader: 'file-loader',
				options: {
					name: 'assets/[path][name].[ext]',
				},
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './static/index.html'),
			inject: 'body',
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV),
			},
			'__DEV__': process.env.NODE_ENV === 'development',
			'__PROD__': process.env.NODE_ENV === 'production',
		}),
	],
	resolve: {
		alias: {
			assets: path.resolve(__dirname, 'app/assets'),
			constants: path.resolve(__dirname, 'app/constants'),
			components: path.resolve(__dirname, 'app/components'),
			containers: path.resolve(__dirname, 'app/containers'),
			routes: path.resolve(__dirname, 'app/routes'),
			store: path.resolve(__dirname, 'app/store'),
			utils: path.resolve(__dirname, 'app/utils'),
		},
		extensions: ['.js', '.jsx'],
	},
};
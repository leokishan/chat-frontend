const HtmlWebPackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const webpackPwaManifest = require('webpack-pwa-manifest');
var path = require('path');
module.exports = {
	entry: {
		polyfill: 'babel-polyfill',
		app: './src/index.js'
	},
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, '/dist'),
		publicPath: '/'
	},
	resolve: {
		extensions: [ '*', '.js', '.jsx' ]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /\.(png|svg|jpg|gif|jpeg)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			},
			{
				test: /\.(ttf|otf|woff|eot)(\?v=\d+\.\d+\.\d+)?$/,
				use: [ 'url-loader?limit=100000' ]
			}
		]
	},
	optimization: {
		moduleIds: 'hashed',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				// commons: {
				// 	chunks: "initial",
				// 	minChunks: 2,
				// 	maxInitialRequests: 5, // The default limit is too small to showcase the effect
				// 	minSize: 0 // This is example is too small to create commons chunks
				// },
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
				}
			}
		}
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html',
			favicon: './src/icon_512.png'
		})
		// new WorkboxPlugin.InjectManifest({
		// 	swSrc: './src/service-worker.js'
		// }),
		// new webpackPwaManifest({
		// 	name: 'pwa name',
		// 	short_name: 'pwa short name',
		// 	description: 'pwa description',
		// 	'theme-color': 'violet',
		// 	background_color: 'violet',
		// 	theme_color: 'violet',
		// 	gcm_sender_id: '103953800507',
		// 	icons: [
		// 		{
		// 			src: path.resolve('src/icon_512.png'),
		// 			sizes: [ 96, 128, 192, 256, 384, 512 ] // multiple sizes
		// 		}
		// 	],
		// 	ios: {
		// 		'apple-mobile-web-app-capable': 'yes',
		// 		'apple-mobile-web-app-title': 'apple title',
		// 		'apple-touch-icon': path.resolve('src/icon_512.png'),
		// 		'apple-touch-startup-image': path.resolve('src/icon_512.png')
		// 	}
		// })
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		port: 3005,
		host: '0.0.0.0',
		historyApiFallback: true,
		disableHostCheck: true
	}
};

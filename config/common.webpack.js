const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

const common = require("./common");

module.exports = (env = {}) => ({
	stats: common.webpackStats,
	target: "web",
	context: common.root,
	entry: {
		index: common.resolve("src/index.ts")
	},
	output: {
		path: common.resolve("dist"),
		publicPath: "/",
		filename: "[name].[hash].js",
		// chunkFilename: "[name].[hash].chunk.js",
		crossOriginLoading: "anonymous"
	},
	performance: {
		maxEntrypointSize: 300 * 1024,
		maxAssetSize: 250 * 1024
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "initial",
					priority: 5
				}
			}
		},
		concatenateModules: true
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				sideEffects: false,
				use: [
					env.debug && { loader: "debug-loader" },
					{ loader: "awesome-typescript-loader" }
				].filter(Boolean)
			},
			{
				enforce: "pre",
				test: /\.js$/,
				use: [{
					loader: "source-map-loader"
				}]
			},
			{
				test: /\.html$/,
				exclude: common.resolve("src/index.html"),
				use: [
					{
						loader: "aframe-super-hot-html-loader"
					},
					{
						loader: "html-require-loader",
						options: {
							root: "src"
						}
					}
				]
			}
			// {
			// 	test: [common.imageFileRegex],
			// 	use: [{
			// 		loader: "file-loader",
			// 		options: {
			// 			name: "assets/[name].[ext]"
			// 		}
			// 	}]
			// }
		]
	},
	resolve: {
		alias: {},
		extensions: [".ts", ".js"],
		modules: [
			common.resolve("src"),
			"node_modules"
		]
	},
	plugins: [
		new Dotenv(),
		new CopyPlugin([{
			from: common.resolve("assets"),
			to: common.resolve("dist/assets")
		}]),
		new HtmlWebpackPlugin({
			inject: "head",
			template: "src/index.html",
			filename: "index.html"
		})
	]
});

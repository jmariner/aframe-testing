// Config for running webpack-dev-server. Not intended for development BUILDS
const webpack = require("webpack");
const merge = require("webpack-merge");
// const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const common = require("./common");
const commonConfig = require("./common.webpack");
const aframeWatcher = require("./aframe-watcher");

const devStats = {
	excludeAssets: [common.imageFileRegex, /\.(gltf|obj|mtl|fbx)$/]
};

const config = (env = {}) => ({
	mode: "development",
	// devtool: "cheap-module-eval-source-map",
	// optimization: {
	// 	minimizer: [
	// 		new UglifyJsPlugin({
	// 			cache: true,
	// 			parallel: true,
	// 			sourceMap: true,
	// 			uglifyOptions: {
	// 				mangle: false,
	// 				keep_classnames: true,
	// 				keep_fnames: true
	// 			}
	// 		}),
	// 	]
	// },
	performance: {
		assetFilter: filename => (
			!filename.startsWith("assets/")
		)
	},
	module: {
		rules: [
			// {
			// 	test: common.vendorCssTest,
			// 	use: [
			// 		{
			// 			loader: "style-loader"
			// 		},
			// 		{
			// 			loader: "css-loader"
			// 		}
			// 	]
			// },
			// {
			// 	test: /\.css$/,
			// 	// exclude: [/node_modules/],
			// 	use: [
			// 		{
			// 			loader: "style-loader"
			// 		},
			// 		{
			// 			loader: "css-loader",
			// 			// options: common.cssLoaderOptions
			// 		}
			// 	]
			// }
		]
	},
	devServer: {
		contentBase: common.resolve("dist"),
		stats: {
			...common.webpackStats,
			...devStats
		},
		clientLogLevel: false,
		historyApiFallback: true,
		publicPath: "/",
		hot: true,
		open: false,
		overlay: true,
		compress: true,
		port: 51234,
		host: "0.0.0.0",
		before: app => aframeWatcher.setup(app, {
			folders: ["src"],
			prompt: false
		})
		// before: app => app.use(errorOverlayMiddleware())
	},
	stats: devStats,
	entry: {
		// devClient: require.resolve("react-dev-utils/webpackHotDevClient")
	},
	output: {
		libraryTarget: "var",
		library: ["A_"]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.EvalSourceMapDevToolPlugin({
			// devtool: "cheap-module-eval-source-map"
			...common.sourceMap,
			module: true,
			columns: false,
			noSources: false
		})
	]
});

module.exports = (env) => merge.smartStrategy({
	entry: "prepend",
	plugins: "append",
	output: "append",
	stats: "append"
})(commonConfig(env), config(env));

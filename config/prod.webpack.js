const webpack = require("webpack");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// const CompressionPlugin = require("compression-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const common = require("./common");
const commonConfig = require("./common.webpack");

const config = (env = {}) => ({
	mode: "production",
	optimization: {
		minimizer: [
			new TerserPlugin(),
			// new OptimizeCSSAssetsPlugin()
		]
	},
	performance: {
		assetFilter: filename => (
			filename.endsWith(".js.gz") ||
			common.imageFileRegex.test(filename) ||
			common.fontFileRegex.test(filename)
		)
	},
	module: {
		rules: [
			// {
			// 	test: /\.css$/,
			// 	// exclude: [/node_modules/],
			// 	use: [
			// 		{
			// 			// loader: MiniCssExtractPlugin.loader
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
	plugins: [
		env.analyze && new BundleAnalyzerPlugin({
			openAnalyzer: false
		}),
		// server needs to translate *.js requests into *.js.gz
		// new CompressionPlugin({
		// 	asset: "[path].gz[query]",
		// 	algorithm: "gzip",
		// 	// deleteOriginalAssets: true,
		// 	test: /\.js$/,
		// 	threshold: 10240,
		// 	minRatio: 0.8
		// }),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ["!.gitignore"],
			verbose: false
		}),
		// new MiniCssExtractPlugin({
		// 	filename: "[name].[hash].css"
		// }),
		new webpack.SourceMapDevToolPlugin({
			// devtool: "source-map"
			...common.sourceMap,
			module: false,
			columns: true,
			noSources: false
		})
	].filter(Boolean)
});

module.exports = (env) => merge.strategy({
	plugins: "prepend"
})(commonConfig(env), config(env));

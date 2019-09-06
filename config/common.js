const path = require("path");

const rootDir = path.resolve(__dirname, "..");

module.exports = {
	root: rootDir,
	webpackStats: {
		modules: false,
		hash: false,
		entrypoints: false,
		children: false,
		context: rootDir
	},
	cssLoaderOptions: {
		modules: true,
		localIdentName: "[name]-[local]"
	},
	vendorCssTest: [
		// .css files in node_modules and any .min.css files
		/node_modules[/\\].+\.css$/,
		/\.min\.css$/
	],
	imageFileRegex: /\.(bmp|gif|jpe?g|png|svg)$/,
	fontFileRegex: /\.(woff2?|ttf|eot)$/,
	sourceMap: {
		filename: "[name].[hash].js.map",
		exclude: ["vendors"],
	},
	resolve: (...parts) => path.resolve(rootDir, ...parts)
};

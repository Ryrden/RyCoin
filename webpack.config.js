const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		index: "./src/index.ts",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"), // Output directory
	},
	resolve: {
		extensions: [".ts", ".js"], // Resolve .ts and .js extensions
		fallback: {
			crypto: require.resolve('crypto-browserify'),
			stream: require.resolve('stream-browserify'),
			buffer: require.resolve('buffer'),
		},
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader", // Use ts-loader to transpile TypeScript
				exclude: /node_modules/,
			},
		],
	},
};

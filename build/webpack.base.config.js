const path = require("path")
const webpack = require("webpack")

const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const StringReplacePlugin = require("string-replace-webpack-plugin")
const StyleLintPlugin = require("stylelint-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const Vue = require("vue")
const VueI18n = require("vue-i18n")
const config = require("../config")

const messages = {
	main:	require(`../i18n/${config.language.filename}`),
	fallback: config.fallbackLanguage ?
		require(`../i18n/${config.fallbackLanguage.filename}`) : null
}

Vue.use(VueI18n)
i18n = new VueI18n({
	locale: "main",
	fallbackLocale: messages.fallback ? "fallback" : null,
	messages
})

const commonPlugins = [
	new VueLoaderPlugin(),
	new MiniCssExtractPlugin({
		filename: "css/style.[contenthash:16].css"
	}),
	new StringReplacePlugin(),
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify(config.nodeEnv),
		"PRODUCTION": config.isProduction,

		"LANGUAGE_MAIN_FILENAME": JSON.stringify(config.language.filename),
		"LANGUAGE_FALLBACK_FILENAME": config.fallbackLanguage ? JSON.stringify(config.fallbackLanguage.filename) : null,
		"LANGUAGE_ISRTL": config.language.isRTL,

		"process.env.RUNNING_ENV": JSON.stringify(config.runningEnv),

		"process.env.USE_CERTS": JSON.stringify(config.useCerts),
		"process.env.CERTS_CA": JSON.stringify(config.certsCa),
		"process.env.CERTS_CERT": JSON.stringify(config.certsCert),
		"process.env.CERTS_KEY": JSON.stringify(config.certsKey)
	}),
	new StyleLintPlugin({
		files: ["src/**/*.vue", "src/**/*.scss"],
		emitErrors: false
	})
]

const doI18n = StringReplacePlugin.replace({
	replacements: [{
		pattern: /\$ts\((.+)\)/g,
		replacement: function(fullMatch, params, offset, string) {
			params = params.split(",").map((p) => eval(p))
			if (i18n.tc(...params) === params[0]) {
				// check if the translation key is defined
				// We could have used i18n.te but it does not account for fallback languages
				// We are using this instead. Uglier but does the job
				if (config.isProduction) {
					throw new Error(`[i18n] Translation key "${params[0]}" does not exist`)
				} else { // just warn in development mode
					console.warn(`[i18n] Translation key "${params[0]}" does not exist`)
				}
			}
			return i18n.tc(...params)
		}
	}]
})

module.exports = {
	devtool: config.isProduction
		? false
		: "inline-source-map",

	entry: {
		app: "./src/entry-client.js"
	},

	output: {
		path: path.resolve(__dirname, "../dist"),
		publicPath: "/dist/",
		filename: "js/[name].[contenthash:16].js",
		chunkFilename: "js/[name].[contenthash:16].js"
	},

	mode: config.isProduction ? "production" : "development",

	resolve: {
		alias: {
			"static": path.resolve(__dirname, "../static"),
			"src": path.resolve(__dirname, "../src"),
			"components": path.resolve(__dirname, "../src/components"),
			"images": path.resolve(__dirname, "../src/images"),
			"router": path.resolve(__dirname, "../src/router"),
			"store": path.resolve(__dirname, "../src/store"),
			"styles": path.resolve(__dirname, "../src/styles"),
			"mixins": path.resolve(__dirname, "../src/mixins"),
			"views": path.resolve(__dirname, "../src/views"),
			"api": path.resolve(__dirname, "../src/api")
		},
		extensions: [".js", ".vue", ".scss"]
	},
	resolveLoader: {
		alias: {
			"scss-loader": "sass-loader"
		}
	},
	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				enforce: "pre",
				test: /\.(vue|js)$/,
				loader: "eslint-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [
					process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
					"css-loader",
					"scss-loader"
				]
			},
			{
        test: /\.css$/,
        use: [
          process.env.NODE_ENV !== "production"
            ? "vue-style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
			{
				test: /\.pug$/,
				loader: "pug-plain-loader"
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					// TODO: These options has been deprecated, try configuring them webpack-like
					preLoaders: {
						pug: doI18n,
						html: doI18n
					},
					preserveWhitespace: false,
					postcss: [
						require("autoprefixer")({ browsers: ["last 3 versions"] }),
						require("cssnano")
					]
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: "img/[name].[hash:16].[ext]"
				}
			}
		]
	},

	performance: {
		maxEntrypointSize: 250000,
		hints: config.isProduction ? "warning" : false
	},

	plugins: config.isProduction ? commonPlugins : commonPlugins.concat([
		new FriendlyErrorsPlugin()
	])
}

const webpack = require("webpack")
const merge = require("webpack-merge")

const HTMLPlugin = require("html-webpack-plugin")
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin")
// const SWPrecachePlugin = require("sw-precache-webpack-plugin")
const WorkboxPlugin = require("workbox-webpack-plugin")
//const BabiliPlugin = require("babili-webpack-plugin");

const base = require("./webpack.base.config")
const config = require("../config")

const VueSSRClientPlugin = require("vue-server-renderer/client-plugin")

// minify options to be used in production mode
// https://github.com/kangax/html-minifier#options-quick-reference
const minifyOptions = {
	collapseWhitespace: true,
	removeComments: true,
	ignoreCustomComments: [/vue-ssr-outlet/]
}

const clientConfig = merge(base, {
	plugins: [
		// strip dev-only code in Vue source
		new webpack.DefinePlugin({
			"process.env.VUE_ENV": "'client'",
			"process.env.API_HOSTNAME": JSON.stringify(config.clientApiHostname),
			"process.env.KEYCLOAK_FRONTEND_CLIENT_ID": JSON.stringify(config.clientAuthId),
			"process.env.KEYCLOAK_AUTH_REALM": JSON.stringify(config.clientAuthRealm),
			"process.env.AUTH_HOSTNAME": JSON.stringify(config.clientAuthHostname)
		}),
		// generate output HTML
		new HTMLPlugin({
			template: "src/index.template.html",
			minify: config.isProduction ? minifyOptions : {},
			alwaysWriteToDisk: false,
			config
		}),
		new HTMLPlugin({
			filename: "silent-check-sso.html",
			template: "src/silent-check-sso.template.html",
			minify: config.isProduction ? minifyOptions : {},
			inject: false,
			alwaysWriteToDisk: false,
			config
		}),
		new HtmlWebpackHarddiskPlugin(),
		new VueSSRClientPlugin()
	]
})

// Minifying JS is handled by "mode: production"
/*if (config.isProduction) {
	clientConfig.plugins.push(
		// minify JS
		new BabiliPlugin()
	)
}*/

// WIP: splitChunks optimization if necessary
if (!config.isTesting) {
	clientConfig.optimization = {
		splitChunks: {
			// Enable optimization for initial chunks too
			chunks: "all"
		}
	}
	/*clientConfig.plugins.push(
		// extract vendor chunks for better caching
		// https://github.com/Narkoleptika/webpack-everything/commit/b7902f60806cf40b9d1abf8d6bb2a094d924fff7
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: function(module) {
				return module.context && module.context.indexOf("node_modules") !== -1
			}
		}),
		// any other js goes here
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest"
		})
	)*/
}

if (config.isProduction) {
	clientConfig.plugins.push(
		// auto generate service worker
		// new SWPrecachePlugin({
		// 	cacheId: "wikitolearn",
		// 	filename: "service-worker.js",
		// 	staticFileGlobs: [
		// 		"dist/img/**/*",
		// 		"dist/**/*.{html,js,css}"
		// 	],
		// 	minify: true,
		// 	dontCacheBustUrlsMatching: /./,
		// 	runtimeCaching: [
		// 		{
		// 			urlPattern: "/",
		// 			handler: "networkFirst"
		// 		},
		// 		{
		// 			urlPattern: /\/api\/.*/,
		// 			handler: "networkFirst"
		// 		}
		// 	]
		// })
		new WorkboxPlugin.GenerateSW()
		//new webpack.optimize.ModuleConcatenationPlugin()
	)
	// On by default on "mode: production"
	//clientConfig.optimization.concatenateModules = true
}

module.exports = clientConfig

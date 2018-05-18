const config = require("./config")

module.exports = {
	parser: "babel-eslint",
	parserOptions: {
		sourceType: "module"
	},
	extends: "google",

	// required to lint *.vue files
	plugins: [
		"html"
	],

	settings: {
		"import/resolver": {
			"webpack": {
				"config": "build/webpack.base.conf.js"
			}
		}
	},

	// add your custom rules here
	rules: {
		"strict": 0,
		// don"t allow semicolons
		"semi": ["warn", "never"],

		// don"t require comma in the last line of an object/dictionary declaration
		"comma-dangle": ["warn", "never"],

		// ignore max-len for comments
		"max-len": [
			"warn",
			{ "code": 100, "ignoreComments": true, "ignoreTrailingComments": true, "ignoreUrls": true, "ignoreStrings": true }
		],

		// force space after and before curly braces in object/dict declarations
		"object-curly-spacing": ["warn", "always"],

		// allow debugger; instruction during development
		"no-debugger": config.isProduction ? 2 : 0,

		// force "===" in comparisons when ambiguous
		"eqeqeq": ["warn", "smart"],

		// force double quotes
		"quotes": ["warn", "double"],

		"indent": ["warn", "tab"],
		"no-tabs": 0,

		"require-jsdoc": 0,

		"new-cap": ["warn", { "capIsNew": false }],
		"curly": ["warn"]
	}
}

module.exports = ({ file, options, env }) => ({
	parser: "postcss-scss",
	plugins: {
		"postcss-import": {},
		"postcss-preset-env": {},
		"cssnano": env === "production" ? {} : false
	}
})

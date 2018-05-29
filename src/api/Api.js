import Vue from "vue"

const	config = {
	hostname: process.env.API_HOSTNAME,
	preamble: "api/v1"
}

let defaultOptions = {}
if (process.env.VUE_ENV === "server" && process.env.USE_CERTS === "true") {
	https = require("https")
	fs = require("fs")
	const httpsAgent = new https.Agent({
		keepAlive: true,
		ca: fs.readFileSync(process.env.CERTS_CA),
		cert: fs.readFileSync(process.env.CERTS_CERT),
		key: fs.readFileSync(process.env.CERTS_KEY)
	})

	defaultOptions = {
		httpsAgent
	}
}

class ApiClass {
	constructor() {
		this.baseURL = `${config.hostname}/${config.preamble}`
	}


	get(endpoint, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		options = Object.assign(options, defaultOptions)

		return Vue.axios.get(`${this.baseURL}/${endpoint}`, options)
			.then((response) => {
				return Promise.resolve(response.data)
			})
	}

	post(endpoint, data = {}, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		options = Object.assign(options, defaultOptions)

		return Vue.axios.post(`${this.baseURL}/${endpoint}`, data, options)
			.then((response) => {
				return Promise.resolve(response.data)
			})
	}

	patch(endpoint, data = {}, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		options = Object.assign(options, defaultOptions)

		return Vue.axios.patch(`${this.baseURL}/${endpoint}`, data, options)
			.then((response) => {
				return Promise.resolve(response.data)
			})
	}

	_cleanEndpoint(endpoint) {
		if (endpoint.startsWith("/")) {
			endpoint = endpoint.substring("/")
		}
		return endpoint
	}
}

export const Api = new ApiClass()

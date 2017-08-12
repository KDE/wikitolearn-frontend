import Vue from "vue"

const	config = {
	hostname: process.env.API_HOSTNAME,
	preamble: "api/v1"
}

class ApiClass {
	constructor() {
		this.baseURL = `${config.hostname}/${config.preamble}`
	}

	get(endpoint, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		return Vue.axios.get(`${this.baseURL}/${endpoint}`, options)
			.then((response) => {
				return Promise.resolve(response.data)
			})
	}

	post(endpoint, data = {}, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		return Vue.axios.get(`${this.baseURL}/${endpoint}`, data, options)
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

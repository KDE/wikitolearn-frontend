import axios from "axios"

const config = {
	protocol: "http",
	host: "localhost:9000",
	preamble: "api/v1"
}

class ApiClass {
	constructor() {
		this.baseUrl = `${config.protocol}://${config.host}/${config.preamble}`
	}

	get(endpoint, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		return axios.get(`${this.baseUrl}/${endpoint}`, options)
	}

	post(endpoint, data = {}, options = {}) {
		endpoint = this._cleanEndpoint(endpoint)

		return axios.get(`${this.baseUrl}/${endpoint}`, data, options)
	}

	_cleanEndpoint(endpoint) {
		if (endpoint.startsWith("/")) {
			endpoint = endpoint.substring("/")
		}
		return endpoint
	}
}

export const Api = new ApiClass()

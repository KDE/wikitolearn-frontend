import { Api } from "./Api"

class PollingClass {
	start() {
		return Api.get("polling/")
	}

	getStatus(pollingId) {
		return Api.get(`polling/${pollingId}`)
	}
}

export const Polling = new PollingClass()

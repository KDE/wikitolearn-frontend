import { expect } from "chai"

const ApiInjector = require("inject-loader!api/Api")
const Api = ApiInjector({
	"vue": {
		"axios": {
			get(url) {
				if (url === "failme") {
					return Promise.reject({
						data: {
							error: "Error",
							status: 400
						}
					})
				}

				return Promise.resolve({
					data: {
						status: 418
					}
				})
			}
		}
	}
}).Api

describe("api/Api", () => {
	it("gets a basic resource", () => {
		Api.get("/")
			.then((data) => {
				expect(data.status).to.equal(418)
			})
	})

	it("handle fails", () => {
		Api.get("/")
			.catch((error) => {
				expect(error.error).to.equal("Error")
				expect(error.status).to.equal(400)
			})
	})
})

import { Api } from "./Api"

class PagesClass {
	get(title) {
		return Api.get(`pages/${title}`)
	}

	patch({ pageId }, params, options) {
		return Api.patch(`pages/${pageId}`, params, options)
	}

	delete({ pageId }, options) {
		return Api.delete(`pages/${pageId}`, options)
	}
}

export const Pages = new PagesClass()

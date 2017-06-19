import { Api } from "./Api"

class PagesClass {
	get(title) {
		return Api.get(`pages/${title}`)
	}
}

export const Pages = new PagesClass()

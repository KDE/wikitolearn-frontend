import { Api } from "./Api"

class ChaptersClass {
	get(title) {
		return Api.get(`chapters/${title}`)
	}
}

export const Chapters = new ChaptersClass()

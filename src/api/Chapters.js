import { Api } from "./Api"

class ChaptersClass {
	get(title) {
		return Api.get(`chapters/${title}`)
	}

	patch({ chapterId }, params, options) {
		return Api.patch(`chapters/${chapterId}`, params, options)
	}

	delete({ chapterId }, options) {
		return Api.delete(`chapters/${chapterId}`, options)
	}

	patchPages({ chapterId }, params, options) {
		return Api.patch(`chapters/${chapterId}/pages`, params, options)
	}

	postPage({ chapterId }, params, options) {
		return Api.post(`chapters/${chapterId}/pages`, params, options)
	}
}

export const Chapters = new ChaptersClass()

import { Api } from "./Api"

class CoursesClass {
	get(courseName) {
		return Api.get(`courses/${courseName}`)
	}

	getAll(page=1) {
		if (page === 1) {
			return Api.get("courses")
		} else {
			return Api.get(`courses?page=${page}`)
		}
	}

	patch({ courseName }, params, options) {
		return Api.patch(`courses/${courseName}`, params, options)
	}

	patchChapters({ courseName }, params, options) {
		return Api.patch(`courses/${courseName}/chapters`, params, options)
	}

	postChapter({ courseName }, params, options) {
		return Api.post(`courses/${courseName}/chapters`, params, options)
	}
}

export const Courses = new CoursesClass()

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

	patch(courseName, course, options) {
		return Api.patch(`courses/${courseName}`, course, options)
	}
}

export const Courses = new CoursesClass()

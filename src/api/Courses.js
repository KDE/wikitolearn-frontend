import { Api } from "./Api"

class CoursesClass {
	get(courseName) {
		return Api.get(`courses/${courseName}`)
	}

	getAll(page=1) {
		return Api.get(`courses?page=${page}`)
	}
}

export const Courses = new CoursesClass()

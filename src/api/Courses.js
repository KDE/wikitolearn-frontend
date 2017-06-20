import { Api } from "./Api"

class CoursesClass {
	get(courseName) {
		return Api.get(`courses/${courseName}`)
	}
}

export const Courses = new CoursesClass()

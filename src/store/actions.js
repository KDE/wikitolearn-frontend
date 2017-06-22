import { Categories } from "api/Categories"
import { Courses } from "api/Courses"
import { Pages } from "api/Pages"


export const actions = {
	FETCH_ROOT_CATEGORIES({ commit }) {
		return Categories.getRootCategories()
			.then((response) => {
				commit("SET_ROOT_CATEGORIES", { categories: response.data })
			})
	},

	FETCH_CATEGORY({ commit }, { categoryName }) {
		return Categories.get(categoryName)
			.then((response) => {
				commit("SET_CATEGORY", { category: response.data })
			})
	},

	FETCH_COURSE({ commit }, { courseName }) {
		return Courses.get(courseName)
			.then((response) => {
				commit("SET_COURSE", { course: response.data })
			})
	},

	FETCH_PAGE({ commit }, { pageTitle }) {
		return Pages.get(pageTitle)
			.then((response) => {
				commit("SET_PAGE", { page: response.data })
			})
	}
}

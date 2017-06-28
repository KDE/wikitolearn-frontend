import Vue from "vue"

export const mutations = {
	SET_ROOT_CATEGORIES(state, { categories }) {
		state.rootCategories = categories
	},

	SET_CATEGORY(state, { category }) {
		Vue.set(state.categories, category.name, category)
	},

	SET_COURSE(state, { course }) {
		Vue.set(state.courses, course.name, course)
	},

	SET_PAGE(state, { page }) {
		Vue.set(state.pages, page.title, page)
	},

	SET_ERROR(state, { error }) {
		state.error = Object.assign({}, error)
	},

	CLEAR_ERROR(state) {
		state.error = null
	}
}

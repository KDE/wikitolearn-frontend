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
	}
}

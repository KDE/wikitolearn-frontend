import { Categories } from "api/Categories"
import { Courses } from "api/Courses"
import { Pages } from "api/Pages"
import { Chapters } from "api/Chapters"
import { Polling } from "api/Polling"
import { Api } from "api/Api"


export const actions = {
	FETCH_HOME({ commit }) {
		return Api.get("")
			.then((response) => {
				commit("SET_NAVIGATION_LINKS", { navigationLinks: response._links })
			})
	},

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
				const resp = Object.assign({}, response)
				commit("SET_COURSE", { course: resp })
				for (const chapter of resp.chapters) {
					commit("SET_CHAPTER", { chapter: chapter })
				}
				return response
			}).then((response) => {
				commit("SET_NAVIGATION_LINKS", { navigationLinks: response._links })
			})
	},

	FETCH_COURSES({ commit }, { page }) {
		return Courses.getAll(page)
			.then((response) => {
				const resp = Object.assign({}, response)
				commit("CLEAR_COURSES")
				for (const course of resp._items) {
					commit("SET_COURSE", { course: course })
				}
				return response
			}).then((response) => {
				commit("SET_NAVIGATION_LINKS", { navigationLinks: response._links })
				return response
			}).then((response) => {
				commit("SET_META", { meta: response._meta })
			})
	},

	FETCH_PAGE({ commit }, { pageTitle }) {
		return Pages.get(pageTitle)
			.then((response) => {
				commit("SET_PAGE", { page: response })
			})
	},

	FETCH_CHAPTER({ commit }, { chapterName }) {
		return Chapters.get(chapterName)
			.then((response) => {
				const resp = Object.assign({}, response)
				commit("SET_CHAPTER", { page: resp })
				for (const page of resp.pages) {
					commit("SET_PAGE", { page: page })
				}
			})
	},

	START_POLLING({ commit }) {
		return Polling.start()
			.then((response) => {
				const pollingId = response.data.pollingId

				const pollTimer = setInterval(() => {
					Polling.getStatus(pollingId)
						.then((response) => {
							commit("UPDATE_POLLING", { pollingId, progress: response.data.progress })
						})
				}, 500)

				commit("CREATE_POLLING", { pollingId, pollTimer })
			})
	},

	UPDATE_ACTIVE_REQUESTS({ commit }, { add }) {
		commit("UPDATE_ACTIVE_REQUESTS", { addNewRequest: add })
	},

	PATCH_COURSE({ commit, dispatch }, { courseName, course, options }) {
		return Courses.patch(courseName, course, options)
			.then((response) => {
				return dispatch("FETCH_COURSE", { courseName })
			})
	},

	PATCH_COURSE_CHAPTERS({ commit, dispatch }, { courseName, course, options }) {
		return Courses.patchChapters(courseName, course, options)
			.then((response) => {
				return dispatch("FETCH_COURSE", { courseName })
			})
	},

	POST_CHAPTER({ commit, dispatch }, { courseName, course, options }) {
		return Courses.postChapter(courseName, course, options)
			.then((response) => {
				return dispatch("FETCH_COURSE", { courseName })
			})
	},

	SET_ERROR({ commit }, { error }) {
		commit("EMPTY_ERROR")
		commit("SET_ERROR", { error: error })
	}
}

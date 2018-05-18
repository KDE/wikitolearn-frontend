import Vue from "vue"
import Vuex from "vuex"

import { actions } from "./actions"
import { mutations } from "./mutations"

Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state: {
			rootCategories: null,
			categories: {},
			courses: {},
			pages: {},
			chapters: {},

			pollingOperations: {},
			navigationLinks: {},
			meta: {},
			error: null,
			activeApiRequests: 0
		},
		actions,
		mutations
	})
}

/*
// TODO: move to entry-client.js
if (module.hot) {
	module.hot.accept([
		"./actions",
		"./mutations"
	], () => {
		store.hotUpdate({
			actions: require("./actions").actions,
			mutations: require("./mutations").mutations
		})
	})
}*/

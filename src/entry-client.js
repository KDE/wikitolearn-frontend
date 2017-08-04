import Vue from "vue"
import "es6-promise/auto"
import { createApp } from "./app"

import ProgressBar from "components/ProgressBar"
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
})

const { app, router, store } = createApp()

Vue.router = router
Vue.use(require("@websanova/vue-auth"), {
	auth: require("@websanova/vue-auth/drivers/auth/bearer.js"),
	http: require("@websanova/vue-auth/drivers/http/axios.1.x.js"),
	router: require("@websanova/vue-auth/drivers/router/vue-router.2.x.js")
})

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
	// Add router hook for handling asyncData.
	// Doing it after initial route is resolved so that we don't double-fetch
	// the data that we already have. Using router.beforeResolve() so that all
	// async components are resolved.
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		let diffed = false

		if (store.state.error) store.commit("CLEAR_ERROR")

		const activated = matched.filter((c, i) => {
			return diffed || (diffed = (prevMatched[i] !== c))
		})

		const asyncDataHooks = activated.map((c) => c.asyncData).filter((_) => _)
		if (!asyncDataHooks.length) {
			bar.hide(true)
			return next()
		}

		bar.start()
		Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
			.then(() => {
				bar.finish()
				next()
			})
			.catch((error) => {
				bar.set(100)
				bar.fail()
				console.error(error)
			})
	})

	// actually mount to DOM
	app.$mount("#app")
})

// service worker
if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js")
} else {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
		console.log("Unregistering service workers for development")
		for (let registration of registrations) {
			registration.unregister()
		}
	})
}

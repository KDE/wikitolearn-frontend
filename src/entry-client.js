import Vue from "vue"
import "es6-promise/auto"
import { createApp } from "./app"

if (!window.location.origin) {
	window.location.origin = window.location.protocol + "//"
		+ window.location.hostname
		+ (window.location.port ? ":" + window.location.port : "")
}

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

import VueKeycloak from "vue-keycloak"

Vue.use(VueKeycloak, {
	keycloakOptions: {
		"realm": process.env.KEYCLOAK_AUTH_REALM,
		"url": `${process.env.AUTH_HOSTNAME}/auth`,
		"ssl-required": "external",
		"resource": process.env.KEYCLOAK_AUTH_REALM,
		"public-client": true,
		"clientId": process.env.KEYCLOAK_FRONTEND_CLIENT_ID
	},
	keycloakInitOptions: {
		onLoad: "check-sso"
	}
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
			return next()
		}

		Promise.all(asyncDataHooks.map((hook) => hook({ store, route: to })))
			.then(() => {
				next()
			})
			.catch((error) => {
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

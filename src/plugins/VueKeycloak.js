import Keycloak from "keycloak-js"

let installed = false
const defaultOptions = {
	keycloakOptions: {},
	keycloakInitOptions: {},
	refreshTime: 10
}

export default class VueKeyCloak {
}

VueKeyCloak.install = (Vue, options = {}) => {
	if (installed) return
	installed = true

	const mergedOptions = Object.assign({}, defaultOptions, options)

	const keycloak = Keycloak(mergedOptions.keycloakOptions)

	const watch = new Vue({
		data() {
			return {
				ready: false,
				authenticated: false,
				user: null,
				token: null,
				resourceAccess: null
			}
		}
	})

	keycloak.init(mergedOptions.keycloakInitOptions).then((isAuthenticated) => {
		updateWatchVariables(isAuthenticated).then(() => {
			watch.ready = true
		})

		if (isAuthenticated) {
			setInterval(() => {
				keycloak.updateToken(mergedOptions.refreshTime + 2)
					.then((refreshed) => {
						if (refreshed) updateWatchVariables(true)
					})
			}, mergedOptions.refreshTime * 1000)
		}
	}).catch((err) => {
		updateWatchVariables(false).then(() => {
			watch.ready = true
		})
	})

	function updateWatchVariables(isAuthenticated = false) {
		watch.authenticated = isAuthenticated

		if (isAuthenticated) {
			watch.token = keycloak.token
			watch.resourceAccess = keycloak.resourceAccess
			return keycloak.loadUserProfile().then((user) => {
				watch.user = user
			}).catch((err) => {
				watch.user = null
			})
		} else {
			return Promise.resolve()
		}
	}

	Object.defineProperty(Vue.prototype, "$keycloak", {
		get() {
			keycloak.ready = watch.ready
			keycloak.user = watch.user
			return keycloak
		}
	})
}

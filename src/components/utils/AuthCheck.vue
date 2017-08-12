<script>
/* export default {
	name: "AuthCheck",
	beforeMount() {
		this.$keycloak.init({ onLoad: "check-sso" }).success((authenticated) => {
		})
	},
	methods: {
		handleRedirect() { // this method will check if the current route has metadata, check for login, and redirect if not logged in. It is a simple proof of concept, it still needs better checks
			this.$auth.options.checkAuthenticated.call(this.$auth, () => {
				if (Object.keys(this.$route.meta).length !== 0) {
					if (this.$auth.check()) {
						console.log("You are authorized")
					} else {
						console.log("You are not authorized")
						this.$router.replace(this.$auth.options.authRedirect.path) // send to login
					}
				} else {
					console.log("No need to check auth") // no meta specified
				}
			})
		}
	},
	render(h) {
		// this will render nothing
		return h(null)
	}
} */
</script>

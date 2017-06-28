import Error from "components/Error"

export default {
	components: { Error }, // expose the component to visualize the error
	beforeDestroy() {
		if (!module.hot) { // don't clear the error in case of hot reload
			this.$store.commit("CLEAR_ERROR") // unset the error in the store
		}
	},
	computed: {
		error() {
			return this.$store.state.error
		}
	}
}

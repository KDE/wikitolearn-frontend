import Error from "components/Error"

export default {
	components: { Error }, // expose the component to visualize the error
	beforeDestroy() {
		if (this.error) this.$store.commit("CLEAR_ERROR") // unset the error in the store
	},
	computed: {
		error() {
			return this.$store.state.error
		}
	}
}

import Error from "components/Error"

export default {
	components: { Error }, // expose the component to visualize the error
	computed: {
		error() {
			return this.$store.state.error
		}
	}
}

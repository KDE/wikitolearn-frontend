import Error from "components/Error"

export default {
	components: { Error },
	mounted() {
		const meta = getMeta(this)
		if (meta) {
			document.title = `${meta.title} - WikiToLearn`
			document.querySelector("meta[name=description]")
				.setAttribute("content", meta.description)
		}
	},
	data() {
		return {
			internal_error: null
		}
	},
	beforeMount() {
		this.internal_error = this.$store.state.error
	},
	beforeDestroy() {
		this.$store.commit("CLEAR_ERROR")
	},
	computed: {
		error() {
			return this.internal_error || this.$store.state.error
		}
	}
}

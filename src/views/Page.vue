<template lang="pug">
	.view--Page
		PageRenderer(v-if="error == null", :page="page")
		p(v-if="error != null") {{ error.error }}
</template>

<style lang="scss">
.view--Page {
	.Page__PageRenderer {
		border: 1px solid black;
	}
}
</style>

<script>
import PageRenderer from "components/PageRenderer"

export default {
	name: "Page",
	components: { PageRenderer },
	data() {
		return {
			internal_error: null
		}
	},
	beforeMount() {
		this.internal_error = this.$store.state.error
		this.$store.commit("CLEAR_ERROR")
	},
	computed: {
		error() {
			return this.internal_error || this.$store.state.error
		},
		page() {
			return this.$store.state.pages[this.$route.params.pageTitle]
		},
		pageTitle() {
			if (this.page) {
				return this.page.displayTitle
			} else {
				return this.$route.params.pageTitle
			}
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_PAGE", { pageTitle: route.params.pageTitle })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error.response.data })
			})
	},
	meta() {
		return {
			title: this.pageTitle,
			description: "This is the meta description for the page"
		}
	}
}
</script>

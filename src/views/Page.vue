<template lang="pug">
	.view--Page
		Error(:error="error")
		PageRenderer(v-if="!error", :page="page")
</template>

<style lang="scss">
.view--Page {
	.PageRenderer {
		border: 1px solid black;
	}
}
</style>

<script>
import PageRenderer from "components/PageRenderer"
import ErrorHandler from "mixins/errorHandler"

export default {
	name: "Page",
	mixins: [ErrorHandler],
	components: { PageRenderer },
	computed: {
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

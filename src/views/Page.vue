<template lang="pug">
	.view--Page
		PageRenderer.Page__PageRenderer(:page="page")
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
	computed: {
		page() {
			return this.$store.state.pages[this.$route.params.pageTitle]
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_PAGE", { pageTitle: route.params.pageTitle })
	},
	meta() {
		return {
			title: this.page.displayTitle,
			description: "This is the meta description for the page"
		}
	}
}
</script>

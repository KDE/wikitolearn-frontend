<template lang="pug">
	.view--Page
		template(v-if="page")
			ClientOnly
				PageRenderer(
					v-if="page",
					:page="page"
				)
</template>

<script>
import PageRenderer from "components/PageRenderer"

export default {
	name: "Page",
	components: { PageRenderer },
	asyncData({ store, route }) {
		return store.dispatch("FETCH_PAGE", { pageTitle: route.params.pageTitle })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	computed: {
		page() {
			return this.$store.state.pages[this.$route.params.pageTitle]
		},
		pageTitle() {
			if (this.page) {
				return this.page.title
			} else {
				return this.$route.params.pageTitle
			}
		}
	},
	meta() {
		return {
			title: this.pageTitle,
			description: "This is the meta description for the page",
			httpStatusCode: this.page ? 200 : 404
		}
	}
}
</script>

<style lang="scss">
.view--Page {
	&__buttons {
		margin-bottom: 1rem;
		text-align: right;
	}
}
</style>

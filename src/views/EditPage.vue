<template lang="pug">
	.view--EditPage
		h1.EditPage__title {{ pageTitle }}
		PageEditor(
			v-if="page",
			:page="page"
		)
</template>

<script>
import PageEditor from "components/PageEditor"

export default {
	name: "EditPage",
	components: { PageEditor },
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
	asyncData({ store, route }) {
		return store.dispatch("FETCH_PAGE", { pageTitle: route.params.pageTitle })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	meta() {
		return {
			title: "Editing: " + this.pageTitle,
			description: "This is the meta description for the page",
			httpStatusCode: this.page ? 200 : 404
		}
	}
}
</script>

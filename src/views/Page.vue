<template lang="pug">
	.view--Page
		template(v-if="!error && page")
			.view--Page__buttons
				router-link(
					:to=`{
						name: 'EditPage',
						params: { pageTitle: $route.params.pageTitle }
					}`
				)
					WTLButton(type="success", icon="mode_edit") Edit Page
			PageRenderer(
				v-if="!error && page",
				:page="page"
			)

		Error(:error="error")
</template>

<style lang="scss">
.view--Page {
	.PageRenderer {
		background-color: white;
	}

	&__buttons {
		margin-bottom: 1rem;
		text-align: right;
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
			description: "This is the meta description for the page",
			httpStatusCode: this.page ? 200 : 404
		}
	}
}
</script>

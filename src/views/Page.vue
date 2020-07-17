<template lang="pug">
	ViewFrame(v-if="page")
		template(slot="title")
			h1 {{page.title}}
		template(slot="actions")
			router-link(
				:to=`{
					name: 'EditPage',
					params: { pageTitle: $route.params.pageTitle }
				}`
			)
				WTLButton(
					v-if="$keycloak && $keycloak.authenticated"
					type="success",
					icon="mode_edit"
					:tooltip="$t('edit')"
				)
		template(slot="content")
			ClientOnly
				PageRenderer(
					:page="page"
				)
</template>

<script>
import PageRenderer from "components/PageRenderer"
import ViewFrame from "components/ViewFrame"

export default {
	name: "Page",
	components: { PageRenderer, ViewFrame },
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
</style>

<template lang="pug">
	ViewFrame(v-if="page")
		template(slot="title")
			Editable(
				as="h1",
				:value="newPage ? newPage.title : page.title"
				@input="handleTitleUpdate"
			)
		template(slot="actions")
			WTLButton(
					v-if="$keycloak && $keycloak.authenticated"
					type="success",
					icon="save",
					:tooltip="$t('save')"
					:disabled="!canSavePage"
					@click="patchPage",
				)
		template(slot="content")
			ClientOnly
				PageEditor(
					v-if="page",
					:value="newPage ? newPage.content : page.content"
					@input="handleContentUpdate"
				)
</template>

<script>
import PageEditor from "components/PageEditor"
import Editable from "components/ui/Editable"
import ViewFrame from "components/ViewFrame"
import WTLButton from "components/ui/WTLButton"

export default {
	name: "EditPage",
	components: { PageEditor, Editable, ViewFrame, WTLButton },
	asyncData({ store, route }) {
		return store.dispatch("FETCH_PAGE", { pageTitle: route.params.pageTitle })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	data() {
		return {
			newPage: null
		}
	},
	computed: {
		page() {
			const page = this.$store.state.pages[this.$route.params.pageTitle]
			if (!page) return page
			return Object.assign({}, page, {
				content: this.parseMediaWikiText(page.content)
			})
		},
		pageTitle() {
			if (this.page) {
				return this.page.title
			} else {
				return this.$route.params.pageTitle
			}
		},
		isTitleDirty() {
			return this.newPage && this.page.title !== this.newPage.title
		},
		isContentDirty() {
			return this.newPage && this.page.content !== this.newPage.content
		},
		isDirty() {
			return this.isTitleDirty || this.isContentDirty
		},
		canSavePage() {
			return this.isDirty && this.newPage.title.trim() !== ""
		}
	},
	methods: {
		handleTitleUpdate(value) {
			this.handlePageUpdate({ title: value })
		},
		handleContentUpdate(value) {
			this.handlePageUpdate({ content: value })
		},
		handlePageUpdate(data) {
			this.newPage = this.newPage ?
				Object.assign({}, this.newPage, data) :
				Object.assign({}, this.page, data)
		},
		patchPage() {
			this.$store.dispatch("PATCH_PAGE", {
				urlParams: {
					pageId: this.page._id
				},
				bodyParams: {
					...this.newPage
				},
				options: {
					headers: {
						"If-Match": this.page._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		}
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

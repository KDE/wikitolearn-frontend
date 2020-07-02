<template lang="pug">
	ViewFrame
		template(slot="title")
			Editable(as="h1", v-model="newPage.title")
		template(slot="actions")
			WTLButton(
					type="success",
					icon="save",
					:tooltip="$t('save')"
					:disabled="!canSavePage"
					@click="patchPage",
				)
		template(slot="content")
			WTLEditor(v-model="newPage.content")
</template>

<script>
import Editable from "components/ui/Editable"
import ViewFrame from "components/ViewFrame"
import WTLButton from "components/ui/WTLButton"

export default {
	name: "Editor",
	components: {
		Editable,
		ViewFrame,
		WTLButton,
		WTLEditor: () => import("components/ui/WTLEditor")
	},
	props: {
		page: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			newPage: {
				title: this.page.title,
				language: this.page.language,
				content: this.parseMediaWikiText(this.page.content)
			}
		}
	},
	computed: {
		initialPage() {
			return {
				title: this.page.title,
				language: this.page.language,
				content: this.parseMediaWikiText(this.page.content)
			}
		},
		isDirty() {
			return ["title", "language", "content"].some((property) => this.initialPage[property] !== this.newPage[property])
		},
		canSavePage() {
			return this.newPage.title.trim() !== "" && this.isDirty
		}
	},
	methods: {
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
	}
}
</script>

<style lang="scss">
</style>

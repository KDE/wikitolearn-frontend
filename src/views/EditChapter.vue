<template lang="pug">
	ViewFrame
		template(slot="title")
			h1 {{ chapterName }}
		template(slot="actions")
			WTLButton(
				v-if="$keycloak && $keycloak.authenticated && false"
				@click="() => {}"
				icon="save"
				:tooltip="$t('save')"
				type="success"
			)
		template(slot="content")
			ChapterEditor(
			v-if="chapter",
			:chapter="chapter"
		)
</template>

<script>
import ChapterEditor from "components/ChapterEditor"
import ViewFrame from "components/ViewFrame"

export default {
	name: "EditChapter",
	components: { ChapterEditor, ViewFrame },
	asyncData({ store, route }) {
		return store.dispatch("FETCH_CHAPTER", { chapterName: route.params.chapterName })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	computed: {
		chapter() {
			return this.$store.state.chapters[this.$route.params.chapterName]
		},
		chapterName() {
			if (this.chapter) {
				return this.chapter.title
			} else {
				return this.$route.params.chapterName
			}
		}
	},
	meta() {
		return {
			title: "Editing: " + this.chapterName,
			description: "This is the meta description for the page",
			httpStatusCode: this.chapter ? 200 : 404
		}
	}
}
</script>

<style>
</style>

<template lang="pug">
	.view--EditChapter
		h1.EditChapter__title {{ chapterName }}
		ChapterEditor(
			v-if="chapter",
			:chapter="chapter"
		)
</template>

<script>
import ChapterEditor from "components/ChapterEditor"

export default {
	name: "EditChapter",
	components: { ChapterEditor },
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
.EditChapter__title {
	width: 100%;
	text-align: center;
	margin-bottom: 1rem;
	margin-top: 1rem;
}
</style>

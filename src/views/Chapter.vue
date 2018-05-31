<template lang="pug">
	.view--Course
		h3.CourseRenderer__name {{ chapterName }}
		ul
			li(
				v-for="page in chapter.pages"
			)
				router-link(:to=`{
					name: "Page",
					append: true,
					params: {
						pageTitle: page._id
					}
				}`) {{ page.title }}
</template>

<script>

export default {
	name: "Chapter",
	computed: {
		chapterName() {
			if (this.chapter) {
				return this.chapter.title
			} else {
				return this.$route.params.chapterName
			}
		},
		chapter() {
			return this.$store.state.chapters[this.$route.params.chapterName]
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_CHAPTER", { chapterName: route.params.chapterName })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	meta() {
		return {
			title: this.chapterName,
			description: "This is the meta description for the chapter page"
		}
	}
}
</script>


<style lang="scss">
.CourseRenderer {
	padding: 2rem;

	&__description {
		font-style: italic;
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: whitesmoke;
		border: 1px solid gray;
	}

	&__level-two {
		margin-bottom: 1rem;
		flex: 0 0 33%;

		&__container {
			display: flex;
			flex-wrap: wrap;
		}
	}
}
</style>

<template lang="pug">
	.CourseRenderer
		h3.CourseRenderer__name(v-if="showName") {{ course.name }}
		ul.CourseRenderer__chapters
			li.CourseRenderer__chapter(
				v-for="(chapter, index) in course.chapters"
				:key="chapter._id"
			)
				ChapterPages(
					:chapter="chapter"
					:number="index + 1"
				)
			//
				router-link(:to=`{
					name: "Chapter",
					append: true,
					params: {
						chapterName: chapter._id
					}
				}`) {{ chapter.title }}
</template>

<style lang="scss">
@import "~styles/declarations";

.CourseRenderer {
	padding: 2rem;

	&__description {
		font-style: italic;
		margin-bottom: 2rem;
		padding: 1rem;
		background-color: whitesmoke;
		border: 1px solid gray;
	}

	&__chapters {
		display: flex;
		flex-wrap: wrap;
	}

	&__chapter {
		flex: 0 0 95%;
	}

	@include media-breakpoint-up(md) {
		&__chapter {
			margin: 0 0.5rem 0.5rem 0.5rem;
			flex: 0 0 42%;
		}
	}

	@include media-breakpoint-up(xl) {
		&__chapter {
			flex: 0 0 30%;
		}
	}
}
</style>

<script>
import ChapterPages from "components/ChapterPages"

export default {
	name: "CourseRenderer",
	components: { ChapterPages },
	props: {
		course: {
			type: Object,
			required: true
		},
		showName: {
			type: Boolean,
			default: true
		}
	}
}
</script>

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
					:courseName="course._id"
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

<style lang="scss">
@import "~styles/declarations";

.CourseRenderer {
	background-color: white;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	padding: 1rem;

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
		list-style: none;
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

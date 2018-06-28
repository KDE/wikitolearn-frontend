<template lang="pug">
	.CourseEditor
		div
			h2 Change course's title
			WTLField(grouped=true)
				WTLInput.CourseEditor__title(
					v-model="newCourse.title"
				)
				WTLButton(
					@click="patchCourse"
					icon="done"
					type="success"
				) Update course title
		div
			h2 Change chapter order by dragging them
			VueDraggable.CourseEditor__chapters(
				v-if="newChapters"
				v-model="newChapters"
				@start="drag=true"
				@end="drag=false"
			)
				.CourseEditor__chapter(
					v-for="chapter in newChapters"
					:key="chapter._id"
				) 
					WTLIcon(icon="swap_vertical")
					| {{ chapter.title }}
			div.flex-container.flex-content-end
				h3 Confirm changes?
				WTLButton(
					@click="patchCourseChapters"
					icon="done"
					type="success"
				) Update chapters order
		div
			h2 Insert new chapter
			WTLField(grouped=true)
				WTLInput.CourseEditor__new-chapter(
					v-model="newChapter.title"
					placeholder="Insert title"
				)
				WTLButton(
					@click="postChapter"
					icon="done"
					type="success"
				) Add new chapter
</template>

<style lang="scss">
@import "~styles/declarations";

.CourseEditor {
	background-color: white;
	box-shadow: $shadow-1;
	padding: 1rem;

	> div {
		background-color: $white-bg;
		border-top: 2px solid;
		border-image: $border-image-wtl;
		padding: 1rem;
		margin-bottom: 1rem;

		> .flex-container {
			margin-top: 1rem;
			margin-bottom: 1rem;
		}

		> h2 {
			margin-bottom: 0.5rem;
		}
	}

	&__chapter {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		background-color: white;
		box-shadow: $shadow-1;
		margin: 0.25rem;

		> .WTLIcon.material-icons {
			font-size: 1.5rem;
		}
	}

	@include media-breakpoint-up(md) {
		&__chapters {
			width: 40%;
			margin-left: auto;
			margin-right: auto;
		}

		&__chapter {
			width: 100%;
			margin: 0.5rem;
			padding: 1rem;
		}
	}
}
</style>

<script>
import WTLButton from "components/ui/WTLButton"
import WTLInput from "components/ui/WTLInput"
import VueDraggable from "vuedraggable"

export default {
	name: "CourseEditor",
	components: { WTLInput, WTLButton, VueDraggable },
	data() {
		return {
			newCourse: {
				title: this.course.title,
				language: this.course.language
			},
			newChapters: this.course.chapters,
			newChapter: {
				title: ""
			},
			errorMsg: ""
		}
	},
	props: {
		course: {
			type: Object,
			required: true
		}
	},
	mounted() {

	},
	methods: {
		patchCourse() {
			this.$store.dispatch("PATCH_COURSE", {
				courseName: this.course._id,
				course: this.newCourse,
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		patchCourseChapters() {
			this.$store.dispatch("PATCH_COURSE_CHAPTERS", {
				courseName: this.course._id,
				course: {
					...this.course,
					chapters: this.slice(this.newChapters, ["_id", "_version"])
				},
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		postChapter() {
			this.$store.dispatch("POST_CHAPTER", {
				courseName: this.course._id,
				course: {
					...this.course,
					chapters: [
						...this.slice(this.course.chapters, ["_id", "_version"]),
						this.newChapter
					]
				},
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				// Update chapter list
				this.newChapters = this.course.chapters
			}).catch((error) => {
				console.log(error)
				return this.$store.commit("SET_ERROR", { error: error })
			})
		}
	}
}
</script>

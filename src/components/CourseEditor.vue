<template lang="pug">
	.CourseEditor
		h2 Change course's title
		br
		WTLField(grouped=true)
			WTLInput.CourseEditor__title(
				v-model="newCourse.title"
			)
			WTLButton(
				@click="patchCourse"
				icon="done"
				type="success"
			) Update course title
		br
		br
		h2 Change chapter order by dragging them
		hr
		VueDraggable.CourseEditor__chapters(
			v-if="newChapters"
			v-model="newChapters"
			@start="drag=true"
			@end="drag=false"
		)
			.CourseEditor__chapter(
				v-for="chapter in newChapters"
				:key="chapter._id"
			) {{ chapter.title }}
		br
		WTLButton(
			@click="patchCourseChapters"
			icon="done"
			type="success"
		) Update chapters order
		h2 Insert new chapter
		br
		WTLInput.CourseEditor__new-chapter(
			v-model="newChapter.title"
			placeholder="Chapter's title"
		)
		br
</template>

<style lang="scss">
@import "~styles/declarations";

.CourseEditor {
	padding: 2rem;
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
					chapters: this.newChapters
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
		pushChapter() {
			/* this.$store.dispatch("PATCH_COURSE", {
				courseName: this.course._id,
				course: this.newCourse,
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				console.log(error)
				return this.$store.commit("SET_ERROR", { error: error })
			})*/
		}
	}
}
</script>

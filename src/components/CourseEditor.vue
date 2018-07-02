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
			.CourseEditor__chapters-container
				ol.CourseEditor__old-chapters
					li.CourseEditor__chapter(v-for="(chapter, index) in course.chapters") {{ index+1 }}. {{ chapter.title }}
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

	&__chapters-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}


	&__old-chapters {
		display:none;
	}

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

	&__chapters {
		width: 100%;
	}

	&__chapter {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		background-color: white;
		box-shadow: $shadow-1;
		margin: 0.25rem 0;

		> .WTLIcon.material-icons {
			font-size: 1.5rem;
		}
	}

	@include media-breakpoint-up(md) {
		&__chapters {
			width: 45%;
		}

		&__old-chapters {
			width: 45%;
			display: block;
		}

		&__chapter {
			width: 100%;
			margin: 0.5rem 0;
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
				title: "",
				language: this.course.language
			}
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
				urlParams: {
					courseName: this.course._id
				},
				bodyParams: {
					...this.newCourse
				},
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				// return this.$store.commit("UPDATE_COURSE_FIELDS", { ...this.filterKeys(this.newCourse, ["title"]), _id: this.course._id })
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		patchCourseChapters() {
			this.$store.dispatch("PATCH_COURSE_CHAPTERS", {
				urlParams: {
					courseName: this.course._id
				},
				bodyParams: {
					...this.course,
					chapters: this.slice(this.newChapters, ["_id", "_version"])
				},
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				return this.$store.commit("UPDATE_COURSE_FIELDS", { chapters: this.newChapters, _id: this.course._id })
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		postChapter() {
			let chapter = Object.assign({}, this.newChapter)
			this.$store.dispatch("POST_CHAPTER", {
				urlParams: {
					courseName: this.course._id
				},
				bodyParams: {
					...this.filterKeys(this.course, ["_id", "title", "language"]),
					chapters: [
						...this.slice(this.course.chapters, ["_id", "_version"]),
						chapter
					]
				},
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				chapter._version = 1
				this.newChapters.push(chapter)
				this.$store.commit("UPDATE_COURSE_FIELDS", {
					chapters: this.newChapters,
					_id: this.course._id
				})
			}).catch((error) => {
				return this.$store.commit("SET_ERROR", { error: error })
			})
		}
	}
}
</script>

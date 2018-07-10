<template lang="pug">
	div
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
							v-for="(chapter, index) in newChapters"
							:key="chapter._id"
						) 
							WTLIcon(icon="swap_vertical")
							| {{ chapter.title }}
							.CourseEditor__chapter-icons
								WTLIcon(icon="edit", clickable=true, @click.native="editChapter(chapter)")
								WTLIcon(icon="delete", clickable=true, @click.native="deleteChapterDialog(chapter, index)")
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

		WTLModal(v-if="showModal", ref="modal", @close="showModal = false", title="Edit chapter")
			template(slot="content")
				WTLField(grouped=true, label="Chapter title")
					WTLInput(v-model="chapter.title")
			template(slot="actions")
				WTLButton(@click="closeModal", icon="close") Cancel
				WTLButton(@click="patchChapter", icon="done", type="success") Confirm edit
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
		display: none;
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
			font-size: 1.25rem;
		}

		&-icons {
			flex-grow: 1;
			display: inline-flex;
			justify-content: flex-end;
			align-items: center;

			> * {
				margin: 0 0.25rem;
			}
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
			showModal: false,
			newCourse: {
				title: this.course.title,
				language: this.course.language
			},
			newChapters: this.course.chapters,
			newChapter: {
				title: "",
				language: this.course.language
			},
			chapter: {
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
		fetchAndResetInitialState() {
			this.$store.dispatch("FETCH_COURSE", { courseName: this.course._id }).then((response) => {
				Object.assign(this.$data, this.$options.data.apply(this))
			})
		},
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
				// Now update title
				this.updateMetaTitle(this.course.title)
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		patchCourseChapters() {
			// Assign this to avoid updates in the meantime
			const newChapters = JSON.parse(JSON.stringify(this.newChapters))
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
				return this.$store.commit("UPDATE_COURSE_FIELDS", { chapters: newChapters, _id: this.course._id })
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		postChapter() {
			// Assign this to avoid updates in the mean time
			let chapters = JSON.parse(JSON.stringify(this.course.chapters))
			let chapter = Object.assign({}, this.newChapter)
			this.$store.dispatch("POST_CHAPTER", {
				urlParams: {
					courseName: this.course._id
				},
				bodyParams: {
					...this.filterKeys(this.course, ["_id", "title", "language"]),
					chapters: [
						...this.slice(chapters, ["_id", "_version"]),
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
				const chapterAdded = response.chapters[response.chapters.length - 1]
				chapter._version = chapterAdded._version
				chapter._id = chapterAdded._id
				chapters.push(chapter)
				this.$store.commit("UPDATE_COURSE_FIELDS", {
					chapters: chapters,
					_id: this.course._id
				})
				this.newChapters.push(chapter)
			}).catch((error) => {
				return this.$store.commit("SET_ERROR", { error: error })
			})
		},
		editChapter(chapter) {
			this.chapter = Object.assign({}, chapter)
			this.chapter.language = this.course.language
			this.showModal = true
		},
		patchChapter() {
			let chapter = Object.assign({}, this.chapter)
			this.$store.dispatch("PATCH_CHAPTER", {
				urlParams: { chapterId: chapter._id },
				bodyParams: {
					...this.filterKeys(chapter, ["title", "language"])
				},
				options: {
					headers: {
						"If-Match": chapter._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				this.fetchAndResetInitialState()
				this.closeModal()
			}).catch((error) => {
				this.closeModal()
				return this.$store.commit("SET_ERROR", { error: error })
			})
		},
		closeModal() {
			this.$refs.modal.close()
		},
		deleteChapterDialog(chapter, index) {
			let pagesString = ""
			if (chapter.pages) {
				for (let page of chapter.pages) {
					pagesString += page.title + ", "
				}
			}
			this.$dialog.confirm({
				title: `Delete chapter ${chapter.title}?`,
				content: `Removing this chapter will remove its pages: ${pagesString}`,
				onConfirm: () => {
					this.deleteChapter(chapter, index)
				}
			})
		},
		deleteChapter(chapter, index) {
			this.$store.dispatch("DELETE_CHAPTER", {
				urlParams: { chapterId: chapter._id },
				options: {
					headers: {
						"If-Match": chapter._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				this.fetchAndResetInitialState()
			}).catch((error) => {
				return this.$store.commit("SET_ERROR", { error: error })
			})
		}
	}
}
</script>

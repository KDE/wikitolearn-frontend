<template lang="pug">
	div
		.ChapterEditor
			div
				h2 Change chapter's title
				WTLField(grouped=true)
					WTLInput.ChapterEditor__title(
						v-model="newChapter.title"
					)
					WTLButton(
						@click="patchChapter"
						icon="done"
						type="success"
					) Update chapter title
			div
				h2 Change page order by dragging them
				.ChapterEditor__pages-container
					ol.ChapterEditor__old-pages
						li.ChapterEditor__page(v-for="(page, index) in chapter.pages") {{ index+1 }}. {{ page.title }}
					VueDraggable.ChapterEditor__pages(
						v-if="newPages"
						v-model="newPages"
						@start="drag=true"
						@end="drag=false"
					)
						.ChapterEditor__page(
							v-for="(page, index) in newPages"
							:key="page._id"
						) 
							WTLIcon(icon="swap_vertical")
							| {{ page.title }}
							.ChapterEditor__page-icons
								WTLIcon(icon="delete", clickable=true, @click.native="deletePageDialog(page, index)")
				div.flex-container.flex-content-end
					h3 Confirm changes?
					WTLButton(
						@click="patchChapterPages"
						icon="done"
						type="success"
					) Update pages order
			div
				h2 Insert new page
				WTLField(grouped=true)
					WTLInput.ChapterEditor__new-page(
						v-model="newPage.title"
						placeholder="Insert title"
					)
					WTLButton(
						@click="postPage"
						icon="done"
						type="success"
					) Add new page

		WTLModal(v-if="showModal", ref="modal", @close="showModal = false", title="Edit page")
			template(slot="content")
				WTLField(grouped=true, label="Page title")
					WTLInput(v-model="page.title")
			template(slot="actions")
				WTLButton(@click="closeModal", icon="close") Cancel
				WTLButton(@click="patchPage", icon="done", type="success") Confirm edit
</template>

<style lang="scss">
@import "~styles/declarations";

.ChapterEditor {
	background-color: white;
	box-shadow: $shadow-1;
	padding: 1rem;

	&__pages-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	&__old-pages {
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

	&__pages {
		width: 100%;
	}

	&__page {
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
		&__pages {
			width: 45%;
		}

		&__old-pages {
			width: 45%;
			display: block;
		}

		&__page {
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
	name: "ChapterEditor",
	components: { WTLInput, WTLButton, VueDraggable },
	data() {
		return {
			showModal: false,
			newChapter: {
				title: this.chapter.title,
				language: this.chapter.language
			},
			newPages: this.chapter.pages,
			newPage: {
				title: "",
				language: this.chapter.language,
				content: ""
			},
			page: {
				title: "",
				language: this.chapter.language
			}
		}
	},
	props: {
		chapter: {
			type: Object,
			required: true
		}
	},
	mounted() {

	},
	methods: {
		fetchAndResetInitialState() {
			this.$store.dispatch("FETCH_CHAPTER", { chapterName: this.chapter._id }).then((response) => {
				Object.assign(this.$data, this.$options.data.apply(this))
			})
		},
		patchChapter() {
			this.$store.dispatch("PATCH_CHAPTER", {
				urlParams: {
					chapterId: this.chapter._id
				},
				bodyParams: {
					...this.newChapter
				},
				options: {
					headers: {
						"If-Match": this.chapter._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		patchChapterPages() {
			// Assign this to avoid updates in the meantime
			const newPages = JSON.parse(JSON.stringify(this.newPages))
			this.$store.dispatch("PATCH_CHAPTER_PAGES", {
				urlParams: {
					chapterId: this.chapter._id
				},
				bodyParams: {
					...this.chapter,
					pages: this.slice(this.newPages, ["_id", "_version"])
				},
				options: {
					headers: {
						"If-Match": this.chapter._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				return this.$store.commit("UPDATE_CHAPTER_FIELDS", { pages: newPages, _id: this.chapter._id })
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		},
		postPage() {
			// Assign this to avoid updates in the mean time
			let pages = JSON.parse(JSON.stringify(this.chapter.pages))
			let page = Object.assign({}, this.newPage)
			this.$store.dispatch("POST_PAGE", {
				urlParams: {
					chapterId: this.chapter._id
				},
				bodyParams: {
					...this.filterKeys(this.chapter, ["_id", "title", "language"]),
					pages: [
						...this.slice(pages, ["_id", "_version"]),
						page
					]
				},
				options: {
					headers: {
						"If-Match": this.chapter._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).then((response) => {
				const pageAdded = response.pages[response.pages.length - 1]
				page._version = pageAdded._version
				page._id = pageAdded._id
				pages.push(page)
				this.$store.commit("UPDATE_CHAPTER_FIELDS", {
					pages: pages,
					_id: this.chapter._id
				})
				this.newPages.push(page)
			}).catch((error) => {
				return this.$store.commit("SET_ERROR", { error: error })
			})
		},
		closeModal() {
			this.$refs.modal.close()
		},
		deletePageDialog(page, index) {
			this.$dialog.confirm({
				title: `Delete page ${page.title}?`,
				content: "Removing this page will remove all its content",
				onConfirm: () => {
					this.deletePage(page, index)
				}
			})
		},
		deletePage(page, index) {
			this.$store.dispatch("DELETE_PAGE", {
				urlParams: { pageId: page._id },
				options: {
					headers: {
						"If-Match": page._etag,
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

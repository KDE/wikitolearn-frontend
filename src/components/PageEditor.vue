<template lang="pug">
	NoSSR
		div
			WTLField(grouped=true, label="Update page title")
				WTLInput(v-model="newPage.title")
				WTLButton(type="success", @click="patchPage", icon="done") Update page title
			// WTLButton(@click="newTheorem") Inserisci teorema
			.Editor(id="editor")
				div(id="editor-toolbar")
				div(id="editor-editable")
</template>

<script>
import WTLButton from "components/ui/WTLButton"
import WTLEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
// import createElement from "@ckeditor/ckeditor5-utils/src/dom/createelement"
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default {
	name: "Editor",
	props: {
		page: {
			type: Object,
			required: true
		}
	},
	components: {
		WTLButton
	},
	data() {
		return {
			editor: null,
			newPage: {
				title: this.page.title,
				language: this.page.language,
				content: this.page.content
			}
		}
	},
	mounted() {
		WTLEditor.create(this.$el.querySelector("#editor")).then((editor) => {
			const toolbarContainer = this.$el.querySelector("#editor-toolbar")
			const editableContent = this.$el.querySelector("#editor-editable")
			toolbarContainer.appendChild(editor.ui.view.toolbar.element)
			editableContent.appendChild(editor.ui.view.editable.element)
			editor.setData(this.newPage.content)
			this.editor = editor
		}).catch((error) => {
			console.log(error)
		})
	},
	methods: {
		newTheorem() {
			if (!this.editor) {
				return
			}
			/* Use model to change what user sees
			this.editor.model.change((writer) => {
				writer.insertText('<p>foo</p>', this.editor.model.document.selection.getFirstPosition())
			})*/
			/* Non funziona la createElement
			this.editor.model.change((writer) => {
				let element = createElement(this.editor.model.document, "div", {
					"data-tag": "dimostrazione"
				})
				element.innerHTML = "div di prova"
				console.log(element)
				writer.insertElement(element, this.editor.model.document.selection.getFirstPosition())
			})*/
		},
		patchPage() {
			this.$store.dispatch("PATCH_PAGE", {
				urlParams: {
					pageId: this.page._id
				},
				bodyParams: {
					...this.newPage
				},
				options: {
					headers: {
						"If-Match": this.page._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				return this.$store.dispatch("SET_ERROR", { error: error })
			})
		}
	}
}
</script>

<style lang="scss">
@import "~styles/_variables";

.Editor {
	#editor-editable {
		background-color: $white-bg;
		border-color: $gray;
	}
}
</style>

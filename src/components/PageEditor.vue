<template lang="pug">
	div
		div
			WTLField(grouped=true, label="Update page title")
				WTLInput(v-model="newPage.title")
				WTLButton(type="success", @click="patchPage", icon="done") Update page title
			// WTLButton(@click="newTheorem") Inserisci teorema
			ckeditor(:editor="editor", v-model="editorData", :config="editorConfig")
			//- .Editor(id="editor")
			//- 	div(id="editor-toolbar")
			//- 	div(id="editor-editable")
</template>

<script>
import WTLButton from "components/ui/WTLButton"
import CKEditor from "@ckeditor/ckeditor5-vue"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import WTLEditor from "@ckeditor/ckeditor5-build-classic/build/ckeditor"
// import createElement from "@ckeditor/ckeditor5-utils/src/dom/createelement"
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic"

export default {
	name: "Editor",
	components: {
		WTLButton,
		ckeditor: CKEditor.component
	},
	props: {
		page: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			editor: ClassicEditor,
			editorData: this.page.content,
			editorConfig: {
				// The configuration of the editor.
			},
			newPage: {
				title: this.page.title,
				language: this.page.language,
				content: this.page.content
			}
		}
	},
	mounted() {
		// const editorContainer = document.querySelector("#editor")
		// WTLEditor.create(editorContainer).then((editor) => {
		// 	const toolbarContainer = editorContainer.querySelector("#editor-toolbar")
		// 	const editableContent = editorContainer.querySelector("#editor-editable")
		// 	toolbarContainer.appendChild(editor.ui.view.toolbar.element)
		// 	editableContent.appendChild(editor.ui.view.editable.element)
		// 	editor.setData(this.newPage.content)
		// 	this.editor = editor
		// }).catch((error) => {
		// 	console.log(error)
		// })
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

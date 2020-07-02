<template lang="pug">
	div
		div.WTLEditorSpacer
		ckeditor(
			:editor="editor",
			:value="editorData",
			@input="onEditorInput"
			:config="editorConfig"
		)
</template>

<script>
import CKEditor from "@ckeditor/ckeditor5-vue"
import CustomEditor from "../../../editor/build/ckeditor"

export default {
	name: "WTLEditor",
	components: {
		ckeditor: CKEditor.component
	},
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			editor: CustomEditor,
			editorData: this.value,
			editorConfig: {
				mediaEmbed: {
					previewsInData: true
				},
				toolbar: {
					items: [
						"heading",
						"|",
						"bold",
						"italic",
						"link",
						"bulletedList",
						"numberedList",
						"|",
						"indent",
						"outdent",
						"|",
						"specialCharacters",
						"math",
						"environment",
						"code",
						"codeBlock",
						"imageUpload",
						"blockQuote",
						"highlight",
						"insertTable",
						"mediaEmbed",
						"pageBreak",
						"undo",
						"redo"
					]
				},
				language: "en",
				image: {
					toolbar: [
						"imageTextAlternative",
						"imageStyle:full",
						"imageStyle:side"
					]
				},
				math: {
					engine: "katex", // or mathjax or function. E.g. (equation, element, display) => { ... }
					outputType: "script", // or span
					forceOutputType: false,
					enablePreview: true
				},
				table: {
					contentToolbar: [
						"tableColumn",
						"tableRow",
						"mergeTableCells"
					]
				}
			}
		}
	},
	methods: {
		onEditorInput(eventInfo, batch) {
			this.$emit("input", eventInfo)
		}
	}
}
</script>

<style lang="scss">
.WTLEditorSpacer {
	/* AppHeadear + AppHeader's border */
	margin-top: calc(-1 * (3.5rem + 4px));
}

.ck.ck-sticky-panel__content {
	/* AppHeadear + AppHeader's border */
	padding-top: calc(3.5rem + 4px);
}

.ck.ck-editor {
	pointer-events: none;
}

.ck.ck-editor__main,
.ck.ck-sticky-panel__content * {
	pointer-events: auto;
}
</style>

<template lang="pug">
	NoSSR
		.Editor
			vue-ckeditor(type="classic", :editors="editors", v-model="mutableContent")
</template>


<script>
// import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
// import BalloonEditor from '@ckeditor/ckeditor5-build-balloon'
import VueCkeditor from "vue-ckeditor5"

export default {
	name: "Editor",
	props: {
		content: {
			type: String
		}
	},
	components: {
		"vue-ckeditor": VueCkeditor.component
	},
	data() {
		return {
			editors: {
				// decoupled: DecoupledEditor
				classic: ClassicEditor
			},
			mutableContent: this.content
		}
	},
	mounted() {}
}
</script>

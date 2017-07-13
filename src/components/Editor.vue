<template lang="pug">
	NoSSR
		.Editor
			textarea(id="foo", :value="content")
</template>


<script>
import Vue from "vue"

export default {
	name: "Editor",
	props: {
		content: {
			type: String
		}
	},
	mounted() {
		Vue.nextTick(() => {
			window.CKEDITOR.replace("foo", {
				removeButtons: "About",
				customConfig: "",
				height: "100vh"
			})
		})
	}
}
</script>

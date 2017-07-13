<template lang="pug">
	NoSSR
		.Editor
			textarea(id="foo", :value="content")
</template>


<script>
import Vue from "vue"
import NoSSR from "vue-no-ssr"

export default {
	name: "Editor",
	components: { NoSSR },
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

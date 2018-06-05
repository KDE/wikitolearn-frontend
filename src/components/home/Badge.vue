<template lang="pug">
	.Badge
		router-link.Badge__name(:to=`{
				name: view,
				params: params
			}`) {{ title }}
</template>

<style lang="scss">
@import "~styles/_variables";

.Badge {
	display: inline-block;
	box-shadow: $shadow-1;
	padding: 1rem 2rem;
	margin: 0.5rem;
	background-color: white;
}
</style>

<script>
export default {
	name: "Badge",
	props: {
		link: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			api: this.link.href ? this.link.href : "",
			view: this.link.view,
			title: this.link.title,
			params: this.link.params ? this.link.params : {}
		}
	}
}
</script>

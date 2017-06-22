<template lang="pug">
	.PageRenderer
		h1.PageRenderer__title(v-if="showName") {{ page.displayTitle }}
		.PageRenderer__content(v-html="page.content")
</template>

<style lang="scss">
.PageRenderer {
	padding: 1rem;
}
</style>

<script>
export default {
	name: "PageRenderer",
	props: {
		page: {
			type: Object,
			required: true
		},
		showName: {
			type: Boolean,
			default: true
		}
	}
}
</script>

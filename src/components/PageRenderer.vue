<template lang="pug">
	.PageRenderer
		h1.PageRenderer__title(v-if="showName") {{ page.title }}
		.PageRenderer__content(v-html="page.content")
</template>

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

<style lang="scss">
.PageRenderer {
	padding: 2rem;

	&__title {
		text-align: center;
	}

	&__content {
		pre {
			background: whitesmoke;
			padding: 1rem;
			border: 1px solid gray;
			border-radius: 3px;
		}

		.mw-editsection {
			display: none;
		}
	}
}
</style>

<template lang="pug">
	.ChapterPages
		h3.ChapterPages__title {{ number }}. {{ chapter.title }}
		ul
			li(
				v-for="page in chapter.pages"
				:key="page._id"
			)
				router-link(:to=`{
					name: "Page",
					append: true,
					params: {
						pageTitle: page._id
					}
				}`) {{ page.title }}
</template>

<script>
export default {
	name: "ChapterPages",
	props: {
		chapter: {
			type: Object,
			required: true
		},
		number: {
			type: Number,
			required: true
		}
	}
}
</script>

<style lang="scss">
@import "~styles/_variables";

.ChapterPages {
	margin-bottom: 1rem;

	&__title {
		border-bottom: 1px solid $lightgray;
	}
}
</style>

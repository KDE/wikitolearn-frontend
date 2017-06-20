<template lang="pug">
	.CourseRenderer
		h3.CourseRenderer__name(v-if="showName") {{ course.name }}
		.CourseRenderer__description
			b Description
			br
			| Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic sunt illo repellat delectus labore ipsam, ad exercitationem ullam quod error aperiam ex saepe fuga in animi minus maiores. Eligendi, eius!
		.CourseRenderer__level-two__container
			.CourseRenderer__level-two(v-for="(levelTwo, levelTwoIndex) in course.levelsTwo")
				h3.CourseRenderer__level-two__title {{ levelTwoIndex+1 }}. {{ levelTwo }}
				ul
					li(v-for="levelThree in course.levelsThree[levelTwoIndex]")
						a(href="#") {{ levelThree }}
</template>

<style lang="scss">
.CourseRenderer {

	&__description {
		font-style: italic;
		margin: 1rem;
		padding: 1rem;
		background-color: whitesmoke;
		border: 1px solid gray;
	}

	&__level-two {
		margin-bottom: 1rem;
		flex: 0 0 33%;

		&__container {
			display: flex;
			flex-wrap: wrap;
		}
	}
}
</style>

<script>
export default {
	name: "CourseRenderer",
	props: {
		course: {
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

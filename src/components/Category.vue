<template lang="pug">
	.Category
		h3.Category__name(v-if="showName") {{ category.display_name }}
		.Category__subcategories(v-if="category.subcategories")
			b Subcategories
			Category(
				v-for="subcategory in category.subcategories"
				:category="subcategory"
				:key="subcategory.name"
			)
		.Category__courses
			b Courses
			ul
				li(v-for="course in category.courses")
					a.Category__course(href="#") {{ course.display_name }}
</template>

<style lang="scss">
.Category {
	padding: 1rem;
	margin-bottom: 2rem;
	border: 1px solid black;

	&__subcategories {
		margin-bottom: 1rem;
	}
}
</style>

<script>
export default {
	name: "Category",
	props: {
		category: {
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

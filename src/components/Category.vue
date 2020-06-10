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
					router-link.Category__course(:to=`{
						name: 'Course',
						params: { courseName: course.name }
					}`) {{ course.displayName }}
</template>

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

<style lang="scss">
.Category {
	padding: 1rem;
	margin-bottom: 2rem;

	&__subcategories {
		margin-bottom: 1rem;
	}
}
</style>

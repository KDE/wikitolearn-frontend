<template lang="pug">
	.Category
		h3.Category__name(v-if="showName") {{ category.display_name }}
		.Category__subcategories
			b Categories
			.Category__subcategory(v-for="subcategory in category.subcategories") {{ subcategory.display_name }}
		.Category__courses
			b Uncategorized Courses
			.Category__course Developing Android Apps
			.Category__course Computability
</template>

<style lang="scss">

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

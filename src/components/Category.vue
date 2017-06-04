<template lang="pug">
	.Category
		h3.Category__name(v-if="showName") {{ categoryName }}
		.Category__subcategories
			b Categories
			.Category__subcategory Programming
			.Category__subcategory Database
			.Category__subcategory Maths
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
		categoryName: {
			type: String,
			required: true
		},
		showName: {
			type: Boolean,
			default: true
		}
	}
}
</script>

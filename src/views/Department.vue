<template lang="pug">
	.Department
		h1 Department of {{ category.name }}
		Category(
			:category="category",
			:showName="false")
</template>


<script>

import Category from "components/Category"

export default {
	name: "Department",
	components: { Category },
	computed: {
		category() {
			return this.$store.state.categories[this.$route.params.departmentName]
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_CATEGORY", { categoryName: route.params.departmentName })
	},
	meta() {
		return {
			title: this.category.display_name,
			description: "This is the meta description for the home page"
		}
	}
}
</script>

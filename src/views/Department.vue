<template lang="pug">
	.view--Department
		h1 Department of {{ category.displayName }}
		Category(
			:category="category",
			:showName="false")
</template>

<style lang="scss">
.view--Department {
	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.Category {
		background-color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
}
</style>


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
			title: this.category.displayName,
			description: "This is the meta description for the department page"
		}
	}
}
</script>

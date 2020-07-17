<template lang="pug">
	ViewFrame
		template(slot="title")
			h1 {{ displayName }}
		template(slot="actions")
			div
		template(slot="content")
			Category(
				v-if="category"
				:category="category",
				:showName="false"
			)
</template>

<script>
import Category from "components/Category"
import ViewFrame from "components/ViewFrame"

export default {
	name: "Department",
	components: { Category, ViewFrame },
	asyncData({ store, route }) {
		return store.dispatch("FETCH_CATEGORY", { categoryName: route.params.departmentName })
			.catch((error) => {
				console.log(error)
				return store.commit("SET_ERROR", { error: error })
			})
	},
	computed: {
		category() {
			return this.$store.state.categories[this.$route.params.departmentName]
		},
		displayName() {
			return this.category ? this.category.displayName : this.$t("department")
		}
	},
	meta() {
		return {
			title: this.displayName,
			description: "This is the meta description for the department page"
		}
	}
}
</script>

<style lang="scss">
</style>

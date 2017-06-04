<template lang="pug">
	.Department
		h1 Department of {{ departmentName }}
		Category(
			:categoryName="departmentName",
			:showName="false")
</template>


<script>
import Category from "components/Category"

export default {
	name: "Department",
	components: { Category },
	computed: {
		departmentName() {
			return this.$route.params.departmentName
		}
	},
	meta() {
		return {
			title: this.departmentName,
			description: "This is the meta description for the home page"
		}
	}
}
</script>

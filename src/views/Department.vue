<template lang="pug">
	<h1>Department of {{ departmentName }}</h1>
</template>


<script>
export default {
	name: "Department",
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

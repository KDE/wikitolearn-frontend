<template lang="pug">
	.Badge
		router-link.Badge__name(:to=`{
				name: 'Department',
				params: { departmentName: departmentName }
			}`) {{ departmentName }}
</template>

<style lang="scss">
.Badge {
	padding: 1rem;
	margin-bottom: 1rem;
	border: 1px solid black;
}
</style>

<script>
export default {
	name: "Badge",
	props: {
		departmentName: {
			type: String,
			required: true
		}
	}
}
</script>

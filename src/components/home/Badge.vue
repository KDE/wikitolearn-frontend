<template lang="pug">
	.Badge
		router-link.Badge__name(:to=`{
				name: 'Department',
				params: { departmentName: departmentName }
			}`) {{ departmentName }}
</template>

<style lang="scss">
.Badge {
	display: inline-block;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	padding: 1rem 2rem;
	margin-bottom: 1rem;
	margin-right: 1rem;
	margin-top: 1rem;
	background-color: white;
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

<template lang="pug">
	.Badge
		// TODO: replace with router-link
		a.Badge__name(href="#") {{ name }}
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
		name: {
			type: String,
			required: true
		}
	}
}
</script>

<template lang="pug">
	.Error(v-if="error != null")
		b.Error__title Error
		.Error__message {{ error.error }}
</template>

<style lang="scss">
@import "~styles/declarations";

.Error {
	padding: 1rem;
	border: 1px solid $red;
}
</style>

<script>
export default {
	name: "Error",
	props: {
		error: {
			default: null
		}
	}
}
</script>

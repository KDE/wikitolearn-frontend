<template lang="pug">
	WTLEditor(
		:value="value"
		@input="handleInput"
	)
</template>

<script>
export default {
	name: "Editor",
	components: {
		WTLEditor: () => import("components/ui/WTLEditor")
	},
	props: {
		value: {
			type: String,
			required: true
		}
	},
	methods: {
		handleInput(event) {
			this.$emit("input", event)
		}
	}
}
</script>

<style lang="scss">
</style>

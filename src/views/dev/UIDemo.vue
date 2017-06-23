<template lang="pug">
	main.view--UIDemo
		h1 Demo for UI Elements
		.UIDemo__section
			h2 Buttons
			Button Button
			Button(type="green") Green Button
			Button(type="blue") Blue Button
</template>

<style lang="scss">
</style>

<script>
import Button from "components/ui/Button"

export default {
	name: "UIDemo",
	components: {
		Button
	},
	meta() {
		return {
			title: "UI Demo",
			description: "Ui Elements Showcase"
		}
	}
}
</script>

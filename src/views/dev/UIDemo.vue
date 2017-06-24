<template lang="pug">
	main.view--UIDemo
		h1 Demo for UI Elements
		.UIDemo__section
			h2 Buttons
			WTLButton Button
			WTLButton(type="green") Green Button
			WTLButton(type="blue") Blue Button
</template>

<style lang="scss">
</style>

<script>
import WTLButton from "components/ui/WTLButton"

export default {
	name: "UIDemo",
	components: {
		WTLButton
	},
	meta() {
		return {
			title: "UI Demo",
			description: "Ui Elements Showcase"
		}
	}
}
</script>

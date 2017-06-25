<template lang="pug">
	main.view--UIDemo
		h1 Demo for UI Elements
		.UIDemo__section
			h2 Buttons
			WTLButton Button
			WTLButton(type="success") Green Button
			WTLButton(type="info") Blue Button
			WTLButton(type="warning") Yellow Button
			WTLButton(type="error") Red Button
		.UIDemo__section
			h2 Alert
			WTLButton(@click="$dialog.alert({ content: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid optio odit maiores doloribus id officia porro veritatis pariatur dolorem, cumque illum eum commodi nostrum distinctio praesentium natus, accusantium rerum atque.' })") Open generic Alert
			WTLButton(@click="$dialog.alert({ content: 'Something went wrong', type: 'error' })") Open error Alert
			WTLButton(@click="$dialog.alert({ content: 'Great!', type: 'success' })") Open success Alert
			WTLButton(@click="$dialog.alert({ content: 'Something yellow', type: 'warning' })") Open warning Alert
			h2 Confirm
			WTLButton(@click="$dialog.confirm({ content: 'Are you sure?' })") Open confirm dialog

</template>

<style lang="scss">
.WTLButton {
	margin-right: 0.25rem;
}
</style>

<script>
import WTLButton from "components/ui/WTLButton"

export default {
	name: "UIDemo",
	components: {
		WTLButton
	},
	methods: {
		openAlert(propsData) {
			this.$dialog.alert(propsData)
		}
	},
	meta() {
		return {
			title: "UI Demo",
			description: "Ui Elements Showcase"
		}
	}
}
</script>

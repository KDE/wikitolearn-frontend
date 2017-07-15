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
			WTLButton(disabled=true) Disabled Button
		.UIDemo__section
			h2 Alert
			WTLButton(@click="$dialog.alert({ content: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid optio odit maiores doloribus id officia porro veritatis pariatur dolorem, cumque illum eum commodi nostrum distinctio praesentium natus, accusantium rerum atque.' })") Open generic Alert
			WTLButton(@click="$dialog.alert({ content: 'Something went wrong', type: 'error' })") Open error Alert
			WTLButton(@click="$dialog.alert({ content: 'Great!', type: 'success' })") Open success Alert
			WTLButton(@click="$dialog.alert({ content: 'Something yellow', type: 'warning' })") Open warning Alert
			h2 Confirm
			WTLButton(@click="$dialog.confirm({ content: 'Are you sure?' })") Open confirm dialog
		.UIDemo__section
			h2 Async
			WTLButton(@click="$store.dispatch('START_POLLING')") Start async
		.UIDemo__section
			h2 WTLInput
			WTLInput(placeholder="Type: number [0-5]", type="number", min=0, max=5)
			br
			WTLInput(value="Disabled text", disabled=true)
			WTLInput(placeholder="text, length[0-10]", maxlength=10)
</template>

<style lang="scss">
.view--UIDemo {
	.WTLButton {
		margin-right: 0.25rem;
	}
}
</style>

<script>
export default {
	name: "UIDemo",
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

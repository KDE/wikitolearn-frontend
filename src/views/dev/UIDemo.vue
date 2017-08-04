<template lang="pug">
	main.view--UIDemo
		h1
			router-link(to="/uidemo") Demo for UI Elements
		transition(name="fade", mode="out-in")
			router-view
</template>

<script>
export default {
	name: "UIDemo",
	meta() {
		return {
			title: "UI Demo",
			description: "Ui Elements Showcase"
		}
	}
}
</script>

<style lang="scss">
.view--UIDemo {
	h2 {
		margin-top: 1rem;
	}
}
</style>


<template lang="pug">
	main.view--UIDemo
		h1
			router-link(to="/uidemo") Demo for UI Elements
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

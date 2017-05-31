<template lang="pug">
	main.view--Home
		h1 Welcome to WikiToLearn!
		router-link(to="/showcase") Go to showcase
		.badges
			Badge(name="English")
			Badge(name="Maths")
</template>

<script>
import Badge from "components/home/Badge"

export default {
	name: "Home",
	components: {
		Badge
	},
	meta() {
		return {
			title: "Home",
			description: "This is the meta description for the home page"
		}
	}
}
</script>

<template lang="pug">
	main.view--Home
		h1 Welcome to WikiToLearn!
		router-link(to="/showcase") Go to showcase
		// TODO: Move to BadgeContainer?
		.badges
			Badge(
				v-for="badge in badges"
				:departmentName="badge.name"
				:key="badge.name"
			)
</template>

<script>
import Badge from "components/home/Badge"

export default {
	name: "Home",
	components: {
		Badge
	},
	computed: {
		badges: () => [
			{ name: "English" },
			{ name: "Maths" }
		]
	},
	meta() {
		return {
			title: "Home",
			description: "This is the meta description for the home page"
		}
	}
}
</script>

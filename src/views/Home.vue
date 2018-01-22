<template lang="pug">
	main.view--Home
		h1 Welcome to WikiToLearn!
		h2 Departments
		.badges
			Badge(
				v-for="badge in badges"
				:departmentName="badge.displayName"
				:key="badge.name"
			)
		h2 Other Links
		router-link(to="/showcase") Go to feature showcase
		br
		router-link(to="/uidemo") Go to UI elements showcase
</template>

<style lang="scss">
.view--Home {
	h1 {
		text-align: center;
	}
}
</style>

<script>
import Badge from "components/home/Badge"

export default {
	name: "Home",
	components: { Badge },
	computed: {
		badges() {
			return this.$store.state.rootCategories
		}
	},
	/* asyncData({ store }) {
		return store.dispatch("FETCH_ROOT_CATEGORIES")
	},*/
	meta() {
		return {
			title: "Home",
			description: "This is the meta description for the home page"
		}
	}
}
</script>

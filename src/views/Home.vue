<template lang="pug">
	main.view--Home
		h1 Welcome to WikiToLearn!
		h2 Sections
		.badges
			Badge(
				:link="coursesLink"
			)
		h2 Other Links
		router-link(to="/showcase") Go to feature showcase
		br
		router-link(to="/uidemo") Go to UI elements showcase
</template>

<script>
import Badge from "components/home/Badge"

export default {
	name: "Home",
	components: { Badge },
	data() {
		return {
			coursesLink: {
				view: "Courses",
				title: "All courses"
			}
		}
	},
	computed: {
		/* navigationLinks() {
			return this.$store.state.navigationLinks
		}*/
	},
	/* asyncData({ store }) {
		return store.dispatch("FETCH_HOME")
	},*/
	meta() {
		return {
			title: "Home",
			description: "This is the meta description for the home page"
		}
	}
}
</script>

<style lang="scss">
.view--Home {
	h1 {
		text-align: center;
	}
}
</style>

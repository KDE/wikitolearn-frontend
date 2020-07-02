<template lang="pug">
	ViewFrame(:hasBackButton="false")
		template(slot="title")
			h1 Welcome to WikiToLearn!
		template(slot="content")
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
import ViewFrame from "components/ViewFrame"

export default {
	name: "Home",
	components: { Badge, ViewFrame },
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
</style>

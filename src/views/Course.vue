<template lang="pug">
	.view--Course
		h1 {{ course.name }}
		CourseRenderer(
			:course="course",
			:showName="false")
</template>


<script>
import CourseRenderer from "components/CourseRenderer"

export default {
	name: "Course",
	components: { CourseRenderer },
	computed: {
		course() {
			return this.$store.state.courses[this.$route.params.courseName]
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_COURSE", { courseName: route.params.courseName })
	},
	meta() {
		return {
			title: this.course.name,
			description: "This is the meta description for the course page"
		}
	}
}
</script>

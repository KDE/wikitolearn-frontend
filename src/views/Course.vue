<template lang="pug">
	.view--Course
		h1 {{ courseName }}
		CourseRenderer(
			v-if="!error && course",
			:course="course",
			:showName="false"
		)
		Error(:error="error")
</template>

<style lang="scss">
.view--Course {
	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.CourseRenderer {
		background-color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}
}
</style>

<script>
import CourseRenderer from "components/CourseRenderer"
import ErrorHandler from "mixins/errorHandler"

export default {
	name: "Course",
	mixins: [ErrorHandler],
	components: { CourseRenderer },
	computed: {
		courseName() {
			if (this.course) {
				return this.course.name
			} else {
				return this.$route.params.courseName
			}
		},
		course() {
			return this.$store.state.courses[this.$route.params.courseName]
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_COURSE", { courseName: route.params.courseName })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error.response.data })
			})
	},
	meta() {
		return {
			title: this.courseName,
			description: "This is the meta description for the course page"
		}
	}
}
</script>

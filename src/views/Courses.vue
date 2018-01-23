<template lang="pug">
	div
		.view--Course(
			v-for="course in courses"
			:key="course.title"
		)
			router-link(:to=`{
				name: "Course",
				append: true,
				params: {
					courseName: course._id
				}
			}`) {{ course.title }}
		Error(:error="error")
		WTLButton(
			v-if="links.prev"
			@click="fetchCoursesPage(page-1)"
		) Prev page
		WTLButton(
			v-if="links.next"
			@click="fetchCoursesPage(page+1)"
		) Next page
</template>

<style lang="scss">
.view--Course {
	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}
}
</style>

<script>
import ErrorHandler from "mixins/errorHandler"
import WTLButton from "components/ui/WTLButton"

export default {
	name: "Course",
	mixins: [ErrorHandler],
	components: { WTLButton },
	data() {
		return {
			page: 1
		}
	},
	computed: {
		courses() {
			return this.$store.state.courses
		},
		links() {
			return this.$store.state.navigationLinks
		}
	},
	asyncData({ store, route }) {
		return store.dispatch("FETCH_COURSES", { page: 1 })
			.catch((error) => {
				console.log(error)
				return store.commit("SET_ERROR", { error: error })
			})
	},
	methods: {
		fetchCoursesPage(page) {
			this.page = page
			return this.$store.dispatch("FETCH_COURSES", { page: page })
				.catch((error) => {
					console.log(error)
					return this.$store.commit("SET_ERROR", { error: error })
				})
		}
	},
	meta() {
		return {
			title: "Courses",
			description: "This is the meta description for the courses list page"
		}
	}
}
</script>

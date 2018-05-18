<template lang="pug">
	div
		h1.view--Courses__title Corsi disponibili
		.view--Courses__container
			div.view--Course__item(
				v-for="course in courses"
				:key="course._id"
			)
				Badge(:link=`{
					view: "Course",
					title: course.title,
					params: {
						courseName: course._id
					}
				}`)
		Error(:error="error")
		Pagination(
			resource="COURSE"
			:page="page"
			:last_page="lastPage"
		)
</template>

<style lang="scss">
.view--Courses__title {
	text-align: center;
	margin-bottom: 1rem;
}

.view--Courses__container {
	display: flex;
	flex-wrap: wrap;
}
</style>

<script>
import Pagination from "components/Pagination"
import Badge from "components/home/Badge"
import ErrorHandler from "mixins/errorHandler"
import WTLButton from "components/ui/WTLButton"

export default {
	name: "Course",
	mixins: [ErrorHandler],
	components: { WTLButton, Badge, Pagination },
	data() {
		return {
			page: 1
		}
	},
	computed: {
		courses() {
			return this.$store.state.courses
		},
		coursesMeta() {
			return this.$store.state.meta
		},
		lastPage() {
			let page = parseInt(this.coursesMeta.total / this.coursesMeta.max_results)
			if (this.coursesMeta.total % this.coursesMeta.max_results > 0) {
				page += 1
			}
			return page
		}/* ,
		links() {
			return this.$store.state.navigationLinks
		}*/
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

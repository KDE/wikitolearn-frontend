<template lang="pug">
	ViewFrame
		template(slot="title")
			h1 {{ courseName }}
		template(slot="actions")
			WTLButton(
				v-if="$keycloak && $keycloak.authenticated && false"
				@click="() => {}"
				icon="save"
				:tooltip="$t('save')"
				type="success"
			)
		template(slot="content")
			CourseEditor(
				v-if="course",
				:course="course"
			)
</template>

<script>
import CourseRenderer from "components/CourseRenderer"
import CourseEditor from "components/CourseEditor"
import ViewFrame from "components/ViewFrame"
import WTLButton from "components/ui/WTLButton"

export default {
	name: "Course",
	components: { CourseRenderer, CourseEditor, ViewFrame, WTLButton },
	asyncData({ store, route }) {
		return store.dispatch("FETCH_COURSE", { courseName: route.params.courseName })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
	},
	computed: {
		courseName() {
			if (this.course) {
				return this.course.title
			} else {
				return this.$route.params.courseName
			}
		},
		course() {
			return this.$store.state.courses[this.$route.params.courseName]
		}
	},
	meta() {
		return {
			title: this.courseName,
			description: "This is the meta description for the course page"
		}
	}
}
</script>

<style lang="scss">
</style>

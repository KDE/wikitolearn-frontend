<template lang="pug">
	ViewFrame
		template(slot="title")
			h1 {{ courseName }}
		template(slot="actions")
			WTLButton(
				v-if="$keycloak && $keycloak.authenticated"
				@click="toggleEditMode"
				:icon="editButton.icon"
				:tooltip="$t(editButton.tooltip)"
				:type="editButton.type"
			)
		template(slot="content")
			CourseRenderer(
				v-if="course && !editMode",
				:course="course",
				:showName="false"
			)
			CourseEditor(
				v-if="editMode && course",
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
	data() {
		return {
			editMode: false
		}
	},
	computed: {
		editButton() {
			return this.editMode ? {
				type: "default",
				icon: "close",
				tooltip: "close"
			} : {
				type: "success",
				icon: "edit",
				tooltip: "edit"
			}
		},
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
	methods: {
		toggleEditMode() {
			this.editMode = !this.editMode
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

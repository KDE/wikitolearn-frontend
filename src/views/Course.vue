<template lang="pug">
	.view--Course
		.Course__banner
			WTLBanner.WTLBanner--full-width(
				v-if="editMode && course"
			)
				span You are in EDIT MODE
				WTLButton(
					@click="toggleEditMode"
					icon="close"
				) Exit
		h1 {{ courseName }}
		WTLButton(
			v-if="$keycloak && $keycloak.authenticated && !editMode"
			@click="toggleEditMode"
			:type="editModeBtnType"
		) {{ editModeText }}
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

	.Course__banner {
		margin-bottom: 1rem;
	}
}
</style>

<script>
import CourseRenderer from "components/CourseRenderer"
import CourseEditor from "components/CourseEditor"
import WTLButton from "components/ui/WTLButton"
import WTLBanner from "components/ui/WTLBanner"

export default {
	name: "Course",
	components: { CourseRenderer, CourseEditor, WTLButton, WTLBanner },
	data() {
		return {
			editMode: false
		}
	},
	computed: {
		editModeText() {
			if (this.editMode) {
				return "Exit from EDIT MODE"
			} else {
				return "Enter EDIT MODE"
			}
		},
		editModeBtnType() {
			if (this.editMode) {
				return "warning"
			} else {
				return "default"
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
	asyncData({ store, route }) {
		return store.dispatch("FETCH_COURSE", { courseName: route.params.courseName })
			.catch((error) => {
				return store.commit("SET_ERROR", { error: error })
			})
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

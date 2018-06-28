<template lang="pug">
	.view--Course
		.Course__banner
			WTLBanner(
				v-if="editMode && course"
				closeButtonText="Go back"
				:onClose="() => { editMode = false }"
			)
				span You are editing the course
		.Course__banner
			WTLBanner.WTLBanner--full-width(
				v-if="history && course"
			)
				span You are viewing an old version of this course. See the latest one 
				router-link(
					to=`{
						name: 'Course',
						params: {
							courseName: course._id
						}
					}`
				) here
		.Course__title
			h1 {{ courseName }}
			WTLButton(
				v-if="$keycloak && $keycloak.authenticated && !editMode && !history"
				@click="toggleEditMode"
				icon="edit"
				:type="editModeBtnType"
			)
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
import WTLButton from "components/ui/WTLButton"
import WTLBanner from "components/ui/WTLBanner"

export default {
	name: "Course",
	components: { CourseRenderer, CourseEditor, WTLButton, WTLBanner },
	props: {
		history: {
			required: false,
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			editMode: false
		}
	},
	computed: {
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

<style lang="scss">
.view--Course {
	.CourseRenderer {
		background-color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.Course__banner {
		margin-bottom: 1rem;
	}

	.Course__title {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1rem;

		> * {
			margin-right: 0.5rem;
		}
	}
}
</style>

<template lang="pug">
	.CourseEditor
		WTLInput.CourseEditor__name(
			v-model="newCourse.title"
		)
		WTLButton(
			@click="pushChanges"
		) Confirm changes
</template>

<style lang="scss">
@import "~styles/declarations";

.CourseEditor {
	padding: 2rem;
}
</style>

<script>
import WTLButton from "components/ui/WTLButton"
import WTLInput from "components/ui/WTLInput"

export default {
	name: "CourseEditor",
	components: { WTLInput, WTLButton },
	data() {
		return {
			newCourse: {
				title: this.course.title
			}
		}
	},
	props: {
		course: {
			type: Object,
			required: true
		}
	},
	mounted() {

	},
	methods: {
		pushChanges() {
			this.$store.dispatch("PATCH_COURSE", {
				courseName: this.course._id,
				course: this.newCourse,
				options: {
					headers: {
						"If-Match": this.course._etag,
						"Authorization": `bearer ${this.$keycloak.token}`
					}
				}
			}).catch((error) => {
				console.log(error)
				return this.$store.commit("SET_ERROR", { error: error })
			})
		}
	}
}
</script>

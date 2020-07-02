<template lang="pug">
	.ChapterPages
		h3.ChapterPages__title
			WTLIcon(
				v-if="$keycloak && $keycloak.authenticated",
				clickable=true,
				icon="edit",
				tooltip="edit",
				@click.native="goToEditChapter"
			)
			| {{ number }}. {{ chapter.title }}
		ul
			li(
				v-for="page in chapter.pages"
				:key="page._id"
			)
				router-link(:to=`{
					name: "Page",
					append: true,
					params: {
						pageTitle: page._id
					}
				}`) {{ page.title }}
</template>

<script>
import WTLIcon from "components/ui/WTLIcon"

export default {
	name: "ChapterPages",
	components: { WTLIcon },
	props: {
		chapter: {
			type: Object,
			required: true
		},
		number: {
			type: Number,
			required: true
		},
		courseName: {
			type: String,
			required: true
		}
	}, methods: {
		goToEditChapter() {
			this.$router.push({
				path: `/c/${this.courseName}/${this.chapter._id}/edit`,
				params: { chapter: this.chapter }
			})
		}
	}
}
</script>

<style lang="scss">
@import "~styles/_variables";

.ChapterPages {
	margin-bottom: 1rem;

	&__title {
		border-bottom: 1px solid $lightgray;
	}
}
</style>

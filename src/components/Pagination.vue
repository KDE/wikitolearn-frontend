<template lang="pug">
	.Pagination(
		v-if="!isNaN(lastPage)"
	)
		.Pagination__container
			WTLButton(
				:disabled="currentPage <= 1"
				@click="fetchPage(currentPage-1)"
			) Pagina precedente
			.Pagination__current-page Pagina {{ currentPage }} / {{ lastPage }}
			WTLButton(
				:disabled="currentPage >= lastPage"
				@click="fetchPage(currentPage+1)"
			) Pagina successiva
</template>

<script>
import WTLButton from "components/ui/WTLButton"

export default {
	components: { WTLButton },
	props: {
		resource: {
			type: String,
			required: true
		},
		page: {
			type: Number,
			default: 0
		},
		lastPage: {
			type: Number,
			required: true
		}
	},
	data() {
		return {
			currentPage: this.page ? this.page : 1
		}
	},
	methods: {
		fetchPage(page) {
			this.currentPage = page
			const data = this.$store.dispatch(`FETCH_${this.resource}S`, { page: page })
				.catch((error) => {
					console.log(error)
					return this.$store.commit("SET_ERROR", { error: error })
				})
			this.$emit("update", data)
		}
	}
}
</script>

<style lang="scss">
@import "~styles/_variables";

.Pagination {
	display: flex;
	justify-content: center;

	&__container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&__current-page {
		align-self: center;
		padding: 1rem;
	}
}
</style>

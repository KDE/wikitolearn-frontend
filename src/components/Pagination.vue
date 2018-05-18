<template lang="pug">
	.Pagination
		.Pagination__container
			WTLButton(
				:disabled="current_page <= 1"
				@click="fetchPage(current_page-1)"
			) Pagina precedente
			.Pagination__current-page Pagina {{ current_page }} / {{ last_page }}
			WTLButton(
				:disabled="current_page >= last_page"
				@click="fetchPage(current_page+1)"
			) Pagina successiva
</template>

<script>
import WTLButton from "components/ui/WTLButton"

export default {
	props: {
		resource: {
			type: String,
			required: true
		},
		page: {
			type: Number
		},
		last_page: {
			type: Number,
			required: true
		}
	},
	components: { WTLButton },
	data() {
		return {
			current_page: this.page ? this.page : 1
		}
	},
	methods: {
		fetchPage(page) {
			this.current_page = page
			let data = this.$store.dispatch(`FETCH_${this.resource}S`, { page: page })
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

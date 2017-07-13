<template lang="pug">
	NoSSR
		.PollingBar
			.PollingBar__header
				.PollingBar__title Running operations
				i.material-icons remove
			.PollingBar__operations
				.PollingBar__operation(v-for="operation in pollingOperations")
					b {{ operation.title }}%
					span {{ operation.progress }}%
					i.material-icons(
						title="Abort operation",
						@click="$store.commit('DELETE_POLLING', { id: operation.id })"
					) close
 </template>

<style lang="scss">
@import "~styles/declarations";

.PollingBar {
	position: fixed;
	bottom: 0;
	right: 1rem;
	width: 25rem;
	padding: 0.5rem 1rem;
	background-color: white;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);

	&__header {
		display: flex;
	}

	&__title {
		flex: 1;
	}

	&__operation {
		display: flex;

		b {
			flex: 2;
		}

		span {
			flex: 1;
			text-align: center;
		}

		i:hover {
			cursor: pointer;
			color: $red;
		}
	}
}
</style>

<script>
import NoSSR from "vue-no-ssr"

export default {
	name: "PollingBar",
	components: { NoSSR },
	computed: {
		pollingOperations() {
			return this.$store.state.pollingOperations
		}
	}
}
</script>

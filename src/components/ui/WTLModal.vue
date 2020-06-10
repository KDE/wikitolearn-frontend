<template lang="pug">
	.Modal
		.Modal__wrapper(@click="closeOutside")
			.Modal__body(id="modal-body")
				h2.Modal__title(v-if="title") {{ title }}
				.Modal__content
					slot(name="content")
				.Modal__actions
					slot(name="actions")
</template>

<script>
export default {
	name: "WTLModal",
	props: {
		active: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			show: this.active
		}
	},
	methods: {
		close() {
			this.$emit("close")
			this.show = false
		},
		closeOutside(event) {
			if (!document.getElementById("modal-body").contains(event.target)) {
				this.close()
			}
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.Modal {
	&__wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	&__body {
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		margin: 1rem;
		min-width: 320px;
		max-width: 460px;
		max-height: calc(100vh - 1rem);
		border-radius: 3px;
		background-color: white;

		> *:not(:last-child) {
			padding: 0.5rem;
			border-bottom: 1px solid $lightgray;
			margin-bottom: 0.25rem;
		}
	}

	&__actions {
		display: flex;
		justify-content: flex-end;

		> *:not(:last-child) {
			margin-right: 0.5rem;
		}
	}
}
</style>

<template lang="pug">
	.Modal
		.Modal__wrapper(@click="closeOutside")
			.Modal__body(id="modal-body")
				slot
</template>

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
	}
}
</style>

<script>
export default {
	name: "WTLModal",
	props: {
		active: {
			type: Boolean,
			default: false
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

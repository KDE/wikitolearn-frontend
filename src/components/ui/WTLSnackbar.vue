<template lang="pug">
	transition(
		name="fade"
	)
		.WTLSnackbar(
			v-if="show"
		)
			.WTLSnackbar__container {{ text }}
				.WTLSnackbar__close-button(
					v-if="closable"
				) CLOSE
</template>

<script>
export default {
	name: "WTLSnackbar",
	props: {
		text: {
			type: String,
			required: true
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			show: false
		}
	},
	methods: {
		open() {
			this.show = true
		},
		close() {
			this.show = false
		},
		showSnack() {
			this.show = true
			setTimeout(() => {
				this.show = false
			}, 2000)
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

/* The snackbar - position it at the bottom and in the middle of the screen */
.WTLSnackbar {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	&__container {
		min-width: 5rem; /* Set a default minimum width */
		background-color: $red;
		color: #fff; /* White text color */
		text-align: center; /* Centered text */
		border-radius: 0.25rem; /* Rounded borders */
		padding: 1rem; /* Padding */
		position: fixed; /* Sit on top of the screen */
		z-index: 1; /* Add a z-index if needed */
		// left: 50%; /* Center the snackbar */
		bottom: 30px; /* 30px from the bottom */
	}
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

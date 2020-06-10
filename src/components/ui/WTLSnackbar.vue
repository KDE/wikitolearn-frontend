<template lang="pug">
	transition(
		name="fade"
	)
		.WTLSnackbar(
			v-if="show"
		)
			.WTLSnackbar__container(
				:class=`[
					"WTLSnackbar--" + type
				]`
			) {{ text }}
</template>

<script>
export default {
	name: "WTLSnackbar",
	props: {
		text: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: "default"
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
		max-width: 80%;
		max-height: 30%;
		min-width: 5rem; /* Set a default minimum width */
		background-color: $black;
		color: #fff; /* White text color */
		text-align: center; /* Centered text */
		border-radius: 0.25rem; /* Rounded borders */
		padding: 1rem; /* Padding */
		position: fixed; /* Sit on top of the screen */
		z-index: 1; /* Add a z-index if needed */
		bottom: 30px; /* 30px from the bottom */
		box-shadow: $shadow-2;
		word-wrap: break-word;
		overflow-wrap: break-all;
	}

	&--default {
		background-color: $black;
	}

	&--error {
		background-color: $red;
	}

	&--warning {
		background-color: $yellow;
	}

	&--success {
		background-color: $green;
	}
}


.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
	opacity: 0;
}
</style>

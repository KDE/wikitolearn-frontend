<template lang="pug">
	.WTLBanner(
		v-if="opened"
		:class=`[
			"WTLBanner--" + type
		]`
	)
		slot
		WTLButton.WTLBanner__close(
			v-if="closable || closeButtonText"
			@click="close"
			icon="close"
		) {{ closeButtonText }}
</template>

<script>
export default {
	name: "WTLBanner",
	props: {
		type: {
			type: String,
			default: "default"
		},
		closable: {
			type: Boolean,
			default: false
		},
		closeButtonText: {
			type: String,
			default: ""
		},
		onClose: {
			type: Function,
			default: () => {}
		}
	},
	data() {
		return {
			opened: true
		}
	},
	methods: {
		close() {
			this.onClose()
			this.opened = false
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.WTLBanner {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 0.5rem;
	box-shadow: $shadow-1;
	border-radius: $input-radius;
	color: #ffffff;
	background-color: $black;

	> * {
		margin-left: 0.5rem;
		margin-right: 0.5rem;
		height: 100%;
	}

	&--default {
		background-color: $black;
	}

	&--success {
		background-color: $green;
	}

	&--warning {
		background-color: $yellow;
	}

	&--error {
		background-color: $red;
	}

	&--full-width {
		width: 100%;
	}

	&__close {
		justify-content: flex-end;
	}
}
</style>


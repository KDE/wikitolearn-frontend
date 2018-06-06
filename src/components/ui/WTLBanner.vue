<template lang="pug">
	.WTLBanner(
		v-if="opened"
		:class=`[
			"WTLBanner--" + type
		]`
	)
		slot
		WTLButton.WTLBanner__close(
			v-if="closable"
			@click="opened = false"
			icon="close"
		)
</template>

<script>
export default {
	name: "WTLBanner",
	props: {
		text: {
			type: String,
			required: true
		},
		type: {
			type: String,
			default: "default"
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			opened: true
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
	padding: 1rem;
	box-shadow: $shadow-1;
	border-radius: $input-radius;
	color: #ffffff;
	background-color: black;

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


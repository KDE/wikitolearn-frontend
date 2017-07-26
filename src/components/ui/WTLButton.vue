<template lang="pug">
	button.WTLButton(
		:class=`[
			type ? 'WTLButton--' + type : '',
			{ 'disabled': disabled },
			{ 'WTLButton--has-icon': icon },
			{ 'WTLButton--no-text': !$slots.default }
		]`,
		@click="click"
	)
		WTLIcon(v-if="icon", :icon="icon")
		slot
</template>

<style lang="scss">
@import "~styles/declarations";

@mixin setBgColorAndHover($baseColor, $amount: 5%, $border: false) {
	background-color: $baseColor;

	@if $border {
		border: 1px solid darken($baseColor, $amount);
	} @else {
		/* fake border */
		border: 1px solid $baseColor;
	}

	&:hover:not(.disabled) {
		background-color: darken($baseColor, $amount);

		/* fake border */
		@if not $border {
			border: 1px solid darken($baseColor, $amount);
		}
	}
}

.WTLButton {
	display: inline-flex;
	align-items: center;
	vertical-align: middle;
	padding: 0.5rem 1rem;
	border-radius: $input-radius;
	font-size: 1rem;
	cursor: pointer;
	-webkit-appearance: none;
	text-transform: uppercase;

	&--no-text {
		padding: 0.5rem;
	}

	&--default {
		@include setBgColorAndHover(white, $amount: 10%, $border: true);
	}

	&--success {
		@include setBgColorAndHover($green);

		color: white;
	}

	&--info {
		@include setBgColorAndHover($blue);

		color: white;
	}

	&--warning {
		@include setBgColorAndHover($yellow);

		color: white;
	}

	&--error {
		@include setBgColorAndHover($red);

		color: white;
	}

	&.disabled {
		cursor: default;
		color: $disabled-fg;
		background-color: $disabled-bg;
		border-color: $disabled-border;
	}
}
</style>

<script>
export default {
	name: "WTLButton",
	props: {
		type: {
			type: String,
			default: "default"
		},
		disabled: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String
		}
	},
	methods: {
		click(e) {
			if (this.disabled) return

			this.$emit("click")
		}
	}
}
</script>

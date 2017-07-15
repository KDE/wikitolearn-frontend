<template lang="pug">
	.WTLButton(
		:class=`[
			type ? 'WTLButton--' + type : '',
			{ 'disabled': disabled }
		]`,
		@click="click"
	)
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
	display: inline-block;
	padding: 0.5rem 1rem;
	border-radius: 2px;
	cursor: pointer;

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

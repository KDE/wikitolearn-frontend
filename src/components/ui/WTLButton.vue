<template lang="pug">
	button.WTLButton(
		:class=`[
			type ? 'WTLButton--' + type : '',
			{ 'WTLButton--has-icon': icon },
			{ 'WTLButton--no-text': !$slots.default },
			{ 'WTLButton--no-border': !border }
		]`
		:disabled="disabled"
		@click="click"
		v-tooltip="tooltip"
	)
		WTLIcon(v-if="icon", :icon="icon")
		.WTLButton__content
			slot
</template>

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
			type: String,
			default: ""
		},
		tooltip: {
			type: String,
			default: ""
		},
		border: {
			type: Boolean,
			default: true
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

	&:hover:not(:disabled) {
		background-color: darken($baseColor, $amount);

		/* fake border */
		@if not $border {
			border: 1px solid darken($baseColor, $amount);
		}
	}
}

.WTLButton {
	@include input();

	cursor: pointer;
	border-radius: $input-radius;
	box-shadow: $shadow-1;
	color: $black;

	&--no-text {
		padding: 0.5rem 0.25rem;
	}

	&--has-icon:not(&--no-text) {
		padding-left: 0.4rem;
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

	&:disabled {
		color: $disabled-fg;
		background-color: $disabled-bg;
		border-color: $disabled-border;
	}

	&--no-border {
		border-color: transparent;
	}
}

.tooltip {
	display: block !important;
	z-index: 10000;

	.tooltip-inner {
		background: black;
		color: white;
		border-radius: 16px;
		padding: 5px 10px 4px;
	}

	.tooltip-arrow {
		width: 0;
		height: 0;
		border-style: solid;
		position: absolute;
		margin: 5px;
		border-color: black;
		z-index: 1;
	}

	&[x-placement^="top"] {
		margin-bottom: 5px;

		.tooltip-arrow {
			border-width: 5px 5px 0 5px;
			border-left-color: transparent !important;
			border-right-color: transparent !important;
			border-bottom-color: transparent !important;
			bottom: -5px;
			left: calc(50% - 5px);
			margin-top: 0;
			margin-bottom: 0;
		}
	}

	&[x-placement^="bottom"] {
		margin-top: 5px;

		.tooltip-arrow {
			border-width: 0 5px 5px 5px;
			border-left-color: transparent !important;
			border-right-color: transparent !important;
			border-top-color: transparent !important;
			top: -5px;
			left: calc(50% - 5px);
			margin-top: 0;
			margin-bottom: 0;
		}
	}

	&[x-placement^="right"] {
		margin-left: 5px;

		.tooltip-arrow {
			border-width: 5px 5px 5px 0;
			border-left-color: transparent !important;
			border-top-color: transparent !important;
			border-bottom-color: transparent !important;
			left: -5px;
			top: calc(50% - 5px);
			margin-left: 0;
			margin-right: 0;
		}
	}

	&[x-placement^="left"] {
		margin-right: 5px;

		.tooltip-arrow {
			border-width: 5px 0 5px 5px;
			border-top-color: transparent !important;
			border-right-color: transparent !important;
			border-bottom-color: transparent !important;
			right: -5px;
			top: calc(50% - 5px);
			margin-left: 0;
			margin-right: 0;
		}
	}

	&.popover {
		$color: #f9f9f9;

		.popover-inner {
			background: $color;
			color: black;
			padding: 24px;
			border-radius: 5px;
			box-shadow: 0 5px 30px rgba(black, 0.1);
		}

		.popover-arrow {
			border-color: $color;
		}
	}

	&[aria-hidden="true"] {
		visibility: hidden;
		opacity: 0;
		transition: opacity 0.15s, visibility 0.15s;
	}

	&[aria-hidden="false"] {
		visibility: visible;
		opacity: 1;
		transition: opacity 0.15s;
	}
}
</style>

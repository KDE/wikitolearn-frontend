<template lang="pug">
	div.WTLInput(:class=`[
			{ "WTLInput--disabled": disabled },
			{ "WTLInput--valid": valid },
			{ "WTLInput--invalid": invalid }
		]`
	)
		input.WTLInput__input(
			:class=`[
					{ 'WTLInput__input--has-icon': icon },
					icon ? 'WTLInput__input--has-icon--' + iconPosition : ''
				]`
			:placeholder="placeholder"
			:type="inputType"
			:disabled="disabled"
			:readonly="readonly"
			:min="min"
			:max="max"
			:minlength="minlength"
			:maxlength="maxlength"
			:required="required"
			:value="inputValue"
			@input="input"
		)
		// WTLIcon.WTLInput__icon(
			v-if="icon",
			:icon="icon",
			:class="'WTLInput__icon--' + iconPosition")
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
	name: "WTLInput",
	props: {
		value: {
			type: [Number, String],
			default: ""
		},
		type: {
			type: String,
			default: "text"
		},
		required: Boolean,
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: ""
		},
		maxlength: [Number, String],
		minlength: [Number, String],
		readonly: Boolean,
		min: [Number, String],
		max: [Number, String],
		icon: String,
		iconPosition: {
			type: String,
			default: "left"
		},
		validator: {
			type: Function
		}
	},
	data() {
		return {
			inputValue: this.value,
			inputType: this.type,
			valid: false,
			invalid: false
		}
	},
	watch: {
		value(newValue) {
			this.inputValue = newValue
			this.checkValidity()
		}
	},
	methods: {
		/*
		* Input's input listener.
		*
		*   1. Emit input event to update the user v-model.
		*   2. If it's invalid, validate again.
		*/
		input(event) {
			const value = event.target.value
			this.inputValue = value
			this.checkValidity()
			this.$emit("input", value)
		},

		checkValidity() {
			if (this.validator && typeof this.validator === "function") {
				if (this.validator(this.inputValue)) {
					this.valid = true
					this.invalid = false
				} else {
					this.valid = false
					this.invalid = true
				}
			}
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

$input-border-color: #dbdbdb;

.WTLInput {
	display: inline-flex;
	align-items: center;
	position: relative;
	box-shadow: $shadow-1;
	min-width: 12.5rem;
	border-radius: $input-radius;

	&--full-width {
		width: 100%;
	}

	/* &__icon {
		color: #dbdbdb;

		&--left {
			left: 0.1rem;
		}

		&--right {
			right: 0.1rem;
		}
	} */

	&__input {
		@include input();

		width: 100%;
		border: 1px solid $input-border-color;
		border-radius: $input-radius;

		/* &--has-icon {
			&--left {
				padding-left: 2rem;
			}

			&--right {
				padding-right: 2rem;
			}
		} */

		&--full-width {
			width: 100%;
		}

		&:disabled {
			background-color: $disabled-bg;
			color: $disabled-fg;
		}

		&:focus {
			outline: 0;
			border-color: $blue;

			& ~ .WTLInput__icon {
				color: $black;
			}
		}
	}

	&--valid {
		.WTLInput__input {
			border-color: $green;
		}
	}

	&--invalid {
		.WTLInput__input {
			border-color: $red;
		}
	}
}
</style>

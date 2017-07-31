<template lang="pug">
	div.WTLInput(:class=`[
			{ "WTLInput--disabled": disabled },
			{ "WTLInput--valid": valid },
			{ "WTLInput--invalid": invalid }
		]`
	)
		WTLIcon.WTLInput__icon(v-if="icon", :icon="icon", :class="'WTLInput__icon--' + iconPosition")
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
</template>

<script>
export default {
	name: "WTLInput",
	props: {
		value: [Number, String],
		type: {
			type: String,
			default: "text"
		},
		required: Boolean,
		disabled: {
			type: Boolean,
			default: false
		},
		placeholder: String,
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
	min-width: 12.5rem;

	&__input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid $input-border-color;
		border-radius: $input-radius;
		font-size: 1rem;
		background-color: #fff;
		-webkit-appearance: none;

		&--has-icon {
			&--left {
				padding-left: 1.75rem;
			}

			&--right {
				padding-right: 1.75rem;
			}
		}

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
		}
	}

	&__icon {
		position: absolute;
		font-size: 1.25rem !important;

		&--left {
			left: 0;
		}

		&--right {
			right: 0;
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

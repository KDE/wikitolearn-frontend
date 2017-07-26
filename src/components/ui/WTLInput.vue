<template lang="pug">
	div(:class="{ 'WTLInput--has-icon': icon }")
		WTLIcon(v-if="icon", :icon="icon", :position="iconPosition")
		input.WTLInput(
			:class=`[
					{ "WTLInput--disabled": disabled }
				]`
			:placeholder="placeholder"
			:type="inputType"
			:icon="icon"
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
		iconPosition: String
	},
	data() {
		return {
			inputValue: this.value,
			inputType: this.type,
			valid: true
		}
	},
	computed: {
		valueLength() {
			return this.inputValue ? this.inputValue.length : 0
		}
	},
	watch: {
		value(value) {
			/**
				* When v-model is changed:
				*	1. Set internal value.
				*	2. If it's invalid, validate again.
				*/
			this.inputValue = value
			// TODO: check validity of `value`
			// !this.valid && this.checkHtml5Validity()
		}
	},
	methods: {
		input(event) {
			/**
				* Emit `input` event with associated `value`
				* Check validity of `value`
				*/
			const value = event.target.value
			this.inputValue = value
			this.$emit("input", value)
			// TODO: check validity of `value`
			// !this.valid && this.checkHtml5Validity()
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

$input-border-color: #dbdbdb;

.WTLInput {
	display: inline-flex;
	padding: 0.5rem;
	border: 1px solid $input-border-color;
	border-radius: $input-radius;
	font-size: 1rem;
	background-color: #fff;
	-webkit-appearance: none;

	&--full-width {
		width: 100%;
	}

	&--has-error {
		border-color: $red;
	}

	&--has-success {
		border-color: $green;
	}

	&:disabled {
		background-color: $disabled-bg;
		color: $disabled-fg;
	}

	&:focus {
		outline: 0;
		border-color: $blue;
	}

	&--has-icon {
		position: relative;
		display: inline-flex;

		.WTLIcon--is-left {
			+ .WTLInput {
				padding-left: 1.9rem;
			}
		}
	}
}
</style>

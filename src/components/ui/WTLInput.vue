<template lang="pug">
	input(
		class="WTLInput"
		:class=`[
				{ "disabled": disabled }
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
		max: [Number, String]
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

.WTLInput {
	border: 1px solid $input-border-color;
	border-radius: 3px;
	font-size: 1rem;
	display: inline-flex;
	padding: calc(0.375em - 1px) calc(0.625em - 1px);
	position: relative;
	height: 2.25em;
	box-shadow: inset 0 1px 2px hsla(0, 0%, 4%, 0.1);
	background-color: #fff;
	margin: 0%;

	.full-width {
		width: 100%;
	}

	&--has-error {
		border-color: $red;
	}

	&--has-success {
		border-color: $green;
	}

	&:focus {
		border-color: #7957d5;
	}

	&:disabled {
		background-color: $disabled-bg;
		color: $disabled-fg;
	}
}
</style>

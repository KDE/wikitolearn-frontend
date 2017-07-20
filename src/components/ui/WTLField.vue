<template lang="pug">
	.WTLField(:class="[fieldType, addonsPosition]")
		label.WTLField__label(v-if="label") {{ label }}
		.WTLField__content
			slot
		p.WTLField__help(:class="newType", v-if="newMessage") {{ newMessage }}
		// TODO with v-tooltip(v-if="message") {{ message }}
</template>

<script>
export default {
	name: "WTLField",
	props: {
		type: String,
		label: String,
		message: String,
		grouped: Boolean
	},
	data() {
		return {
			newType: this.type,
			newMessage: this.message,
			_isField: true
		}
	},
	watch: {
		type(value) {
			this.newType = value
		},
		message(value) {
			this.newMessage = value
		}
	},
	computed: {
		fieldType() {
			if (this.grouped) {
				return "WTLField__is-grouped"
			} else if (this.$slots.default !== undefined && this.$slots.default.length > 1) {
				return "WTLField__has-addons"
			}
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.WTLField__label {
	font-weight: $font-weight-semibold;
}

.WTLField {
	&.WTLField__is-grouped {
		.WTLField__content > *:not(:first-child) {
			margin-left: 0.75rem;
		}
	}

	&.WTLField__has-addons .WTLField__content {
		> * {
			border-radius: 0;
		}

		> *:first-child {
			border-bottom-left-radius: $input-radius;
			border-top-left-radius: $input-radius;
		}

		> *:last-child {
			border-bottom-right-radius: $input-radius;
			border-top-right-radius: $input-radius;
		}
	}
}
</style>


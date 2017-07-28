<template lang="pug">
	.WTLField(:class="[fieldType]")
		label.WTLField__label(v-if="label") {{ label }}
		.WTLField__content
			slot
		.WTLField__help(:class="newType", v-if="newMessage") {{ newMessage }}
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
				return "WTLField--is-grouped"
			} else if (this.$slots.default !== undefined && this.$slots.default.length > 1) {
				return "WTLField--has-addons"
			}
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.WTLField {
	&.WTLField--is-grouped {
		.WTLField__content > *:not(:last-child) {
			margin-right: 0.75rem;
		}
	}

	&.WTLField--has-addons .WTLField__content {
		> *,
		.WTLInput__input {
			border-radius: 0;
		}

		> *:first-child,
		> *:first-child .WTLInput__input {
			border-bottom-left-radius: $input-radius;
			border-top-left-radius: $input-radius;
		}

		> *:last-child,
		> *:last-child .WTLInput__input {
			border-bottom-right-radius: $input-radius;
			border-top-right-radius: $input-radius;
		}
	}

	&__content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}

	&__label {
		display: inline-block;
		font-weight: $font-weight-semibold;
		margin-bottom: 0.2rem;
	}
}
</style>


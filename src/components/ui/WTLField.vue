<template lang="pug">
	.field(:class="[fieldType, addonsPosition, { 'is-expanded': expanded }]")
		label.label(v-if="label") {{ label }}
		slot
		p.help(:class="newType", v-if="newMessage") {{ newMessage }}
		// TODO with v-tooltip(v-if="message") {{ message }}
</template>

<script>
export default {
	name: "WTLField",
	props: {
		type: String,
		label: String,
		message: String,
		grouped: Boolean,
		position: String,
		expanded: Boolean
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
		addonsPosition() {
			if (this.position === undefined) return

			const position = this.position.split("-")
			if (position.length < 1) return

			if (this.position) return "has-addons-" + position[1]
		},

		fieldType() {
			if (this.grouped) {
				return "is-grouped"
			} else if (this.$slots.default !== undefined && this.$slots.default.length > 1) {
				return "has-addons"
			}
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.label {
	font-weight: $weight-semibold;
}

.field {
	&.is-grouped {
		.field {
			flex-shrink: 0;

			& + .field {
				margin-left: 0.75rem;
			}

			&.is-expanded {
				flex-grow: 1;
				flex-shrink: 1;
			}
		}
	}

	&.has-addons .control {
		&:first-child > .control {
			.WTLButton,
			.WTLInput,
			.WTLSelect select {
				border-bottom-left-radius: $input-radius;
				border-top-left-radius: $input-radius;
			}
		}

		&:last-child > .control {
			.WTLButton,
			.WTLInput,
			.WTLSelect select {
				border-bottom-right-radius: $input-radius;
				border-top-right-radius: $input-radius;
			}
		}

		> .control {
			.WTLButton,
			.WTLInput,
			.WTLSelect select {
				border-radius: 0;
			}
		}
	}
}

.control {
	.help.counter {
		float: right;
		margin-left: 0.5em;
	}

	.icon {
		&.is-clickable {
			pointer-events: auto;
			cursor: pointer;
		}
	}
}
</style>


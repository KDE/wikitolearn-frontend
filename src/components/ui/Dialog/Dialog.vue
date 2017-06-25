<template lang="pug">
	.Dialog(
		:class=`[
			type ? 'Dialog--' + type : '',
		]`
	)
		.Dialog__wrapper(v-if="active")
				.Dialog__body
					.Dialog__header {{ title }}
					.Dialog__content {{ type }} {{ content }}
					.Dialog__footer
						WTLButton(v-if="dialogType == 'confirm'", @click="cancel()") Cancel
						WTLButton(:type="type", @click="confirm()") OK
</template>

<style lang="scss">
@import "~styles/declarations";

.Dialog {
	&__wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	&__body {
		display: flex;
		flex-direction: column;
		padding: 1rem 2rem;
		margin: 1rem;
		min-width: 320px;
		max-width: 460px;
		max-height: calc(100vh - 1rem);
		border-radius: 3px;
		background-color: white;
	}

	&__header {
		font-size: 1.5rem;
		font-weight: bold;
		padding-bottom: 0.5rem;
		margin-bottom: 0.5rem;
		border-bottom: 1px solid $lightgray;
	}

	&__content {
		margin-bottom: 1rem;
		overflow-y: auto;
		overflow-x: hidden;
	}

	&__footer {
		text-align: right;
	}

	&--error {
		color: $red;
	}

	&--success {
		color: $green;
	}

	&--warning {
		color: $yellow;
	}
}
</style>

<script>
import WTLButton from "components/ui/WTLButton"

export default {
	name: "Dialog",
	components: {
		WTLButton
	},
	props: {
		active: {
			type: Boolean,
			default: false
		},
		content: String,
		type: {
			type: String,
			default: "info"
		},
		dialogType: {
			type: String,
			required: true
		},
		onClose: {
			type: Function,
			default: () => {}
		}
	},
	computed: {
		title() {
			return "No title"
		}
	},
	methods: {
		close() {
			this.$emit("close")
			this.active = false
		},
		confirm() {
			this.$emit("confirm")
			this.close()
		},
		cancel() {
			this.$emit("cancel")
			this.close()
		}
	},
	beforeMount() {
		document.body.appendChild(this.$el)
	},
	mounted() {
		this.active = true
	}
}
</script>

<template lang="pug">
	component.Editable(
		:is="componentTag"
		:placeholder="$t('page_title')"
		contenteditable="true"
		@input="handleInput"
		@paste.prevent="handlePaste"
		@keydown.enter.prevent
	) {{sanitizedValue}}
</template>

<script>
export default {
	name: "Editable",
	props: {
		value: {
			type: String,
			default: ""
		},
		as: {
			type: String,
			default: "p"
		}
	},
	computed: {
		sanitizedValue() {
			return this.value.replace(/[\r\n]+/g, "")
		},
		componentTag() {
			return ["p", "h1", "h2", "h3"].includes(this.as) ? this.as : "p"
		}
	},
	methods: {
		handleInput(e) {
			const selection = document.getSelection()
			const offset = selection.anchorOffset
			const textContent = e.target.textContent
			this.$emit("input", textContent)
			this.$nextTick(() => {
				selection.collapse(selection.anchorNode, offset)
			})
		},
		handlePaste(e) {
			const selection = document.getSelection()
			selection.deleteFromDocument()
			const offset = selection.anchorOffset
			const pastedText = e.clipboardData.getData("text").replace(/[\r\n]+/g, "")
			const textContent =
				e.target.textContent.slice(0, offset) +
				pastedText +
				e.target.textContent.slice(offset)
			this.$emit("input", textContent)
			this.$nextTick(() => {
				selection.collapse(selection.anchorNode, offset + pastedText.length)
			})
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

$input-border-color: #dbdbdb;

.Editable {
	min-width: 12.5rem;
	cursor: pointer;

	&:focus {
		cursor: text;
		padding: 0.5em;
		border-radius: $input-radius;
		border: 1px solid $input-border-color;
		box-shadow: $shadow-1;
		background-color: $white-bg;
	}

	&:disabled {
		cursor: not-allowed;
	}
}

/* Add placeholder support for contentEditable elements */
[contenteditable=true]:empty::before {
	opacity: 0.7;
	content: attr(placeholder);
	pointer-events: none;
	display: block; /* For Firefox */
}
</style>

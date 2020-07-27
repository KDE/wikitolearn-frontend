<template lang="pug">
	.Dropdown(
		@click="toggleOpen"
		v-click-outside="handleClickOutside"
	)
		slot
			div
		.Dropdown__menu(:class=`{ open: isOpen }`)
			slot(name="menu")
</template>

<script>
export default {
	name: "Dropdown",
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		toggleOpen() {
			this.isOpen = !this.isOpen
		},
		handleClickOutside() {
			this.isOpen = false
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.Dropdown {
	position: relative;
	display: inline-block;
	outline: none;

	&__menu {
		position: absolute;
		top: 100%;
		display: none;
		min-width: 160px;
		left: auto;
		right: 0;
		float: left;
		text-align: left;
		background-color: white;
		box-shadow: $shadow-2;
		border-radius: 0.15rem;
		margin: 0;

		&.open {
			display: block;
		}

		& > * {
			width: 100%;
		}
	}
}
</style>

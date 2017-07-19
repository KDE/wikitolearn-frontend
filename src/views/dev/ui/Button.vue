<template lang="pug">
	div
		h2 Buttons
		WTLButton Button
		WTLButton(type="success") Green Button
		WTLButton(type="info") Blue Button
		WTLButton(type="warning") Yellow Button
		WTLButton(type="error") Red Button
		WTLButton(disabled=true) Disabled Button
		WTLButton(icon="done", type="success") Button with icon
		WTLButton(icon="done", disabled=true) Disabled button with icon
</template>

<style lang="scss">
.view--UIDemo {
	.WTLButton {
		margin-right: 0.25rem;
	}
}
</style>

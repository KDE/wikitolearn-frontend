<template lang="pug">
	#app.App(:class="{ 'App--rtl': isRTL }")
		noscript Your browser does not have JS enabled, you are still able to browse the website but you won't be able to access advanced features such as editing or loggin-in.
		AppHeader
		.App__content
			transition(name="fade", mode="out-in")
				router-view.view
		.App__polling-operations
			PollingBar
</template>

<style lang="scss">
@import "~styles/global";
@import "~styles/declarations";

noscript {
	display: block;
	padding: 1rem;
	background-color: red;
	color: white;
	font-size: 1.5rem;
}

.App {
	display: flex;
	min-height: 100vh;
	flex-direction: column;
}

.App__content {
	flex: 1;
	background-color: #f8f8fb;

	a {
		color: $blue;
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	.view {
		@include container();

		padding-top: 5rem;
	}
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>

<script>
import AppHeader from "components/AppHeader"
import PollingBar from "components/PollingBar"

export default {
	name: "App",
	components: { AppHeader, PollingBar },
	data: () => {
		return {
			isRTL: LANGUAGE_ISRTL
		}
	}
}
</script>

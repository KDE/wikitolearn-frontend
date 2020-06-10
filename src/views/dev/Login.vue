<template lang="pug">
	main.view--Login
		.Login__card
			h2 WikiToLearn login form
			.Login__grid
				WTLField(label="Username")
					WTLInput.WTLInput--full-width(placeholder="Username")
				WTLField(label="Password")
					WTLInput.WTLInput--full-width(placeholder="Password", type="password")
				WTLButton.WTLButton--full-width(type="info") Log In
</template>

<script>
export default {
	name: "Login",
	meta() {
		return {
			title: "Login",
			description: "This is the meta description for the login page"
		}
	}
}
</script>

<style lang="scss">
@import "~styles/declarations";

.view--Login {
	h2 {
		margin-bottom: 0.5rem;
	}

	.Login__card {
		@include card(1);

		.Login__grid {
			display: grid;
			grid-template-columns: repeat(1, 1fr);
			grid-gap: 0.5rem;
			align-items: center;
			justify-items: stretch;

			@include media-breakpoint-up("sm") {
				grid-template-columns: repeat(2, 1fr);
			}

			@include media-breakpoint-up("md") {
				grid-template-columns: repeat(3, 1fr);
				grid-gap: 1rem;

				> .WTLButton {
					align-self: end;
				}
			}
		}
	}
}
</style>

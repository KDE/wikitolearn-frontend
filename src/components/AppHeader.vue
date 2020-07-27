<template lang="pug">
	header.AppHeader
		.AppHeader__content
			.AppHeader__left
				router-link.AppHeader__link(to="/")
					img.AppHeader__logo(
						src="~images/logo.png", alt="WikiToLearn - collaborative textbooks"
					)
					img.AppHeader__name(
						src="~images/name.svg", alt="WikiToLearn - collaborative textbooks"
					)
			.AppHeader__right
				WTLField(grouped=true)
					UserMenu
</template>

<script>
import UserMenu from "components/UserMenu"
import WTLField from "components/ui/WTLField"

export default {
	name: "AppHeader",
	components: { UserMenu, WTLField }
}
</script>

<style lang="scss">
@import "~styles/declarations";

.AppHeader {
	position: fixed;
	padding: 0.5rem 0;
	width: 100%;
	top: 0;
	left: 0;
	font-size: 1.5rem;
	background-color: white;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
	border-top: 4px solid;
	border-image: $border-image-wtl;
	z-index: 9999;

	&__content {
		@include container();

		display: flex;
		align-items: center;
	}

	&__left {
		flex: 1;
		font-size: 0;
	}

	&__link {
		display: inline-flex;
		align-items: center;
	}

	&__logo {
		height: 2.5rem;
		margin-right: 0.5rem;
	}

	&__name {
		height: 1.8rem;
	}
}
</style>

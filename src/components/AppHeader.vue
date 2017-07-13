<template lang="pug">
	header.AppHeader
		.AppHeader__left
			router-link.AppHeader__link(to="/")
				img.AppHeader__logo(src="~images/logo.png", alt="Logo")
				div.AppHeader__name
					h3.AppHeader__title WikiToLearn
					div.AppHeader__subtitle $ts("site_subtitle")
		.AppHeader__right
			SessionInfo
</template>

<style lang="scss">
.AppHeader {
	display: flex;
	padding: 1rem 2rem;
	font-size: 1.5rem;
	background-color: whitesmoke;

	&__left {
		flex: 1;
	}

	&__link {
		display: inline-flex;
		align-items: center;
		color: black;
		text-decoration: none;
	}

	&__logo {
		width: 2.5rem;
		margin-right: 0.5rem;
	}
}
</style>

<script>
import SessionInfo from "components/SessionInfo"

export default {
	name: "AppHeader",
	components: { SessionInfo }
}
</script>

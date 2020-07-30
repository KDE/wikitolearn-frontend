<template lang="pug">
	ClientOnly
		.UserMenu(slot="placeholder")
			WTLButton(loading)
		.UserMenu
			WTLButton(v-if="!$keycloak || !$keycloak.ready", loading)
			Dropdown(v-if="$keycloak && $keycloak.ready")
				template
					WTLButton(v-if="$keycloak.authenticated", icon="face", type="success")
					WTLButton(v-if="!$keycloak.authenticated", icon="face")
				template(slot="menu", v-if="$keycloak.authenticated")
					div.UserMenu__option {{ $keycloak.user.username }}
					WTLButton(@click=`$keycloak.logout`, type="error", :border="false") Logout
				template(slot="menu", v-if="!$keycloak.authenticated")
					WTLButton(@click=`doRegistration`, :border="false") Register
					WTLButton(@click=`doLogin`, :border="false") Login
</template>

<script>
import WTLButton from "components/ui/WTLButton"
import WTLField from "components/ui/WTLField"
import ClientOnly from "vue-client-only"

import Dropdown from "./Dropdown"

export default {
	name: "UserMenu",
	components: { ClientOnly, Dropdown, WTLButton, WTLField },
	methods: {
		loadProfile() {
			this.$keycloak.loadUserProfile().success((user) => {
				this.$dialog.alert({ content: JSON.stringify(user) })
			})
		},
		doLogin() {
			this.$keycloak.login({
				redirectUri: `${window.location.origin}/`
			})
		},
		doRegistration() {
			this.$keycloak.register({
				redirectUri: `${window.location.origin}/`
			})
		}
	}
}
</script>

<style  lang="scss">
.UserMenu {
	font-size: 1rem;

	&__option {
		text-align: center;
		padding: 0.5em;
	}
}
</style>

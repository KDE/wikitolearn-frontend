<template lang="pug">
	ClientOnly
		.SessionInfo
			template(v-if="$keycloak && $keycloak.ready")
				WTLButton(v-if="!$keycloak.authenticated", @click=`doLogin()`) Login
				template(v-if="$keycloak.authenticated")
					WTLField(grouped=true)
						WTLButton(
							@click=`checkLogin()`
							icon="face"
						)
						WTLButton(@click=`$keycloak.logout()`, type="error") Logout
</template>

<script>
import WTLButton from "components/ui/WTLButton"
import WTLField from "components/ui/WTLField"
import ClientOnly from "vue-client-only"

export default {
	name: "SessionInfo",
	components: { ClientOnly, WTLButton, WTLField },
	methods: {
		checkLogin() {
			const _this = this
			this.$keycloak.loadUserProfile().success((user) => {
				_this.$dialog.alert({ content: JSON.stringify(user) })
			})
		},
		doLogin() {
			this.$keycloak.login({
				redirectUri: `${window.location.origin}/afterLogin`
			})
		}
	}
}
</script>

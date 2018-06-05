<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$keycloak && $keycloak.ready")
				WTLButton(v-if="!$keycloak.authenticated", @click=`doLogin()`) Login
				template(v-if="$keycloak.authenticated")
					WTLField(grouped=true)
						WTLButton(@click=`checkLogin()`) View user info
						WTLButton(@click=`$keycloak.logout()`, type="error") Logout
</template>

<script>
export default {
	name: "SessionInfo",
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

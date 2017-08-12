<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$keycloak")
				WTLButton(@click=`doLogin()`) Login
				WTLButton(@click=`$keycloak.logout()`) Logout
				WTLButton(@click=`checkLogin()`) Get User Data
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

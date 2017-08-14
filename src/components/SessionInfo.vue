<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$keycloak && $keycloak.ready")
				WTLButton(v-if="!$keycloak.authenticated", @click=`doLogin()`) Login
				template(v-if="$keycloak.authenticated")
					span {{ $keycloak.user.username }}
						small ({{ $keycloak.user.email }})
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

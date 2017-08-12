<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$keycloak")
				a(v-if="authenticated()") You are logged in
				a(v-else) Not logged in
				WTLButton(@click=`$keycloak.login({
					redirectUri: "http://localhost:8080/afterLogin"
				})`) Login
				WTLButton(@click=`$keycloak.logout()`) Logout
				WTLButton(@click=`authenticated()`) Check
				p {{ $keycloak.authenticated }}
</template>

<script>
export default {
	name: "SessionInfo",
	methods: {
		authenticated() {
			console.log(this.$keycloak.authenticated)
			return this.$keycloak.authenticated
		}
	}
}
</script>

<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$auth")
				a(v-if="!$auth.check()") Not logged in
				a(v-if="$auth.check()") You are logged in
				WTLButton(@click=`$auth.login({
					data: {
						username: 'admin',
						password: 'secret'
					}
				})`) Login
</template>

<script>
export default {
	name: "SessionInfo"
}
</script>

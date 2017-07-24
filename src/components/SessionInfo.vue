<template lang="pug">
	NoSSR
		.SessionInfo
			template(v-if="$auth")
				a(v-if="!$auth.check()") Not logged in
				a(v-if="$auth.check()") You are logged in
				button(@click=`$auth.login({
					data: {
						username: 'admin',
						password: 'secret'
					}
				})`) Login
				p {{ $auth.user() }}
</template>

<script>
export default {
	name: "SessionInfo"
}
</script>

<template lang="pug">
	NoSSR
		.SessionInfo
			p LoginStatus
			div(v-if="$auth && $auth.ready()")
				a(v-if="!$auth.check()") login
</template>

<script>
export default {
	name: "SessionInfo"
}
</script>

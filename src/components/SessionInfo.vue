<template lang="pug">
	NoSSR
		.SessionInfo
			div(v-if="$auth")
				a(v-if="!$auth.check()") Not logged in
				a(v-if="$auth.check()") You are logged in
</template>

<script>
export default {
	name: "SessionInfo"
}
</script>

<template lang="pug">
	main.view--NotFound
		h1 404 - Page not found
		router-link(to="/") Go back to the homepage
</template>

<script>
export default {
	name: "NotFound",
	meta() {
		return {
			title: "Not Found",
			description: "Page was not found",
			httpStatusCode: 404
		}
	}
}
</script>

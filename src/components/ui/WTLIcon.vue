<template lang="pug">
	i.material-icons.WTLIcon {{ icon }}
</template>

<script>
export default {
	name: "WTLIcon",
	props: {
		icon: String
	}
}
</script>

<style lang="scss">
.WTLIcon.material-icons {
	height: 100%;
	font-size: 1.125rem;
	width: 2rem;
	pointer-events: none;
}
</style>

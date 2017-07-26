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
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	font-size: 1rem;
	width: 2rem;
}


</style>

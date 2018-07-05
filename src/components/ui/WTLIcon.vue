<template lang="pug">
	i.material-icons.WTLIcon(
		:class=`[{ "WTLIcon--default": !clickable }]`
	) {{ icon }}
</template>

<script>
export default {
	name: "WTLIcon",
	props: {
		icon: String,
		clickable: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss">
.WTLIcon.material-icons {
	height: 100%;
	font-size: 1.125rem;
	width: 2rem;
}

.WTLIcon--default {
	pointer-events: none;
}
</style>

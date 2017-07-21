<template lang="pug">
	span.WTLIcon__span(:class=`"WTLIcon--is-" + position`)
		i.material-icons.WTLIcon {{ icon }}
</template>

<script>
export default {
	name: "WTLIcon",
	props: {
		icon: String,
		position: {
			type: String,
			default: "left"
		}
	}
}
</script>

<style lang="scss">
.WTLIcon {
	text-align: center;
	font-size: 1rem !important;
	width: 2rem;

	&__span {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	&--is-left {
		left: 0;
	}

	&--is-right {
		right: 0;
	}
}


</style>

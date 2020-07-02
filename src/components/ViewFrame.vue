<template lang="pug">
	.ViewFrame
		.ViewFrame__header
			WTLButton(
					v-if="hasBackButton"
					icon="arrow_back_ios",
					:tooltip="$t('go_back')",
					@click="() => $router.go(-1)"
				)
			.ViewFrame__title
				slot(name="title")
			.ViewFrame__actions
				slot(name="actions")
		.ViewFrame__content
			slot(name="content")
</template>

<script>

export default {
	name: "ViewFrame",
	props: {
		hasBackButton: {
			type: Boolean,
			default: true
		}
	}
}
</script>


<style lang="scss">
.ViewFrame__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0;

	& > * {
		margin-right: 1em;

		&:last-child {
			margin-right: 0;
		}
	}
}

.ViewFrame__title {
	flex: 1;
	text-align: center;
}

.ViewFrame__actions {
	display: flex;
	align-items: center;
}

.ViewFrame__content {
	margin-bottom: 1rem;
}
</style>

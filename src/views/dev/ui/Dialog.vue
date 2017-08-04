<template lang="pug">
	div
		h2 Alert
		WTLButton(@click="$dialog.alert({ content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid optio odit maiores doloribus id officia porro veritatis pariatur dolorem, cumque illum eum commodi nostrum distinctio praesentium natus, accusantium rerum atque.' })") Open generic Alert
		WTLButton(@click="$dialog.alert({ content: 'Something went wrong', type: 'error' })") Open error Alert
		WTLButton(@click="$dialog.alert({ content: 'Great!', type: 'success' })") Open success Alert
		WTLButton(@click="$dialog.alert({ content: 'Something yellow', type: 'warning' })") Open warning Alert
		h2 Confirm
		WTLButton(@click="$dialog.confirm({ content: 'Are you sure?' })") Open confirm dialog
		WTLButton(@click=`
			$dialog.confirm({
				content: 'Press ok to open onother dialog',
				onConfirm() {
					$dialog.alert({ content: 'You confirmed' })
				}
			})`) Open confirm dialog with events
		h2 Modal
		WTLButton(@click="showModal = true") Open modal test

		WTLModal(:active.sync="showModal")
			h1 Hello
</template>

<script>
export default {
	data() {
		return {
			showModal: false
		}
	}
}
</script>

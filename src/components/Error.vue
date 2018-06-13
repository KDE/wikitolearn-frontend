<template lang="pug">
	WTLSnackbar(
		type="error"
		:text="errorMsg"
		ref="snackbar"
	)
</template>

<script>
import { mapState } from "vuex"
import WTLSnackbar from "components/ui/WTLSnackbar"

export default {
	name: "Error",
	components: { WTLSnackbar },
	data() {
		return {
			errorMsg: ""
		}
	},
	computed: {
		...mapState([
			"error"
		])
	},
	watch: {
		error: function(val) {
			if (this.error !== null) {
				if (val.response) {
					this.errorMsg = val.response.data.status + " - " + val.response.data.error
					const description = val.response.data.error_description
					if (description !== undefined) {
						this.errorMsg += " - " + description
					}
					this.$refs.snackbar.showSnack()
				} else {
					console.log(val)
				}
			}
		}
	}
}
</script>

import Vue from "vue"
import Dialog from "./Dialog"

function open(propsData) {
	const DialogComponent = Vue.extend(Dialog)
	return new DialogComponent({
		el: document.createElement("div"),
		propsData
	})
}

export default {
	alert(propsData) {
		propsData.dialogType = "alert"
		open(propsData)
	},

	confirm(propsData) {
		propsData.dialogType = "confirm"
		open(propsData)
	}
}

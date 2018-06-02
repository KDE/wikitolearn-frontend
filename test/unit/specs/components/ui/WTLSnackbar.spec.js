import { mount } from "@vue/test-utils"
import { expect } from "chai"
import WTLSnackbar from "components/ui/WTLSnackbar"
import { sleep } from "../utils"

describe("WTLSnackbar", () => {
	let snackbar = mount(WTLSnackbar)
	snackbar.setProps({
		text: "Sample text"
	})

	it("reads text prop", () => {
		expect(snackbar.vm.text).to.equal("Sample text")
	})

	it("shows and hides", () => {
		snackbar.vm.open()
		expect(snackbar.find(".WTLSnackbar").isVisible()).to.be.true
		snackbar.vm.close()
		expect(snackbar.contains(".WTLSnackbar")).to.be.false
	})

	it("auto shows and hides after 2000ms", () => {
		snackbar.vm.showSnack()
		expect(snackbar.find(".WTLSnackbar").isVisible()).to.be.true
		sleep(2000).then((response) => {
			expect(snackbar.contains(".WTLSnackbar")).to.be.false
		})
	})
})

import { mount } from "@vue/test-utils"
import { expect } from "chai"
import WTLBanner from "components/ui/WTLBanner"

describe("WTLBanner", () => {
	let banner = mount(WTLBanner, {
		slots: {
			default: "Sample text"
		}
	})
	banner.setProps({
		closable: true,
		type: "error"
	})

	it("displays text", () => {
		expect(banner.text()).to.equal("Sample text")
	})

	it("closes on button click", () => {
		expect(banner.is(".WTLBanner")).to.be.true
		let button = banner.find(".WTLBanner__close")
		button.trigger("click").then(() => {
			expect(banner.is(".WTLBanner")).to.be.false
		})
	})
})

import { mount } from "avoriaz"
import { expect } from "chai"
import sinon from "sinon"
import { slotText } from "../utils"

import WTLButton from "components/ui/WTLButton"

describe("WTLButton", () => {
	it("renders", () => {
		const button = mount(WTLButton)
		expect(button.hasClass("WTLButton")).to.equal(true)
	})

	it("renders with content", () => {
		const button = mount(WTLButton, {
			slots: {
				default: slotText("Content")
			}
		})
		expect(button.text()).to.equal("Content")
	})

	it("handle clicks", () => {
		const button = mount(WTLButton)
		const clickHandler = sinon.stub()
		button.vm.$on("click", function() {
			clickHandler()
		})
		button.trigger("click")
		expect(clickHandler.called).to.equal(true)
	})

	it("does not handle clicks when disabled", () => {
		const button = mount(WTLButton, {
			propsData: {
				disabled: true
			}
		})
		const clickHandler = sinon.stub()
		button.vm.$on("click", () => {
			clickHandler()
		})
		button.trigger("click")
		expect(clickHandler.called).to.equal(false)
	})
})

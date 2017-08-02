import { mount } from "avoriaz"
import { expect } from "chai"

import WTLField from "components/ui/WTLField"

describe("WTLField", () => {
	it("renders", () => {
		const field = mount(WTLField)
		expect(field.hasClass("WTLField")).to.equal(true)
	})

	it("displays a label", () => {
		const field = mount(WTLField, {
			propsData: {
				label: "Label"
			}
		})
		expect(field.contains(".WTLField__label")).to.equal(true)

		const label = field.find(".WTLField__label")[0]
		expect(label.text()).to.equal("Label")
	})

	it("displays an additional message", () => {
		const field = mount(WTLField, {
			propsData: {
				message: "Message"
			}
		})
		expect(field.contains(".WTLField__message")).to.equal(true)

		const message = field.find(".WTLField__message")[0]
		expect(message.text()).to.equal("Message")
	})
})

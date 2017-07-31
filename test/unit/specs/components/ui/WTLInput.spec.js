import { mount } from "avoriaz"
import { expect } from "chai"

import WTLInput from "components/ui/WTLInput"

describe("WTLInput", () => {
	it("renders", () => {
		const input = mount(WTLInput)
		expect(input.hasClass("WTLInput")).to.equal(true)
	})

	it("handles values (and change of value)", () => {
		const input = mount(WTLInput, {
			propsData: {
				value: "Hello"
			}
		})
		expect(input.vm.value).to.equal("Hello")

		input.setProps({
			value: "New Value"
		})

		expect(input.vm.value).to.equal("New Value")
	})
})

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

	it("validates data with external validator", () => {
		const input = mount(WTLInput, {
			propsData: {
				validator: (value) => {
					return value === "test"
				}
			}
		})
		expect(input.hasClass("WTLInput--invalid")).to.equal(false)
		expect(input.hasClass("WTLInput--valid")).to.equal(false)

		input.setProps({
			value: "fail validator"
		})
		expect(input.hasClass("WTLInput--invalid")).to.equal(true)
		expect(input.hasClass("WTLInput--valid")).to.equal(false)

		input.setProps({
			value: "test"
		})
		expect(input.hasClass("WTLInput--invalid")).to.equal(false)
		expect(input.hasClass("WTLInput--valid")).to.equal(true)
	})
})

import { mount } from "avoriaz"
import { expect } from "chai"
import Badge from "components/home/Badge"

describe("Badge", () => {
	it("renders a name", () => {
		const badge = mount(Badge, {
			propsData: {
				link: {
					view: "Courses",
					title: "All courses"
				}
			}
		})

		expect(badge.is("div")).to.equal(true)
		expect(badge.hasClass("Badge")).to.equal(true)
		expect(badge.find(".Badge__name")[0].text()).to.equal("All courses")
	})
})

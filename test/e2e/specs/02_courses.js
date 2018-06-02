module.exports = {
	"Courses main page loads": (browser) => {
		const server = browser.globals.serverURL

		browser
			.url(server + "/c")
			.assert.elementPresent(".view--Courses__title")
			.assert.elementPresent(".view--Courses__container")
			.assert.elementPresent(".Pagination")
			//.click("#toggleEditMode")
			.end()
	}
}

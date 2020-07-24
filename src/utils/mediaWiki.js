import unescape from "lodash/unescape"

const parseMathElements = (documentNode) => {
	const parseMath = (math) => {
		return unescape(math.replace(/\\mbox/ig, "\\text"))
	}
	for (const element of documentNode.querySelectorAll("span[typeof=\"mw:Extension/math\"]")) {
		const math = element.querySelector("annotation[encoding=\"application/x-tex\"]").innerHTML.trim()
		element.outerHTML = "<script type=\"math/tex\">" + parseMath(math) + "<\/script>"
	}
	for (const element of documentNode.querySelectorAll("div[typeof=\"mw:Extension/math\"]")) {
		const math = element.querySelector("annotation[encoding=\"application/x-tex\"]").innerHTML.trim()
		element.outerHTML = "<script type=\"math/tex; mode=display\">" + parseMath(math) + "<\/script>"
	}
}

const parseBeginEnvironmentNode = (environmentNode) => {
	return environmentNode.querySelector(".wtlenvironment > .beginenvironment")
}

const parseEnvironmentContentNode = (environmentNode) => {
	let environmentContent = environmentNode.querySelector(".wtlenvironment > .environmentcontent")
	if (!environmentContent) {
		const contentElements = environmentNode.querySelectorAll(".wtlenvironment > :not(.beginenvironment):not(.endenvironment)")
		environmentContent = document.createElement("div")
		environmentContent.className = "environmentcontent"
		for (const contentElement of contentElements) {
			contentElement && environmentContent.appendChild(contentElement)
		}
	}
	return environmentContent
}

const parseEndEnvironmentNode = (environmentNode) => {
	return environmentNode.querySelector(".wtlenvironment > .endenvironment")
}

const parseEnvironmentTypeAttribute = (environmentNode) => {
	const beginEnvironment = environmentNode.querySelector(".wtlenvironment > .beginenvironment")
	const endEnvironment = environmentNode.querySelector(".wtlenvironment > .endenvironment")
	let environmentType
	if (beginEnvironment) {
		const environmentClass = [...beginEnvironment.classList]
			.find((c) => c.startsWith("begin") && c !== "beginenvironment")
		if (environmentClass) {
			environmentType = environmentClass.replace(/begin/, "")
		}
	}
	if (!environmentType && endEnvironment) {
		const environmentClass = [...endEnvironment.classList]
			.find((c) => c.startsWith("end") && c !== "endenvironment")
		if (environmentClass) {
			environmentType = environmentClass.replace(/end/, "")
		}
	}
	if (environmentType && !environmentNode.dataset.environmenttype) {
		environmentNode.dataset.environmenttype = environmentType
	}
}

const parseEnvironmentTitle = (beginEnvironmentNode) => {
	beginEnvironmentNode.innerHTML = beginEnvironmentNode.innerHTML.replace(/[^(]*\(?([^)]*).*/, "$1")
}

const addMissingEnvironmentWrappers = (documentNode) => {
	for (const beginEnvironment of documentNode.querySelectorAll(".beginenvironment")) {
		const parentElement = beginEnvironment.parentElement
		if (parentElement.classList.contains("wtlenvironment")) {
			// Environment is already wrapped in a proper container, move on
			continue
		}
		const wrapperElement = document.createElement("div")
		wrapperElement.className = "wtlenvironment"
		parentElement.insertBefore(wrapperElement, beginEnvironment)
		const elementsToMoveIntoWrapper = []
		let currentElement = beginEnvironment
		while (currentElement && !Array.from(currentElement.classList || []).includes("endenvironment")) {
			elementsToMoveIntoWrapper.push(currentElement)
			currentElement = currentElement.nextSibling
		}
		if (currentElement) {
			elementsToMoveIntoWrapper.push(currentElement)
		}
		for (const element of elementsToMoveIntoWrapper) {
			wrapperElement.appendChild(element)
		}
	}
}

const parseMediaWikiText = (text) => {
	let parsedText = text
	if (typeof DOMParser === "undefined") {
		return parsedText
	}
	const parser = new DOMParser()
	const doc = parser.parseFromString(parsedText, "text/html")
	parseMathElements(doc)
	addMissingEnvironmentWrappers(doc)
	for (const environment of doc.querySelectorAll(".wtlenvironment")) {
		const beginEnvironment = parseBeginEnvironmentNode(environment)
		const environmentContent = parseEnvironmentContentNode(environment)
		const endEnvironment = parseEndEnvironmentNode(environment)
		parseEnvironmentTypeAttribute(environment)
		environment.innerHTML = ""
		if (beginEnvironment) {
			parseEnvironmentTitle(beginEnvironment)
			environment.appendChild(beginEnvironment)
		}
		if (environmentContent) {
			environment.appendChild(environmentContent)
		}
		if (endEnvironment) {
			environment.appendChild(endEnvironment)
		}
	}
	parsedText = doc.body.innerHTML
	return parsedText
}

export default {
	parseMediaWikiText
}

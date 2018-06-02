import { compileToFunctions } from "vue-template-compiler"

export function slotText(text) {
	return compileToFunctions(`<p>${text}</p>`)
}

export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

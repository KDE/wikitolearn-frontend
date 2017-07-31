import { compileToFunctions } from "vue-template-compiler"

export function slotText(text) {
	return compileToFunctions(`<p>${text}</p>`)
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin"
import Widget from "@ckeditor/ckeditor5-widget/src/widget"

import MathUI from "./ui"
import MathEditing from "./editing"
import AutoMath from "./automath"

export default class Math extends Plugin {
	static get requires() {
		return [MathEditing, MathUI, Widget, AutoMath]
	}

	static get pluginName() {
		return "Math"
	}
}

import Plugin from "@ckeditor/ckeditor5-core/src/plugin"

import EnvironmentUI from "./ui"
import EnvironmentEditing from "./editing"
import "./styles.css"

class Environment extends Plugin {
	static get requires() {
		return [EnvironmentEditing, EnvironmentUI]
	}

	static get pluginName() {
		return "Environment"
	}
}

export default Environment

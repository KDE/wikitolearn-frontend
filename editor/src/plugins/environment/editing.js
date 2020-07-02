import Plugin from "@ckeditor/ckeditor5-core/src/plugin"
import { toWidget, toWidgetEditable } from "@ckeditor/ckeditor5-widget/src/utils"
import Widget from "@ckeditor/ckeditor5-widget/src/widget"
import Command from "@ckeditor/ckeditor5-core/src/command"

class EnvironmentEditing extends Plugin {
	static get requires() {
		return [Widget]
	}

	static get pluginName() {
		return "EnvironmentEditing"
	}

	init() {
		this._defineSchema()
		this._defineConverters()
		this.editor.commands.add("insertEnvironment", new InsertEnvironmentCommand(this.editor))
	}

	_defineSchema() {
		const schema = this.editor.model.schema
		schema.register("environment", {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,
			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: "$block",
			allowAttributes: ["environmentType"]
		})
		schema.register("environmentHeader", {
			// Cannot be split or left by the caret.
			isLimit: true,
			allowIn: "environment",
			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: "$block"
		})
		schema.register("environmentContent", {
			// Cannot be split or left by the caret.
			isLimit: true,
			allowIn: "environment",
			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: "$root"
		})
		schema.register("environmentFooter", {
			// Cannot be split or left by the caret.
			isLimit: true,
			allowIn: "environment",
			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: "$block"
		})
		schema.addAttributeCheck((context) => {
			if (
				context.endsWith("environmentHeader") ||
				context.endsWith("environmentContent") ||
				context.endsWith("environmentFooter")
			) {
				return true
			}
		})
		schema.addChildCheck((context, childDefinition) => {
			if (context.endsWith("environmentContent") && childDefinition.name === "environment") {
				return false
			}
		})
	}

	_defineConverters() {
		const conversion = this.editor.conversion
		// <environment> converters
		conversion.for("upcast").elementToElement({
			model: "environment",
			view: {
				name: "div",
				classes: "wtlenvironment"
			}
		})
		conversion.for("dataDowncast").elementToElement({
			model: "environment",
			view: {
				name: "div",
				classes: "wtlenvironment"
			}
		})
		conversion.for("editingDowncast").elementToElement({
			model: "environment",
			view: (modelElement, viewWriter) => {
				const div = viewWriter.createContainerElement("div", { class: "wtlenvironment" })
				return toWidget(div, viewWriter, { label: "environment widget" })
			}
		})
		conversion.attributeToAttribute({
			view: {
				name: "div",
				classes: "wtlenvironment",
				key: "data-environmenttype"
			},
			model: "environmentType",
			converterPriority: "low"
		})
		// <environmentHeader> converters
		conversion.for("upcast").elementToElement({
			model: (viewElement, modelWriter) => {
				return modelWriter.createElement("environmentHeader", viewElement.getAttributes())
			},
			view: {
				name: "div",
				classes: "beginenvironment"
			}
		})
		conversion.for("dataDowncast").elementToElement({
			model: "environmentHeader",
			view: {
				name: "div",
				classes: "beginenvironment"
			}
		})
		conversion.for("editingDowncast").elementToElement({
			model: "environmentHeader",
			view: (modelElement, viewWriter) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement("div", { class: "beginenvironment" })
				return toWidgetEditable(div, viewWriter)
			}
		})
		// <environmentContent> converters
		conversion.for("upcast").elementToElement({
			model: "environmentContent",
			view: {
				name: "div",
				classes: "environmentcontent"
			}
		})
		conversion.for("dataDowncast").elementToElement({
			model: "environmentContent",
			view: {
				name: "div",
				classes: "environmentcontent"
			}
		})
		conversion.for("editingDowncast").elementToElement({
			model: "environmentContent",
			view: (modelElement, viewWriter) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement("div", { class: "environmentcontent" })
				return toWidgetEditable(div, viewWriter)
			}
		})
		// <environmentFooter> converters
		conversion.for("upcast").elementToElement({
			model: (viewElement, modelWriter) => {
				return modelWriter.createElement("environmentFooter", viewElement.getAttributes())
			},
			view: {
				name: "div",
				classes: "endenvironment"
			}
		})
		conversion.for("dataDowncast").elementToElement({
			model: "environmentFooter",
			view: {
				name: "div",
				classes: "endenvironment"
			}
		})
		conversion.for("editingDowncast").elementToElement({
			model: "environmentFooter",
			view: (modelElement, viewWriter) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createContainerElement("div", { class: "endenvironment" })
				return toWidget(div, viewWriter)
			}
		})
		// common converters
		conversion.for("downcast").add((dispatcher) => {
			dispatcher.on("attribute", (evt, data, conversionApi) => {
				// Convert attributes only for specific elements
				if (! ["environment", "environmentHeader", "environmentContent", "environmentFooter"].includes(data.item.name)) {
					return
				}
				// Do not leak custom attribute from Model
				if (data.item.name === "environment" && data.attributeKey === "environmentType") {
					return
				}
				const viewWriter = conversionApi.writer
				const viewDiv = conversionApi.mapper.toViewElement(data.item)
				// In the model-to-view conversion we convert changes.
				// An attribute can be added or removed or changed.
				// The below code handles all 3 cases.
				if (data.attributeNewValue) {
					viewWriter.setAttribute(data.attributeKey, data.attributeNewValue, viewDiv)
				} else {
					viewWriter.removeAttribute(data.attributeKey, viewDiv)
				}
			})
		})
	}
}

class InsertEnvironmentCommand extends Command {
	execute(environmentType) {
		this.editor.model.change((writer) => {
			// Insert <environment>*</environment> at the current selection position
			// in a way that will result in creating a valid model structure.
			this.editor.model.insertContent(createEnvironment(writer, environmentType))
		})
	}

	refresh() {
		const model = this.editor.model
		const selection = model.document.selection
		const allowedIn = model.schema.findAllowedParent(selection.getFirstPosition(), "environment")
		this.isEnabled = allowedIn !== null
		// Get environment type from selected widget, if any
		const selectedEnvironment = getSelectedEnvironmentModelWidget(selection)
		this.value = selectedEnvironment ? selectedEnvironment.getAttribute("environmentType") : "definition"
	}
}

function getSelectedEnvironmentModelWidget(selection) {
	const selectedElement = selection.getSelectedElement()
	if (selectedElement && selectedElement.is("environment")) {
		return selectedElement
	}
	return null
}

function createEnvironment(writer, environmentType) {
	const environmentClass = (environmentType || "definition").trim().toLowerCase()
	const environment = writer.createElement("environment", { environmentType: environmentClass })
	const environmentHeader = writer.createElement("environmentHeader", { class: `beginenvironment begin${environmentClass}` })
	const environmentContent = writer.createElement("environmentContent")
	const environmentFooter = writer.createElement("environmentFooter", { class: `endenvironment end${environmentClass}` })
	writer.append(environmentHeader, environment)
	writer.append(environmentContent, environment)
	writer.append(environmentFooter, environment)
	// There must be at least one paragraph for the content to be editable.
	// See https://github.com/ckeditor/ckeditor5/issues/1464.
	writer.appendElement("paragraph", environmentContent)
	return environment
}

export default EnvironmentEditing

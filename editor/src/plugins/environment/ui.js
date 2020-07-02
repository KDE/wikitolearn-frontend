import Plugin from "@ckeditor/ckeditor5-core/src/plugin"
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview"
import ClickObserver from "@ckeditor/ckeditor5-engine/src/view/observer/clickobserver"
import ContextualBalloon from "@ckeditor/ckeditor5-ui/src/panel/balloon/contextualballoon"
import clickOutsideHandler from "@ckeditor/ckeditor5-ui/src/bindings/clickoutsidehandler"

import MainFormView from "./ui/mainFormView"

const environmentKeystroke = "Ctrl+E"

class EnvironmentUI extends Plugin {
	static get requires() {
		return [ContextualBalloon]
	}

	static get pluginName() {
		return "EnvironmentUI"
	}

	init() {
		const editor = this.editor
		editor.editing.view.addObserver(ClickObserver)
		this.formView = this._createFormView()
		this._balloon = editor.plugins.get(ContextualBalloon)
		this._createToolbarEnvironmentButton()
		this._enableUserBalloonInteractions()
	}

	destroy() {
		super.destroy()
		this.formView.destroy()
	}

	_showUI() {
		const editor = this.editor
		const environmentCommand = editor.commands.get("insertEnvironment")
		if (!environmentCommand.isEnabled) {
			return
		}
		this._addFormView()
		this._balloon.showStack("main")
	}

	_createFormView() {
		const editor = this.editor
		const environmentCommand = editor.commands.get("insertEnvironment")
		const environmentConfig = this.editor.config.get("environment") || {}
		const ENVIRONMENTS = [
			"Definition",
			"Theorem",
			"Proof",
			"Example",
			"Proposition",
			"Corollary",
			"Axiom",
			"Remark",
			"Lemma",
			"Exercise"
		]
		const environmentOptions = ENVIRONMENTS
			.map((e) => ({
				value: e.toLowerCase(),
				label: e
			}))
			.concat(environmentConfig.options || [])
		const formView = new MainFormView(editor.locale, environmentOptions)
		formView.environmentInputView.bind("value").to(environmentCommand, "value")
		// Form elements should be read-only when corresponding commands are disabled.
		formView.environmentInputView.bind("isReadOnly").to(environmentCommand, "isEnabled", (value) => !value)
		formView.saveButtonView.bind("isEnabled").to(environmentCommand)
		// Listen to submit button click
		this.listenTo(formView, "submit", () => {
			// editor.execute("environment", formView.equation, formView.displayButtonView.isOn, environmentConfig.outputType, environmentConfig.forceOutputType)
			editor.execute("insertEnvironment", formView.environmentType)
			this._closeFormView()
		})
		// Listen to cancel button click
		this.listenTo(formView, "cancel", () => {
			this._closeFormView()
		})
		// Close plugin ui, if esc is pressed (while ui is focused)
		formView.keystrokes.set("esc", (data, cancel) => {
			this._closeFormView()
			cancel()
		})
		return formView
	}

	_addFormView() {
		if (this._isFormInPanel) {
			return
		}
		const editor = this.editor
		const environmentCommand = editor.commands.get("insertEnvironment")
		this._balloon.add({
			view: this.formView,
			position: this._getBalloonPositionData()
		})
		if (this._balloon.visibleView === this.formView) {
			this.formView.environmentInputView.select()
		}
		this.formView.environmentType = environmentCommand.value || ""
	}

	_hideUI() {
		if (!this._isFormInPanel) {
			return
		}
		const editor = this.editor
		this.stopListening(editor.ui, "update")
		this.stopListening(this._balloon, "change:visibleView")
		editor.editing.view.focus()
		// Remove form first because it"s on top of the stack.
		this._removeFormView()
	}

	_closeFormView() {
		const environmentCommand = this.editor.commands.get("insertEnvironment")
		if (environmentCommand.value !== undefined) {
			this._removeFormView()
		} else {
			this._hideUI()
		}
	}

	_removeFormView() {
		if (this._isFormInPanel) {
			this.formView.saveButtonView.focus()
			this._balloon.remove(this.formView)
			// Hide preview element
			this.editor.editing.view.focus()
		}
	}

	_getBalloonPositionData() {
		const view = this.editor.editing.view
		const viewDocument = view.document
		const target = view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange())
		return { target }
	}

	_createToolbarEnvironmentButton() {
		const editor = this.editor
		const environmentCommand = editor.commands.get("insertEnvironment")
		const t = editor.t
		// Handle the `Ctrl+E` keystroke and show the panel.
		editor.keystrokes.set(environmentKeystroke, (keyEvtData, cancel) => {
			// Prevent focusing the search bar in FF and opening new tab in Edge. #153, #154.
			cancel()
			if (environmentCommand.isEnabled) {
				this._showUI()
			}
		})
		this.editor.ui.componentFactory.add("environment", (locale) => {
			const buttonView = new ButtonView(locale)
			buttonView.set({
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t("Environment"),
				withText: true,
				tooltip: true,
				isEnabled: true,
				keystroke: environmentKeystroke,
				isToggleable: true
			})
			buttonView.bind("isEnabled").to(environmentCommand, "isEnabled")
			this.listenTo(buttonView, "execute", () => this._showUI())
			return buttonView
		})
	}

	_enableUserBalloonInteractions() {
		// Close the panel on the Esc key press when the editable has focus and the balloon is visible.
		this.editor.keystrokes.set("Esc", (data, cancel) => {
			if (this._isUIVisible) {
				this._hideUI()
				cancel()
			}
		})
		// Close on click outside of balloon panel element.
		clickOutsideHandler({
			emitter: this.formView,
			activator: () => this._isFormInPanel,
			contextElements: [this._balloon.view.element],
			callback: () => this._hideUI()
		})
	}

	get _isUIVisible() {
		const visibleView = this._balloon.visibleView
		return visibleView === this.formView
	}

	get _isFormInPanel() {
		return this._balloon.hasView(this.formView)
	}
}

export default EnvironmentUI

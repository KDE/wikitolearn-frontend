
import View from "@ckeditor/ckeditor5-ui/src/view"
import ViewCollection from "@ckeditor/ckeditor5-ui/src/viewcollection"
import ButtonView from "@ckeditor/ckeditor5-ui/src/button/buttonview"
import LabeledInputView from "@ckeditor/ckeditor5-ui/src/labeledinput/labeledinputview"
import InputTextView from "@ckeditor/ckeditor5-ui/src/inputtext/inputtextview"
import KeystrokeHandler from "@ckeditor/ckeditor5-utils/src/keystrokehandler"
import FocusTracker from "@ckeditor/ckeditor5-utils/src/focustracker"
import FocusCycler from "@ckeditor/ckeditor5-ui/src/focuscycler"
import checkIcon from "@ckeditor/ckeditor5-core/theme/icons/check.svg"
import cancelIcon from "@ckeditor/ckeditor5-core/theme/icons/cancel.svg"
import submitHandler from "@ckeditor/ckeditor5-ui/src/bindings/submithandler"

import { createDropdown, addListToDropdown } from "@ckeditor/ckeditor5-ui/src/dropdown/utils"
import Collection from "@ckeditor/ckeditor5-utils/src/collection"
import Model from "@ckeditor/ckeditor5-ui/src/model"

export default class MainFormView extends View {
	constructor(locale, options) {
		super(locale)
		const t = locale.t
		this.options = options
		// Create key event & focus trackers
		this._createKeyAndFocusTrackers()
		// Equation input
		this.environmentInputView = this._createEnvironmentInput()
		// Submit button
		this.saveButtonView = this._createButton(t("Save"), checkIcon, "ck-button-save", null)
		this.saveButtonView.type = "submit"
		// Cancel button
		this.cancelButtonView = this._createButton(t("Cancel"), cancelIcon, "ck-button-cancel", "cancel")
		this.dropdownView = this._createDropdownView(options)
		const children = [
			this.environmentInputView,
			this.dropdownView
		]
		// Add UI elements to template
		this.setTemplate({
			tag: "form",
			attributes: {
				class: [
					"ck",
					"ck-environment-form"
				],
				tabindex: "-1",
				spellcheck: "false"
			},
			children: [
				{
					tag: "div",
					attributes: {
						class: [
							"ck-environment-view"
						]
					},
					children
				},
				this.saveButtonView,
				this.cancelButtonView
			]
		})
	}

	render() {
		super.render()
		// Prevent default form submit event & trigger custom 'submit'
		submitHandler({
			view: this
		})
		// Register form elements to focusable elements
		const childViews = [
			this.environmentInputView,
			this.saveButtonView,
			this.cancelButtonView
		]
		childViews.forEach((v) => {
			this._focusables.add(v)
			this.focusTracker.add(v.element)
		})
		// Listen to keypresses inside form element
		this.keystrokes.listenTo(this.element)
	}

	focus() {
		this._focusCycler.focusFirst()
	}

	get environmentType() {
		return this.environmentInputView.inputView.element.value
	}

	set environmentType(environmentType) {
		this.environmentInputView.inputView.element.value = environmentType
		const environmentTypeOption = this.options
			.find((option) => option.value === environmentType)
		const environmentTypeLabel = environmentTypeOption ?
			environmentTypeOption.label :
			environmentType
		this.dropdownView.buttonView.set({
			label: environmentTypeLabel
		})
	}

	_createKeyAndFocusTrackers() {
		this.focusTracker = new FocusTracker()
		this.keystrokes = new KeystrokeHandler()
		this._focusables = new ViewCollection()
		this._focusCycler = new FocusCycler({
			focusables: this._focusables,
			focusTracker: this.focusTracker,
			keystrokeHandler: this.keystrokes,
			actions: {
				focusPrevious: "shift + tab",
				focusNext: "tab"
			}
		})
	}

	_createEnvironmentInput() {
		const t = this.locale.t
		const environmentInput = new LabeledInputView(this.locale, InputTextView)
		environmentInput.infoText = t("Insert the environment type (definition, lemma, proof, etc.).")
		return environmentInput
	}

	_createButton(label, icon, className, eventName) {
		const button = new ButtonView(this.locale)
		button.set({
			label,
			icon,
			tooltip: true
		})
		button.extendTemplate({
			attributes: {
				class: className
			}
		})
		if (eventName) {
			button.delegate("execute").to(this, eventName)
		}
		return button
	}

	_createDropdownView(options) {
		const dropdownView = createDropdown(this.locale)
		dropdownView.buttonView.set({
			label: "Select the environment",
			withText: true
		})
		const items = new Collection()
		for (const option of options) {
			items.add({
				type: "button",
				model: new Model({
					withText: true,
					id: option.value,
					label: option.label
				})
			})
		}
		addListToDropdown(dropdownView, items)
		this.dropdownView = dropdownView
		dropdownView.on("execute", (eventInfo) => {
			const selectedOption = eventInfo.source
			if (selectedOption.id) {
				this.environmentType = selectedOption.id
			}
		})
		return dropdownView
	}
}

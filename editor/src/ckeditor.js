import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js"
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js"
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter"
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js"
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js"
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js"
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js"
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js"
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js"
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js"
import Image from "@ckeditor/ckeditor5-image/src/image.js"
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js"
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js"
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js"
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js"
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js"
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock.js"
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js"
import Link from "@ckeditor/ckeditor5-link/src/link.js"
import List from "@ckeditor/ckeditor5-list/src/list.js"
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js"
import PageBreak from "@ckeditor/ckeditor5-page-break/src/pagebreak.js"
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js"
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice"
import SpecialCharacters from "@ckeditor/ckeditor5-special-characters/src/specialcharacters.js"
import SpecialCharactersArrows from "@ckeditor/ckeditor5-special-characters/src/specialcharactersarrows.js"
import SpecialCharactersCurrency from "@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency.js"
import SpecialCharactersEssentials from "@ckeditor/ckeditor5-special-characters/src/specialcharactersessentials.js"
import SpecialCharactersMathematical from "@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical.js"
import SpecialCharactersText from "@ckeditor/ckeditor5-special-characters/src/specialcharacterstext.js"
import Table from "@ckeditor/ckeditor5-table/src/table.js"
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js"
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js"

import Environment from "./plugins/environment"
import Math from "./plugins/math"

import "./styles.css"

class Editor extends ClassicEditor {}

Editor.builtinPlugins = [
	Autoformat,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	Code,
	CodeBlock,
	Environment,
	Essentials,
	Heading,
	Highlight,
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	Math,
	MediaEmbed,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Table,
	TableToolbar,
	TextTransformation
]

export default Editor

<template lang="pug">
	div(v-if="page")
		.PageRenderer__content(v-html="parsedContent")
		script(
			type="application/javascript",
			defer,
			src="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/mathtex-script-type.min.js",
			integrity="sha384-LJ2FmexL77rmGm6SIpxq7y+XA6bkLzGZEgCywzKOZG/ws4va9fUVu2neMjvc3zdv",
			crossorigin="anonymous"
		)
</template>

<script>
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import ViewFrame from "components/ViewFrame"

export default {
	name: "PageRenderer",
	components: {
		ViewFrame
	},
	props: {
		page: {
			type: Object,
			required: true
		}
	},
	computed: {
		parsedContent() {
			return this.parseMediaWikiText(this.page.content)
		}
	},
	mounted() {
		this.$nextTick(() => {
			hljs.addPlugin({
				"after:highlightBlock": ({ block, result }) => {
					block.parentElement.dataset.language = result.language
				}
			})
			document.querySelectorAll("pre code").forEach((block) => {
				hljs.highlightBlock(block)
			})
		})
	}
}
</script>

<style lang="scss">
.PageRenderer__content {
	background-color: white;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	padding: 1rem;

	.mw-content-ltr {
		direction: ltr;
	}

	.mw-editsection {
		display: none;
	}

	.beginenvironment {
		font-weight: bolder;
	}

	.wtlenvironment[data-environmenttype="definition"] .beginenvironment::before {
		content: "$ts('definition'): ";
	}

	.wtlenvironment[data-environmenttype="theorem"] .beginenvironment::before {
		content: "$ts('theorem'): ";
	}

	.wtlenvironment[data-environmenttype="proof"] .beginenvironment::before {
		content: "$ts('proof'): ";
	}

	.wtlenvironment[data-environmenttype="example"] .beginenvironment::before {
		content: "$ts('example'): ";
	}

	.wtlenvironment[data-environmenttype="proposition"] .beginenvironment::before {
		content: "$ts('proposition'): ";
	}

	.wtlenvironment[data-environmenttype="corollary"] .beginenvironment::before {
		content: "$ts('corollary'): ";
	}

	.wtlenvironment[data-environmenttype="axiom"] .beginenvironment::before {
		content: "$ts('axiom'): ";
	}

	.wtlenvironment[data-environmenttype="remark"] .beginenvironment::before {
		content: "$ts('remark'): ";
	}

	.wtlenvironment[data-environmenttype="lemma"] .beginenvironment::before {
		content: "$ts('lemma'): ";
	}

	.wtlenvironment[data-environmenttype="exercise"] .beginenvironment::before {
		content: "$ts('exercise'): ";
	}

	.environmentcontent {
		padding-left: 0.5em;
		border-left: 1px solid #ddd;
	}

	.endenvironment {
		margin-bottom: 1em;
	}
}

.hljs {
	padding: 0;
	background: unset;
}
</style>

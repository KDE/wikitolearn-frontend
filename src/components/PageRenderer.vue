<template lang="pug">
	ViewFrame
		template(slot="title")
			h1 {{page.title}}
		template(slot="actions")
			router-link(
				:to=`{
					name: 'EditPage',
					params: { pageTitle: $route.params.pageTitle }
				}`
			)
				WTLButton(
					type="success",
					icon="mode_edit"
					:tooltip="$t('edit')"
				)
		template(slot="content")
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

	.begindefinition::before {
		content: "Definition: ";
	}

	.begintheorem::before {
		content: "Theorem: ";
	}

	.beginproof::before {
		content: "Proof: ";
	}

	.beginexample::before {
		content: "Example: ";
	}

	.beginproposition::before {
		content: "Proposition: ";
	}

	.begincorollary::before {
		content: "Corollary: ";
	}

	.beginaxiom::before {
		content: "Definition: ";
	}

	.beginremark::before {
		content: "Remark: ";
	}

	.beginlemma::before {
		content: "Lemma: ";
	}

	.beginexercise::before {
		content: "Exercise: ";
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

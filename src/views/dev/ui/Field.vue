<template lang="pug">
	div
		h2 Field
		WTLField(label="Label")
			WTLInput(placeholder="Search...")
			WTLButton(icon="info", type="info") Ok
		WTLField(label="Grouped Field", grouped=true, message="Example message")
			WTLInput(placeholder="Search...", type="search")
			WTLInput(placeholder="Search...")
			WTLButton(icon="delete", type="error") Delete all
</template>

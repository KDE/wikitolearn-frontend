<template lang="pug">
	div
		h2 Field
		WTLField(label="Label")
			WTLInput(placeholder="Search...")
			WTLButton(icon="lock", type="info")
			WTLInput(icon="lock", placeholder="Let's break field tag")
		WTLField(label="Grouped Field", grouped=true, message="Example message")
			WTLInput(placeholder="Search...", type="search")
			WTLInput(placeholder="Search...")
			WTLButton(icon="delete", type="error") Delete all
</template>

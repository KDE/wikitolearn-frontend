<template lang="pug">
	div
		h2 Field
		WTLField(grouped=true, label="Label")
			WTLInput(placeholder="Search...")
			div.control
				WTLButton(icon="delete", type="error") Delete all
			div.control
				WTLButton(icon="menu", type="success") Open menu
</template>

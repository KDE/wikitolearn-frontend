<template lang="pug">
	div
		h2 WTLInput
		WTLInput(placeholder="Type: number [0-5]", type="number", min=0, max=5)
		br
		WTLInput(value="Disabled text", disabled=true)
		WTLInput(placeholder="text, length[0-10]", maxlength=10)
		WTLInput(placeholder="password", type="password", icon="lock")
		WTLInput(placeholder="password", type="password", icon="lock", iconPosition="right")

</template>

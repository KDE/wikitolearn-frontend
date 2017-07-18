<template lang="pug">
	div
		h2 Async
		WTLButton(@click="$store.dispatch('START_POLLING')") Start async
</template>

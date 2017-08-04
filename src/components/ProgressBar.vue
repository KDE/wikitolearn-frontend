<!-- borrowed from Nuxt! -->

<template>
	<div class="progress" :style="{
			'width': percent+'%',
			'background-color': canSuccess ? color : failedColor,
			'opacity': show ? 1 : 0
		}">
	</div>
</template>

<script>
export default {
	data() {
		return {
			percent: 0,
			show: false,
			canSuccess: true,
			duration: 3000,
			color: "#347bff",
			failedColor: "#ff0000"
		}
	},
	methods: {
		start() {
			this.show = true
			this.canSuccess = true
			if (this._timer) {
				clearInterval(this._timer)
				this.percent = 0
			}
			this._cut = 10000 / Math.floor(this.duration)
			this._timer = setInterval(() => {
				if (this.percent > 90) {
					clearInterval(this._timer)
				}
				this.increase(this._cut * Math.random())
			}, 100)
			return this
		},
		set(num) {
			this.show = true
			this.canSuccess = true
			this.percent = Math.floor(num)
			return this
		},
		get() {
			return Math.floor(this.percent)
		},
		increase(num) {
			this.percent = this.percent + Math.floor(num)
			return this
		},
		decrease(num) {
			this.percent = this.percent - Math.floor(num)
			return this
		},
		finish() {
			this.percent = 100
			this.hide()
			return this
		},
		pause() {
			clearInterval(this._timer)
			return this
		},
		hide(fastHide=true) {
			clearInterval(this._timer)
			this._timer = null

			if (fastHide) this.show = false

			setTimeout(() => {
				this.show = false
				this.$nextTick(() => {
					setTimeout(() => {
						this.percent = 0
					}, 200)
				})
			}, 500)
			return this
		},
		fail() {
			clearInterval(this._timer)
			this.canSuccess = false
			return this
		}
	}
}
</script>

<style scoped>
.progress {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 3px;
	width: 0%;
	transition: width 0.2s, opacity 0.4s;
	opacity: 1;
	background-color: #347bff;
	z-index: 999999;
}
</style>

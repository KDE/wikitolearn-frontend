<template>
	<div class="cssload-loader-inner">
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@import "~styles/_variables";

.cssload-loader-inner {
		height: 30px;
		margin: auto;
		width: 30px;
}

.cssload-cssload-loader-line-wrap-wrap {
		animation: cssload-spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		-o-animation: cssload-spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		-ms-animation: cssload-spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		-webkit-animation: cssload-spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		-moz-animation: cssload-spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite;
		box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		height: 15px;
		left: 0;
		overflow: hidden;
		position: absolute;
		top: 0;
		transform-origin: 50% 100%;
		-o-transform-origin: 50% 100%;
		-ms-transform-origin: 50% 100%;
		-webkit-transform-origin: 50% 100%;
		-moz-transform-origin: 50% 100%;
		width: 30px;
}
.cssload-loader-line-wrap {
		border: 2px solid transparent;
		border-radius: 100%;
		-o-border-radius: 100%;
		-ms-border-radius: 100%;
		-webkit-border-radius: 100%;
		-moz-border-radius: 100%;
		box-sizing: border-box;
		-o-box-sizing: border-box;
		-ms-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		height: 30px;
		left: 0;
		margin: 0 auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
}
.cssload-cssload-loader-line-wrap-wrap:nth-child(1) { animation-delay: -102.5ms;
		-o-animation-delay: -102.5ms;
		-ms-animation-delay: -102.5ms;
		-webkit-animation-delay: -102.5ms;
		-moz-animation-delay: -102.5ms; }
.cssload-cssload-loader-line-wrap-wrap:nth-child(2) { animation-delay: -205ms;
		-o-animation-delay: -205ms;
		-ms-animation-delay: -205ms;
		-webkit-animation-delay: -205ms;
		-moz-animation-delay: -205ms; }
.cssload-cssload-loader-line-wrap-wrap:nth-child(3) { animation-delay: -307.5ms;
		-o-animation-delay: -307.5ms;
		-ms-animation-delay: -307.5ms;
		-webkit-animation-delay: -307.5ms;
		-moz-animation-delay: -307.5ms; }
.cssload-cssload-loader-line-wrap-wrap:nth-child(4) { animation-delay: -410ms;
		-o-animation-delay: -410ms;
		-ms-animation-delay: -410ms;
		-webkit-animation-delay: -410ms;
		-moz-animation-delay: -410ms; }
.cssload-cssload-loader-line-wrap-wrap:nth-child(5) { animation-delay: -512.5ms;
		-o-animation-delay: -512.5ms;
		-ms-animation-delay: -512.5ms;
		-webkit-animation-delay: -512.5ms;
		-moz-animation-delay: -512.5ms; }

.cssload-cssload-loader-line-wrap-wrap:nth-child(1) .cssload-loader-line-wrap {
		border-color: $dark-red;
		height: 26px;
		width: 26px;
		top: 2px;
}
.cssload-cssload-loader-line-wrap-wrap:nth-child(2) .cssload-loader-line-wrap {
		border-color: $red;
		height: 22px;
		width: 22px;
		top: 4px;
}
.cssload-cssload-loader-line-wrap-wrap:nth-child(3) .cssload-loader-line-wrap {
		border-color: $yellow;
		height: 18px;
		width: 18px;
		top: 6px;
}
.cssload-cssload-loader-line-wrap-wrap:nth-child(4) .cssload-loader-line-wrap {
		border-color: $green;
		height: 14px;
		width: 14px;
		top: 8px;
}
.cssload-cssload-loader-line-wrap-wrap:nth-child(5) .cssload-loader-line-wrap {
		border-color: $dark-green;
		height: 10px;
		width: 10px;
		top: 10px;
}




@keyframes cssload-spin {
		0%, 15% {
		transform: rotate(0);
		transform: rotate(0);
	}
	100% {
		transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@-o-keyframes cssload-spin {
		0%, 15% {
		-o-transform: rotate(0);
		transform: rotate(0);
	}
	100% {
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@-ms-keyframes cssload-spin {
		0%, 15% {
		-ms-transform: rotate(0);
		transform: rotate(0);
	}
	100% {
		-ms-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@-webkit-keyframes cssload-spin {
		0%, 15% {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}
	100% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@-moz-keyframes cssload-spin {
		0%, 15% {
		-moz-transform: rotate(0);
		transform: rotate(0);
	}
	100% {
		-moz-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
</style>

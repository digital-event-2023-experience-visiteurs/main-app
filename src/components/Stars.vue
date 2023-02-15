<script setup>
import { getRandomIntInclusive } from "../utils/random.js"

const props = defineProps({
	quantity: Number,
	cssWidthPercent: Number,
	cssHeightPercent: Number,
})

function getRandomStarStyle() {
	const width = `width:${getRandomIntInclusive(3, 8)}px;`
	const top = `top:${getRandomIntInclusive(0, 100)}%;`
	const left = `left:${getRandomIntInclusive(0, 100)}%;`
	return width + top + left
}
</script>

<template>
	<div
		id="stars-container"
		:style="`width:${props.cssWidthPercent}%;height:${props.cssHeightPercent}%`"
	>
		<img
			v-for="_ in props.quantity"
			class="star"
			src="../assets/star.svg"
			:style="getRandomStarStyle()"
		/>
	</div>
</template>

<style scoped>
#stars-container {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 0;
}

.star {
	position: absolute;
}
</style>

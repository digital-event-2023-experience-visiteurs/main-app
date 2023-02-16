<script setup>
import Camera from "simple-vue-camera"
import { onMounted, ref } from "vue"
import { postPhoto } from "../utils/api.js"

const camera = ref()

async function takePhoto() {
	const blob = await camera.value.snapshot()
	await postPhoto(blob)
}

onMounted(() => {
	console.log(camera.value)
})
</script>

<template>
	<div class="camera">
		<Camera ref="camera">
			<button @click="takePhoto">PRENDRE PHOTO</button>
		</Camera>
	</div>
</template>

<style scoped>
.camera {
	width: 100%;
	height: 100vh;
	overflow: hidden;
}
</style>

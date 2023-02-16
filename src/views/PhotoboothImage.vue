<script setup>
import { onMounted } from "vue"
import { useRoute } from "vue-router"
import { getPhoto } from "../utils/api.js"
import { ref } from "vue"

const route = useRoute()
const imgB64 = ref()

function addB64pngHeaders(string) {
	return "data:image/png;base64, " + string
}

async function updateImgB64(imgName) {
	try {
		const data = await getPhoto(imgName)
		imgB64.value = addB64pngHeaders(data.image)
	} catch (error) {
		console.error(error)
	}
}

onMounted(() => {
	updateImgB64(route.params.imgName)
})
</script>

<template>
	<img :src="imgB64" alt="requested image" />
</template>

<style scoped></style>

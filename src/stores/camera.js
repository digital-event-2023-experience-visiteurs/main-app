import { defineStore } from "pinia"
import { ref } from "vue"

export const useCameraStore = defineStore("camera", () => {
	const deviceId = ref("")

	return { deviceId }
})

import { defineStore } from "pinia"
import { ref } from "vue"

export const useReservationStore = defineStore("reservation", () => {
	const data = ref({
		name: "",
		lastname: "",
		email: "",
	})
	const step = ref(0)

	return { data, step }
})

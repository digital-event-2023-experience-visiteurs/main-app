import { defineStore } from "pinia"
import { ref } from "vue"

export const useReservationStore = defineStore("reservation", () => {
	const data = ref({
		name: "",
		lastname: "",
		email: "",
		schedules: [],
	})
	const step = ref(0)

	function isValid() {
		return data.name !== "" && data.lastname !== "" && data.email !== ""
	}

	return { data, step, isValid }
})

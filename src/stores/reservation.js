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

	const schedulesSteps = {
		1: {
			id: "escapeGame",
			name: "Esape Game",
		},
		2: {
			id: "drone",
			name: "Drone",
		},
	}

	function isValid() {
		return data.name !== "" && data.lastname !== "" && data.email !== ""
	}

	return { data, step, isValid, schedulesSteps }
})

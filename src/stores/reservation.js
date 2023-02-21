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
			name: "Escape Game (~3-5 personnes)",
		},
		2: {
			id: "drone",
			name: "Drone (~2 personnes)",
		},
	}

	function isValid() {
		return data.name !== "" && data.lastname !== "" && data.email !== ""
	}

	return { data, step, isValid, schedulesSteps }
})

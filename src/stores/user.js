import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
	const user = ref({
		name: '',
		lastname: '',
		
	})

	return { user }
})

import { createRouter, createWebHistory } from "vue-router"
import { useReservationStore } from "@/stores/reservation.js"
import ReservationHome from "../views/ReservationHome.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: ReservationHome,
			beforeEnter: () => {
				const reservation = useReservationStore()
				reservation.step = 0
			},
		},
		{
			path: `/register`,
			name: "register",
			component: () => import("../views/ReservationForm.vue"),
		},
		{
			path: `/photobooth`,
			name: "photobooth",
			component: () => import("../views/PhotoboothCamera.vue"),
		},
		{
			path: `/photobooth/:imgName`,
			name: "image",
			component: () => import("../views/PhotoboothImage.vue"),
		},
	],
})

export default router

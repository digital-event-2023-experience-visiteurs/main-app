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
			path: "/register",
			name: "register",
			component: () => import("../views/ReservationForm.vue"),
		},

		// Photobooth

		{
			path: "/photobooth-picture",
			name: "reservation-picture",
			component: () => import("../views/PhotoboothPicture.vue"),
		},
		{
			path: "/photobooth-confirm",
			name: "reservation-confirm",
			component: () => import("../views/PhotoboothConfirm.vue"),
		},
		{
			path: "/photobooth-qrcode",
			name: "reservation-qrcode",
			component: () => import("../views/PhotoboothQrcode.vue"),
		},
	],
})

export default router

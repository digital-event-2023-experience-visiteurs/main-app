import { createRouter, createWebHistory } from "vue-router"
import ReservationHome from "../views/ReservationHome.vue"


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: ReservationHome,
		},
		{
			path: "/reservation-1",
			name: "reservation-1",
			component: () => import("../views/ReservationForm1.vue"),
		},
		{
			path: "/reservation-2",
			name: "reservation-2",
			component: () => import("../views/ReservationForm2.vue"),
		},
		{
			path: "/reservation-3",
			name: "reservation-3",
			component: () => import("../views/ReservationForm3.vue"),
		},
		{
			path: "/reservation-4",
			name: "reservation-4",
			component: () => import("../views/ReservationForm4.vue"),
		},
		{
			path: "/reservation-confirm",
			name: "reservation-confirm",
			component: () => import("../views/ReservationConfirm.vue"),
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

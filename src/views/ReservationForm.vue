<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import ReservationForm1 from "@/components/ReservationForm1.vue"
import ReservationForm2 from "@/components/ReservationForm2.vue"
import ReservationForm3 from "@/components/ReservationForm3.vue"
import Stars from "../components/Stars.vue"

const reservation = useReservationStore()
const forms = [ReservationForm1, ReservationForm2, ReservationForm3]
</script>

<template>
	<Stars
		:quantity="30"
		:css-height-percent="30"
		:css-width-percent="100"
	></Stars>
	<div id="container">
		<img src="/logo-esd.svg" alt="Logo ESD Digital Event 2023" />
		<component :is="forms[reservation.step]"></component>
	</div>
</template>

<style scoped>
#container {
	position: relative;
	z-index: 1;

	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 32px;

	max-width: 450px;
	width: 100%;
	height: 100%;

	padding: 32px 24px;

	margin: auto;

	color: #fff;
}

img {
	position: relative;
	z-index: 1;

	width: 40px;
}
</style>

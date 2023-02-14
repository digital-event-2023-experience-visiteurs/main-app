<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref, onMounted } from "vue"
import { postUser } from "../utils/api.js"

const reservation = useReservationStore()
const user = ref()

async function sendUserData() {
	try {
		user.value = await postUser(reservation.data)
	} catch (error) {
		if (error?.issues.find((issue) => issue.validation == "email")) {
			alert("Incorrect email")
		}
		console.error(error)
	}
}

const dayDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
})
const hoursDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
	hour: "numeric",
	minute: "numeric",
})

const schedulesNames = {
	escapeGame: "Esape Game",
	drone: "drone",
}

function getReservation(data) {
	if (!data || !data.successfullyReservedSchedules) return

	return data.successfullyReservedSchedules.map((schedule) => ({
		workshop: schedulesNames[schedule.id],
		date: dayDateTimeFormat.format(new Date(schedule.datetime)),
		hour: hoursDateTimeFormat.format(new Date(schedule.datetime)),
	}))
}

onMounted(async () => {
	if (!reservation.isValid()) return
	await sendUserData()
})
</script>

<template>
	<img class="logo" src="/logo-esd.svg" alt="Logo ESD" />
	<h1>Vous êtes prêt pour démarrer la soirée !</h1>
	<h2>Votre réservation</h2>
	<div v-for="reservation of getReservation(user)" class="ticket">
		<img src="/ticket.svg" alt="ticket" />
		<p>
			{{ reservation.workshop }} - {{ reservation.hour }} <br />
			{{ reservation.date }}
		</p>
	</div>
	<h3>
		Conservez bien votre / vos réservation(s), et pensez à arriver 5 minutes
		en avance.
	</h3>
</template>

<style scoped>
.logo {
	position: relative;
	z-index: 1;

	width: 100%;
	max-width: 200px;

	margin: auto;
}

.ticket {
	position: relative;

	width: fit-content;
	margin: auto;
}

.ticket > p {
	position: absolute;
	top: 50%;
	left: 50%;

	width: 75%;
	margin: 0;

	text-align: center;
	color: var(--neutral);

	transform: translate(-50%, -50%);
}

h1,
h2,
h3 {
	text-align: center;
}

h1 {
	font-size: 32px;
	font-weight: 700;
	margin: 0;
}

h2 {
	font-size: 20px;
	font-weight: 500;
	margin: 0;
}

h3 {
	font-size: 16px;
	font-weight: 500;
	margin: 0;
}
</style>

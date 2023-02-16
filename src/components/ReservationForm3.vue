<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref, onMounted } from "vue"
import { postUser, fetchSchedules } from "../utils/api.js"

const reservation = useReservationStore()
const user = ref()
const areAllSchedulesAvailable = ref(true)
const globalSchedules = ref()

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

function getReservation(data) {
	if (!data || !data.successfullyReservedSchedules) return

	return data.successfullyReservedSchedules.map((schedule) => ({
		workshop: Object.values(reservation.schedulesSteps).find(
			(s) => s.id === schedule.id
		).name,
		date: dayDateTimeFormat.format(new Date(schedule.datetime)),
		hour: hoursDateTimeFormat.format(new Date(schedule.datetime)),
	}))
}

async function isScheduleAvailable(schedule) {
	const targetSchedule = globalSchedules.value[schedule.id].find(
		(s) => new Date(s.datetime) == new Date(schedule.datetime)
	)

	return targetSchedule?.available
}

function resetForm() {
	reservation.data.schedules = []
	reservation.step = 1
}

function updateSchedulesAvailability() {
	for (const schedule of reservation.data.schedules) {
		if (!isScheduleAvailable(schedule)) {
			areAllSchedulesAvailable.value = false
			return
		}
	}
}

onMounted(async () => {
	if (!reservation.isValid()) return
	globalSchedules.value = await fetchSchedules()
	updateSchedulesAvailability()
	await sendUserData()
})
</script>

<template>
	<img class="logo" src="/logo-esd.svg" alt="Logo ESD" />
	<h1>Vous êtes prêt pour démarrer la soirée !</h1>

	<template v-if="reservation.data.schedules.length === 0">
		<p>
			Vous ne vous êtes pas inscrits aux ateliers précédents mais pas
			d'inquiétudes ! Il y a de très nombreuses choses à voir et à faire à
			l'ESD ;)
		</p>
	</template>

	<template v-else-if="getReservation(user)?.length !== 0">
		<h2>Votre / vos réservation(s)</h2>
		<div v-for="reservation of getReservation(user)" class="ticket">
			<img src="/ticket.svg" alt="ticket" />
			<p>
				{{ reservation.workshop }} - {{ reservation.hour }} <br />
				{{ reservation.date }}
			</p>
		</div>
		<h3>
			Conservez bien votre / vos réservation(s), et pensez à arriver 5
			minutes en avance.
		</h3>
	</template>

	<template v-else>
		<p>
			Il semblerait que l'un des créneaux sélectionné ne soit plus
			disponible :(
		</p>
		<button class="btn-primary" @click="resetForm">Réessayer</button>
	</template>
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

button {
	width: fit-content;
	margin: auto;
}
</style>

<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref, onMounted } from "vue"
import { fetchSchedules } from "../utils/api.js"

const reservation = useReservationStore()
const isWorkshopSelected = ref()
const daySelected = ref()
const hourSelected = ref()
const allSchedules = ref()

const formattedDays = ref()

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

async function getDaysFromSchedules(schedules) {
	const days = []

	schedules.forEach((schedule) => {
		if (!schedule.available) return

		const day = dayDateTimeFormat.format(new Date(schedule.datetime))
		if (days.filter((d) => d.formatted === day).length !== 0) return

		days.push({
			formatted: day,
			raw: schedule.datetime,
		})
	})

	return days
}

function areDatesDaysEquals(date1, date2) {
	const d1 = new Date(date1)
	const d2 = new Date(date2)
	return (
		new Date(d1.getFullYear(), d1.getMonth(), d1.getDate()).getTime() ===
		new Date(d2.getFullYear(), d2.getMonth(), d2.getDate()).getTime()
	)
}

function getSchedulesByDate(schedules, date) {
	const hours = []

	schedules.forEach((schedule) => {
		if (!schedule.available) return

		const rawHour = new Date(schedule.datetime)
		if (!areDatesDaysEquals(schedule.datetime, date)) return

		const hour = hoursDateTimeFormat.format(rawHour)
		if (hours.filter((d) => d.formatted === hour).length !== 0) return

		hours.push({
			formatted: hour,
			raw: schedule.datetime,
		})
	})

	return hours
}

async function getSchedules() {
	try {
		return await fetchSchedules()
	} catch (error) {
		alert("Service momentanément indisponible.")
		console.error(error)
	}
}

function onFormSubmit() {
	reservation.step += 1

	if (!isWorkshopSelected.value) return
	if (!hourSelected.value) return

	reservation.data.schedules.push({
		id: reservation.schedulesSteps[reservation.step - 1].id,
		datetime: hourSelected.value,
	})
}

async function updateSchedules() {
	allSchedules.value = await getSchedules()
	allSchedules.value =
		allSchedules.value[reservation.schedulesSteps[reservation.step].id]
	formattedDays.value = await getDaysFromSchedules(allSchedules.value)
}

onMounted(async () => {
	updateSchedules()
})
</script>

<template>
	<img src="/logo-esd.svg" alt="Logo ESD Digital Event 2023" />
	<h2>Maintenant parlons activités</h2>
	<form @submit.prevent="onFormSubmit">
		<h3>
			Souhaitez vous réserver un créneau pour
			{{ reservation.schedulesSteps[reservation.step].name }} ?
		</h3>
		<div class="input-radio">
			<input
				type="radio"
				name="workshop"
				id="yes"
				:value="true"
				v-model="isWorkshopSelected"
				@click="updateSchedules"
			/>
			<label for="yes">Oui</label>
		</div>
		<div class="input-radio">
			<input
				type="radio"
				name="workshop"
				id="non"
				:value="false"
				v-model="isWorkshopSelected"
			/>
			<label for="non">Non</label>
		</div>

		<template v-if="isWorkshopSelected">
			<h3>Quel jour souhaitez-vous réserver ?</h3>
			<div v-for="day of formattedDays" class="input-radio">
				<input
					type="radio"
					name="day-selection"
					:id="day.formatted"
					:value="day.raw"
					v-model="daySelected"
				/>
				<label :for="day.formatted">{{ day.formatted }}</label>
			</div>

			<p v-if="formattedDays.length === 0">Aucun créneau disponible :(</p>

			<template v-if="daySelected">
				<h3>Choisissez un créneau horaire</h3>
				<div class="form-hour">
					<div
						v-for="schedule of getSchedulesByDate(
							allSchedules,
							daySelected
						)"
						class="input-radio"
					>
						<input
							type="radio"
							name="hour-selection"
							:id="schedule.formatted"
							:value="schedule.raw"
							v-model="hourSelected"
						/>
						<label :for="schedule.formatted">{{
							schedule.formatted
						}}</label>
					</div>
				</div>
			</template>
		</template>

		<div id="button-group">
			<button
				type="submit"
				class="btn-primary-smaller"
				:disabled="!hourSelected"
			>
				<p>Suivant</p>
			</button>
		</div>
	</form>
</template>

<style scoped>
#button-group {
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin: 16px 0;
}

#button-group > button {
	margin-left: auto;
}

.form-day,
form {
	display: flex;
	flex-direction: column;
	gap: 16px;

	font-weight: 600;
	font-size: 20px;
}

h2,
p {
	margin: 0;
}

h3 {
	font-weight: 500;
	font-size: 20px;
	margin: 0;
}

img {
	position: relative;
	z-index: 1;

	width: 40px;
}

.form-hour {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 16px;
}
</style>

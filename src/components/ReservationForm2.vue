<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref, onMounted } from "vue"
import { fetchSchedules } from "../utils/api.js"

const schedulesSteps = {
	1: {
		id: "escapeGame",
		name: "Esape Game",
	},
	2: {
		id: "drone",
		name: "drone",
	},
}

const reservation = useReservationStore()
const isEscapeGameSelected = ref()
const daySelected = ref()
const allSchedules = ref()

const formattedDays = ref()
const dateFormat = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
}
const scheduleDateTimeFormat = new Intl.DateTimeFormat("fr-FR", {
	hour: "numeric",
	minute: "numeric",
})

async function getDaysFromSchedules(schedules) {
	const days = []

	schedules.forEach((schedule) => {
		if (!schedule.available) return

		const day = new Date(schedule.datetime).toLocaleDateString(
			"fr-FR",
			dateFormat
		)
		if (days.filter((d) => d.formatted === day).length !== 0) return

		days.push({
			formatted: day,
			raw: new Date(schedule.datetime),
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

		const hour = scheduleDateTimeFormat.format(rawHour)
		if (hours.filter((d) => d.formatted === hour).length !== 0) return

		hours.push({
			formatted: hour,
			raw: new Date(schedule.datetime),
		})
	})

	return hours
}

async function getSchedules() {
	try {
		return await fetchSchedules()
	} catch (error) {
		console.error(error)
	}
}

function onFormSubmit() {
	reservation.step += 1
}

onMounted(async () => {
	allSchedules.value = await getSchedules()
	allSchedules.value = allSchedules.value[schedulesSteps[reservation.step].id]
	formattedDays.value = await getDaysFromSchedules(allSchedules.value)
})
</script>

<template>
	<h2>Maintenant parlons activités</h2>
	<form @submit.prevent="onFormSubmit">
		<h3>
			Souhaitez vous réserver un créneau pour
			{{ schedulesSteps[reservation.step].name }} ?
		</h3>
		<div class="input-radio">
			<input
				type="radio"
				name="escape-game"
				id="yes"
				:value="true"
				v-model="isEscapeGameSelected"
			/>
			<label for="yes">Oui</label>
		</div>
		<div class="input-radio">
			<input
				type="radio"
				name="escape-game"
				id="non"
				:value="false"
				v-model="isEscapeGameSelected"
			/>
			<label for="non">Non</label>
		</div>

		<template v-if="isEscapeGameSelected">
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
		</template>

		<template v-if="isEscapeGameSelected && daySelected">
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
					/>
					<label :for="schedule.formatted">{{
						schedule.formatted
					}}</label>
				</div>
			</div>
		</template>

		<div id="button-group">
			<button
				type="button"
				class="btn-tertiary"
				@click="reservation.step -= 1"
			>
				Précédent
			</button>
			<button type="submit" class="btn-primary-smaller" @click="">
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

.form-hour {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 16px;
}
</style>

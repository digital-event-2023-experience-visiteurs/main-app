<script setup>
import { useRouter } from "vue-router"
import { useReservationStore } from "@/stores/reservation.js"

const router = useRouter()
const reservation = useReservationStore()

function updateReservationFields(input) {
	const field = input.target.id
	const value = input.target.value
	reservation.data[field] = value
}
</script>

<template>
	<img src="/logo-esd.svg" alt="Logo ESD Digital Event 2023" />
	<h2>Dites-nous en plus sur vous</h2>
	<form @submit.prevent="reservation.step += 1">
		<div class="input-text">
			<label for="lastname">Nom <span>*</span></label>
			<input
				@input="updateReservationFields"
				type="text"
				id="lastname"
				title="nom de famille"
				placeholder="nom de famille"
				:value="reservation.data.lastname"
				required
			/>
		</div>
		<div class="input-text">
			<label for="name">Prénom <span>*</span></label>
			<input
				@input="updateReservationFields"
				type="text"
				id="name"
				title="Prénom"
				placeholder="prénom"
				:value="reservation.data.name"
				required
			/>
		</div>
		<div class="input-text">
			<label for="email">E-mail <span>*</span></label>
			<input
				@input="updateReservationFields"
				type="email"
				id="email"
				title="e-mail de contact"
				placeholder="e-mail de contact"
				:value="reservation.data.email"
				required
			/>
		</div>
		<div id="button-group">
			<button
				type="button"
				class="btn-tertiary"
				@click="router.push('/')"
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
h2 {
	margin: 0;
	font-size: 28px;
}

form {
	display: flex;
	flex-direction: column;
	gap: 16px;
}

#button-group {
	display: flex;
	align-items: center;
	justify-content: space-between;

	margin: 16px 0;
}

img {
	position: relative;
	z-index: 1;

	width: 40px;
}
</style>

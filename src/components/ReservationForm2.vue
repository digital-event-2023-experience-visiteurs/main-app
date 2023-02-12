<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref } from "vue"

const reservation = useReservationStore()

const isEscapeGameSelected = ref()
</script>

<template>
	<h2>Maintenant parlons activités</h2>
	<form @submit="">
		<p>Souhaitez vous réserver un créneau pour l’Escape Game ?</p>
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

		<div v-if="isEscapeGameSelected">
			<p>Quel jour souhaitez-vous réserver ?</p>
			<div class="input-radio">
				<input
					type="radio"
					name="escape-game-day"
					id="11"
					:value="true"
				/>
				<label for="11">Vendredi 10 février</label>
			</div>
			<div class="input-radio">
				<input
					type="radio"
					name="escape-game-day"
					id="12"
					:value="true"
				/>
				<label for="12">Samedi 11 février</label>
			</div>
		</div>

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

form > p {
	font-weight: 500;
	font-size: 20px;
}
</style>

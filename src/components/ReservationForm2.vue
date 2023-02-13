<script setup>
import { useReservationStore } from "@/stores/reservation.js"
import { ref } from "vue"

const reservation = useReservationStore()

const isEscapeGameSelected = ref()
</script>

<template>
	<h2>Maintenant parlons activités</h2>
	<form @submit="">
		<h3>Souhaitez vous réserver un créneau pour l’Escape Game ?</h3>
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

			<h3>Choisissez un créneau horaire</h3>
			<div class="form-hour">
				<div class="input-radio">
					<input
						type="radio"
						name="escape-game-day"
						id="14h"
						:value="true"
					/>
					<label for="14h">14:00</label>
				</div>
				<div class="input-radio">
					<input
						type="radio"
						name="escape-game-day"
						id="14h30"
						:value="true"
					/>
					<label for="14h30">14:50</label>
				</div>
				<div class="input-radio">
					<input
						type="radio"
						name="escape-game-day"
						id="15h40"
						:value="true"
					/>
					<label for="15h40">15:40</label>
				</div>
				<div class="input-radio">
					<input
						type="radio"
						name="escape-game-day"
						id="16h30"
						:value="true"
					/>
					<label for="16h30">16:30</label>
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

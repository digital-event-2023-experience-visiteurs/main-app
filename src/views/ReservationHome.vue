<script setup>
import { useRouter } from "vue-router"
import Stars from "../components/Stars.vue"

const router = useRouter()
</script>

<template>
	<Stars
		:quantity="30"
		:css-height-percent="30"
		:css-width-percent="100"
	></Stars>
	<div id="container">
		<main>
			<img src="/logo-esd.svg" alt="Logo ESD Digital Event 2023" />
			<button
				@click="router.push('/register')"
				class="btn-primary"
				type="button"
			>
				<p>Réserver mon activité</p>
			</button>
		</main>
	</div>
</template>

<style scoped>
#container {
	position: relative;
	max-width: 600px;

	width: 100vw;
	height: 100vh;

	margin: auto;
}

main {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 64px;

	width: 100%;
	height: 100%;

	padding: 16px;

	overflow: hidden;
}

main img {
	width: 100%;
	z-index: 1;
}
</style>

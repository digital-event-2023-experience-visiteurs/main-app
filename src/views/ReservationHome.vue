<script setup></script>

<template>
	<div>
		<img src="/logo-esd.svg" alt="" />
		<button class="btnPrimary">Réserver mon activité</button>
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	gap: 70px;
}

/* img {
} */

.btnPrimary {
	width: 290px;
	height: 55px;
	background-color: var(--blue);
	color: var(--yellow);
	border: none;
	border-radius: 5px;
	padding: 10px 20px;
	font-size: 20px;
	cursor: pointer;
	font-family: var(--fontPrimary);
	font-weight: 800;
}
</style>

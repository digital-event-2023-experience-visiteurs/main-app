<script setup></script>

<template>
	<div>
		<img src="/logo-esd.svg" alt="" />
		<h2>Dites-nous en plus sur vous</h2>
	</div>

	<div>
		<form class="inputs" action="">
			<label for="">Nom*</label>
			<input type="text" />
			<label for="">Prénom*</label>
			<input type="text" />
			<label for="">Adresse mail*</label>
			<input type="text" />
		</form>
	</div>

	<div class="buttons">
		<button class="btnNoneBorder">Précédent</button>
		<button class="btnWithBorder">Suivant</button>
	</div>
</template>

<style scoped>
div {
	margin: 24px;
}
img {
	width: 50px;
	height: 40px;
}

h2 {
	font-family: var(--fontPrimary);
	color: var(--white);
}

form label {
	color: var(--white);
	font-family: var(--fontPrimary);
	font-weight: 600;
}
.inputs {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 16px;
}

form input {
	width: 300px;
	height: 55px;
	border: solid 4px var(--black);
	border-radius: 15px;
}

.buttons {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 16px;
}

.btnNoneBorder {
	background-color: var(--white);
	color: var(--yellow);
	border: none;
	padding: 10px 20px;
	font-size: 1.2rem;
	cursor: pointer;
}
.btnWithBorder {
	background-color: var(--blue);
	color: var(--yellow);
	border: none;
	padding: 10px 20px;
	font-size: 1.2rem;
	cursor: pointer;
}
</style>

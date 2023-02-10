<script setup></script>

<template>
	<section class="allDiv">
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
	</section>
</template>

<style scoped>
.allDiv {
    /* margin: 32px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 70px;
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

<script setup></script>

<template>
	<div>
		<img src="/logo-esd.svg" alt="" />
		<h2>Dites-nous en plus sur vous</h2>
	</div>

	<div>
		<form class="inputs" action="">
			<label for="">Nom</label>
			<input type="text" />
			<label for="">Prénom</label>
			<input type="text" />
			<label for="">Adresse mail</label>
			<input type="text" />
		</form>
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
	/* color: var(--white); */
}

.inputs {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>

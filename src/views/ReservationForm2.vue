<script setup></script>

<template>
	<div>
		<img src="/logo-esd.svg" alt="" />
		<h2>Maintenant parlons activité</h2>
	</div>
	<div>
		<p>Souhaitez vous réserver un créneau pour l’Escape Game ?</p>
		<button class="btnSecondary1">Oui</button>
		<button class="btnSecondary2">Non</button>
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
    color: var(--white);
	font-family: "Raleway";
	font-style: normal;
	font-weight: 800;
	font-size: 28px;
	line-height: 33px;
}

p {
	font-family: var(--fontPrimary);
	color: var(--white);
	font-style: normal;
	font-weight: 600;
	font-size: 20px;
	line-height: 23px;
}

.btnSecondary1 {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 24px 107px;
	gap: 10px;

	width: 327px;
	height: 67px;

	background: #6c00c1;
	border: 6px solid #a6e0fa;
	border-radius: 20px;
	font-family: "Raleway";
	font-style: normal;
	font-weight: 900;
	font-size: 16px;
	line-height: 19px;
	/* identical to box height */

	color: #a6e0fa;
}

.btnSecondary2 {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 24px 107px;
	gap: 10px;

	width: 327px;
	height: 67px;

	background: #a6e0fa;
	border: 6px solid #6c00c1;
	border-radius: 20px;

	font-family: "Raleway";
	font-style: normal;
	font-weight: 500;
	font-size: 16px;
	line-height: 19px;
	/* identical to box height */

	color: #6c00c1;
}
/* .inputs {
	display: flex;
	flex-direction: column;
	gap: 20px;
} */
</style>

<script setup>
import Camera from "simple-vue-camera"
import { onMounted, ref, watch } from "vue"
import { postPhoto } from "../utils/api.js"
import Qrcode from "qrcode.vue"
import Stars from "../components/Stars.vue"
import { useCameraStore } from "../stores/camera.js"

const camerStore = useCameraStore()
const camera = ref()
const photoUrl = ref()
const countDown = ref(0)

async function blobToB64(blob) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(blob)
		reader.onloadend = () => {
			resolve(reader.result)
		}
		reader.onerror = reject
	})
}

async function takePhoto() {
	const blob = await camera.value.snapshot()

	try {
		photoUrl.value = await postPhoto(await blobToB64(blob))
	} catch (error) {
		console.error(error)
	}
}

function getImgUrl(name) {
	return (
		window.location.origin + import.meta.env.BASE_URL + `photobooth/${name}`
	)
}

onMounted(async () => {
	const cameraElement = document.getElementsByTagName("video")[0]
	cameraElement.setAttribute("muted", "")
})

async function switchCamera() {
	const devices = await navigator.mediaDevices.enumerateDevices()
	const videoInputDevices = devices.filter((x) => x.kind === "videoinput")

	const currentIndex = videoInputDevices.findIndex(
		(d) => d.deviceId === camera.value.currentDeviceID()
	)

	const nextIndex = (currentIndex + 1) % videoInputDevices.length
	const nextCamera = videoInputDevices[nextIndex]

	camerStore.deviceId = nextCamera.deviceId
	camera.value.changeCamera(nextCamera.deviceId)
}

function startCountDown() {
	countDown.value = 10
	updatecountDown()
}

function updatecountDown() {
	if (countDown.value === 0) {
		takePhoto()
		return
	}
	countDown.value -= 1
	setTimeout(updatecountDown, 1000)
}

watch(camera, (oldCam, newCam) => {
	if (oldCam == undefined) return
	if (!camerStore.deviceId) return
	camera.value.changeCamera(camerStore.deviceId)
})
</script>

<template>
	<Stars
		:quantity="100"
		:css-width-percent="100"
		:css-height-percent="100"
	></Stars>
	<div v-show="photoUrl == undefined" class="camera">
		<Camera ref="camera">
			<p v-if="countDown > 0" class="countdown">{{ countDown }}</p>
			<button
				v-if="countDown === 0"
				@click="startCountDown"
				class="take-photo"
			></button>
			<button @click="switchCamera">CHANGER CAM</button>
		</Camera>
	</div>
	<div v-if="photoUrl !== undefined" class="qr-code">
		<img src="/logo-esd.svg" alt="Logo ESD Digital Event 2023" />
		<div>
			<h2>Votre photo est prête !</h2>
			<h3>Scannez le QR code pour la télécharger.</h3>
			<div class="code">
				<Qrcode
					:value="getImgUrl(photoUrl.imgName)"
					:size="300"
				></Qrcode>
			</div>
		</div>
		<button class="btn-primary" @click="photoUrl = undefined">
			<p>Reprendre une photo</p>
		</button>
	</div>
</template>

<style scoped>
img {
	position: relative;
	z-index: 2;

	margin: 16px;
	margin-right: auto;

	width: 40px;
}

.camera {
	width: 100%;
	height: 100vh;
	overflow: hidden;
}

.qr-code,
.qr-code > div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.qr-code {
	position: relative;
	z-index: 2;

	gap: 64px;

	margin: auto;

	color: #fff;
}

.take-photo {
	position: absolute;
	top: 50%;
	right: 16px;

	width: 64px;
	height: 64px;

	border: none;
	border-radius: 50%;

	background-color: red;

	cursor: pointer;

	transform: translateY(-50%);
}

.countdown {
	position: absolute;
	z-index: 2;
	top: 50%;
	left: 50%;

	padding: 16px;

	color: #fff;
	font-weight: 700;
	font-size: 64px;

	background-color: #0007;

	transform: translate(-50%, -50%);
}

.code {
	border: solid white 16px;
	background-color: white;
}
</style>

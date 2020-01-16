import $ from 'jquery'
import 'bootstrap'

import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/storage'

import { getUrlParams } from './common/uri'
import { getFirebaseConfig } from './common/firebaseConfig'
import ModelFactory from './common/ModelTypes/ModelFactory'
import FirebaseErrorCode from './common/Errors/FirebaseErrorCode'
import { getAsset } from './common/api/AssetApi'

firebase.initializeApp(getFirebaseConfig())

const frame = document.getElementById('frame')
const { project, asset } = getUrlParams() // Getting the url's params

// $("#modal").on("")

window.addEventListener("load", () => {
	document.getElementById('splash').style.display = 'none' // Hide the splash screen

	getAsset(project, asset)
		.then((asset) => {
			// Load the model from the result fetched in the database
			const model = new ModelFactory().makeModel({
				name: asset.name,
				type: asset.type,
				model: asset.model,
				material: asset.material
			})

			model.createInFrame(frame) // Create the asset in the frame
		})
		.catch((error) => {
			const modalContent = document.querySelector('.modal-body p')
			switch (error.code) {
				case FirebaseErrorCode.PERMISSION_DENIED:
					console.error("Vous n'avez pas la permission de voir ce fichier")
					modalContent.innerText = "Vous n'avez pas la permission de voir ce fichier, veuillez en sélectionner un autre"
					break
				default:
					console.error("Une erreur inconnue s'est produite")
					modalContent.innerText = "Une erreur inconnue s'est produite, veuillez réessayer plus tard"
					break
			}
			$('#myModal').modal("toggle")
		})
})

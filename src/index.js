import 'bootstrap';

import { firebase } from '@firebase/app';
import '@firebase/firestore';
import '@firebase/storage';
import '@firebase/auth';

import { getUrlParams } from './common/uri';
import { getFirebaseConfig } from './common/firebaseConfig';
import ModelFactory from './ModelTypes/ModelFactory';
import FirebaseErrorCode from './Errors/FirebaseErrorCode';
import {getAsset, getAssetsList} from './api/AssetApi'

firebase.initializeApp(getFirebaseConfig());

const frame = document.getElementById('frame');
const { project, asset } = getUrlParams(); // Getting the url's params

window.addEventListener('load', async () => {
	try {
		await firebase.auth().signInWithEmailAndPassword('thomas.guillouet@edu.itescia.fr', '17tg11J59');

		await handleModelCreation(project, asset);

		await createProjectAssetsDropdownItems(project, "dropdown");
	} catch(error) {
		const modalContent = document.querySelector('.modal-content p');
		switch (error.code) {
			case "ProjectNotFilled":
				modalContent.innerText = "The project name need to be filled";
				break;
				// ND2rp32W78mWnSAMQ6y4
			case "AssetNotFilled":
				modalContent.innerText = "The asset id need to be filled";
				break;
			case FirebaseErrorCode.PERMISSION_DENIED:
				console.error("Vous n'avez pas la permission de voir ce fichier");
				modalContent.innerText =
					"Vous n'avez pas la permission de voir ce fichier, veuillez en sélectionner un autre";
				break;
			default:
				console.error("Une erreur inconnue s'est produite", error);
				modalContent.innerText = "Une erreur inconnue s'est produite, veuillez réessayer plus tard";
				break;
		}
		document.getElementById("errorModal").classList.add("is-active");
	} finally {
		document.getElementsByClassName('arjs-loader')[0].style.display = 'none'; // Hide the splash screen
	}
});

/**
 * Load the 3D model on the a-frame
 * @param projectId The id of the project in the database
 * @param assetId The id of the asset in the database
 * @returns {Promise<void>}
 */
async function handleModelCreation(projectId, assetId) {
	const fetchedAsset = await getAsset(projectId, assetId);

	// Load the model from the result fetched in the database
	const model = new ModelFactory().makeModel({
		name: fetchedAsset.name,
		type: fetchedAsset.type,
		model: fetchedAsset.model,
		material: fetchedAsset.material,
		parameters: {
			scale: '0.2 0.2 0.2'
		}
	});

	model.createInFrame(frame); // Create the asset in the frame
}

/**
 * Generate all assets in the menu
 * @param projectId The id of the selected project in the database
 * @param dropdownId The id of the dropdown HTMLElement
 * @returns {Promise<void>}
 */
async function createProjectAssetsDropdownItems(projectId, dropdownId) {
	const assetsList = await getAssetsList(projectId);

	const elements = assetsList.map(assetItem => {
		const element = document.createElement("a");
		element.innerText = assetItem.name;
		element.href = `/?project=${project}&asset=${assetItem.id}`;
		element.classList.add("navbar-item");
		if (assetItem.id === asset) element.classList.add("is-active");
		return element;
	});

	document.getElementById(dropdownId).append(...elements);
}

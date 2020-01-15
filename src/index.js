import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from "jquery";

import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/storage";

import { getUrlParams } from "./common/uri";
import { getFirebaseConfig } from "./common/firebaseConfig";
import ModelFactory from "./common/ModelTypes/ModelFactory";
import FirebaseErrorCode from "./common/Errors/FirebaseErrorCode";
import { getAsset } from "./common/api/AssetApi";

firebase.initializeApp(getFirebaseConfig())

const frame = document.getElementById("frame");
const { project, asset } = getUrlParams();

window.addEventListener("load", () => {
    document.getElementById("splash").style.display = "none" // Hide the splash screen

    getAsset(project, asset)
    .then(async e => {
        // Load the model from the result fetched in the database
        const model = new ModelFactory().makeModel({
            name: e.name,
            type: e.type,
            model: e.model,
            material: e.material,
            parameters: {}
        });

        model.createInFrame(frame);
    })
    .catch((error) => {
        const modalContent = document.querySelector(".modal-body p")
        switch (error.code) {
            case FirebaseErrorCode.PERMISSION_DENIED:
                console.error("Vous n'avez pas la permission de voir ce fichier")
                modalContent.innerText = "Vous n'avez pas la permission de voir ce fichier"
                break;
            default:
                console.error("Une erreur inconnue s'est produite")
                modalContent.innerText = "Une erreur inconnue s'est produite"
                break;
        }
        $("#modal").show("slow");
    });
})

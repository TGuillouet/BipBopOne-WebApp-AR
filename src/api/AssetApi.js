import { firebase } from "@firebase/app";
import "@firebase/firestore";
import {getDocumentsFromSnapshot} from "../common/FirestoreUtils";
import ProjectNotFilledError from "../Errors/ProjectNotFilledError";
import AssetNotFilledError from "../Errors/AssetNotFilledError";

export async function getAsset(projectName, assetId) {
    if (!projectName) {
        throw new ProjectNotFilledError();
    }

    if (!assetId) {
        throw new AssetNotFilledError();
    }

    let ref = firebase.firestore().collection(`projects`).doc(projectName);
    return  ref.collection("assets").doc(assetId).get().then((asset) => {
        let assetData = asset.data();
        return assetData;
    });
}

export async function getAssetsList(projectName) {
    if (!projectName) {
        throw new ProjectNotFilledError();
    }

    let ref = firebase.firestore().collection(`projects`).doc(projectName);
    return  ref.collection("assets").where("visible", "==", true).get().then(getDocumentsFromSnapshot);
};

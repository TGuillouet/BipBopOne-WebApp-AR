import { firebase } from "@firebase/app";
import "@firebase/firestore";
import {getDocumentsFromSnapshot} from "../common/FirestoreUtils";
import ProjectNotFilledError from "../Errors/ProjectNotFilledError";
import AssetNotFilledError from "../Errors/AssetNotFilledError";

/**
 * Ge an asset from the database
 * @param userId The id of te user in the database
 * @param projectId The id of the project in the database
 * @param assetId The id of the asset in the database
 * @returns {Promise<T>}
 */
export async function getAsset(assetId) {
    if (!assetId) {
        throw new AssetNotFilledError();
    }

    return  firebase.firestore().collection("assets").doc(assetId).get().then((asset) => {
        let assetData = asset.data();
        return assetData;
    });
}

/**
 * Get the list of visible assets for a project
 * @param projectId The id of the project
 * @returns {Promise<firebase.firestore.QuerySnapshot<T>>}
 */
export async function getVisibleAssetsList(projectId) {
    if (!projectId) {
        throw new ProjectNotFilledError();
    }

    return  firebase.firestore().collection("assets").where("projectId","==", projectId).where("visible", "==", true).get().then(getDocumentsFromSnapshot);
}

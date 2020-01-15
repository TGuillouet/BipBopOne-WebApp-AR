import { firebase } from "@firebase/app";
import "@firebase/firestore";

export function getAsset(projectName, assetId) {
    let ref = firebase.firestore().collection(`projects`).doc(projectName);
    return  ref.collection("assets").doc(assetId).get().then((asset) => {
        let assetData = asset.data();
        return assetData;
    });
}
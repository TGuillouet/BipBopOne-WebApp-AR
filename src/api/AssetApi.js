import { firebase } from "@firebase/app";
import "@firebase/firestore";

export async function getAsset(projectName, assetId) {
    if (!projectName) {
        throw new Error("ProjectNotFilled");
    }

    if (!assetId) {
        throw new Error("AssetNotFilled");
    }

    let ref = firebase.firestore().collection(`projects`).doc(projectName);
    return  ref.collection("assets").doc(assetId).get().then((asset) => {
        let assetData = asset.data();
        return assetData;
    });
}

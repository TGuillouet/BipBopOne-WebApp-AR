import { firebase } from "@firebase/app"
import "@firebase/firestore"

export function getAsset(projectName, assetId) {
    if (!projectName) {
        throw new Error("The project name need to be filled")
    }

    if (!assetId) {
        throw new Error("The asset id need to be filled")
    }

    let ref = firebase.firestore().collection(`projects`).doc(projectName)
    return  ref.collection("assets").doc(assetId).get().then((asset) => {
        let assetData = asset.data()
        return assetData
    })
}
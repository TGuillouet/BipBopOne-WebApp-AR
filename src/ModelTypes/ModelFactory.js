import ObjModel from './ObjModel'
import GltfModel from './GltfModel'

/**
 * Supported extensions
 */
const MODEL_TYPE = Object.freeze({
    GLTF: "gltf",
    OBJ: "obj"
})

export default class ModelFactory {
    makeModel(modelInfos) {
        switch (modelInfos.type) {
            case MODEL_TYPE.GLTF:
                return new GltfModel(modelInfos);
            case MODEL_TYPE.OBJ:
                return new ObjModel(modelInfos);
            default:
                throw new Error("Unsupported format");
        }
    }
}

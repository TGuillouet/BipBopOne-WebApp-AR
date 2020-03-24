import ObjModel from './ObjModel';
import GltfModel from './GltfModel';

/**
 * Supported extensions
 */
const MODEL_TYPE = Object.freeze({
    GLTF: "gltf",
    OBJ: "obj"
});

/**
 * Class who will create a 3d model based on the type
 */
export default class ModelFactory {
    /**
     * Create a model that can be loaded into the a-frame
     * @param {object} modelInfos The infos of the model
     * @returns {Model} The model representation based on his type
     */
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

import Model from "./Model";

/**
 * Represent a .gltf asset
 */
export default class GltfModel extends Model {
    /**
     * Create a gltf model
     * @param modelInfos
     */
    constructor(modelInfos) {
        super(modelInfos);
    }

    /**
     * Create the asset that can be loaded by a-frame
     * @returns {HTMLElement} The asset element
     */
    createAsset() {
        const { name: modelName, type } = this.modelInfos;

        const asset = document.createElement("a-assets");
    
        const modelAssetItem = document.createElement("a-asset-item");
        modelAssetItem.id = `${modelName}-model`;
        modelAssetItem.setAttribute("src", `/${modelName}.${type}`);
        asset.appendChild(modelAssetItem);
    
        return asset;
    }

    /**
     * Create the entity that can be displayed by a-frame
     * @returns {HTMLElement}
     */
    createEntity() {
        const { name: modelName } = this.modelInfos;
        const entity = document.createElement("a-entity");
    
        entity.setAttribute("gltf-model", `##${modelName}-model`);

        return entity;
    }
}

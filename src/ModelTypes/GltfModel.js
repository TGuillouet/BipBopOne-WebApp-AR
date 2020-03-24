import Model from "./Model";

export default class GltfModel extends Model {
    constructor(modelInfos) {
        super(modelInfos);
    }

    createAsset() {
        const { name: modelName, type } = this.modelInfos;

        const asset = document.createElement("a-assets");
    
        const modelAssetItem = document.createElement("a-asset-item");
        modelAssetItem.id = `${modelName}-model`;
        modelAssetItem.setAttribute("src", `/${modelName}.${type}`);
        asset.appendChild(modelAssetItem);
    
        return asset;
    }
    
    createEntity() {
        const { name: modelName } = this.modelInfos;
        const entity = document.createElement("a-entity");
    
        entity.setAttribute("gltf-model", `##${modelName}-model`);

        return entity;
    }
}

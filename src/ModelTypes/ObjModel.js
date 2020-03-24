import Model from './Model';

/**
 * Represent a .obj asset
 */
export default class ObjModel extends Model {

	/**
	 * Create an obj model
	 * @param modelInfos
	 */
	constructor(modelInfos) {
		super(modelInfos);
	}

	/**
	 * Create the assets list that can be loaded by a-frame
	 * @returns {HTMLElement} The asset element
	 */
	createAsset() {
		const { name: modelName, model, material } = this.modelInfos;
		const asset = document.createElement('a-assets');
		asset.setAttribute('timeout', "40000");

		const modelAssetItem = document.createElement('a-asset-item');
		modelAssetItem.id = `${modelName}-model`;
		modelAssetItem.setAttribute('src', model);
		asset.appendChild(modelAssetItem);

		if (material) {
			const materialAssetItem = document.createElement('a-asset-item');
			materialAssetItem.id = `${modelName}-material`;
			materialAssetItem.setAttribute('src', material);
			asset.appendChild(materialAssetItem);
		}

		return asset;
	}

	/**
	 * Create the entity that can be displayed by a-frame
	 * @returns {HTMLElement}
	 */
	createEntity() {
		const { name: modelName, material } = this.modelInfos;
		let entity = document.createElement('a-obj-model');

		entity.setAttribute('src', `#${modelName}-model`);
		if (material) entity.setAttribute('mtl', `#${modelName}-material`);

		return entity;
	}
}

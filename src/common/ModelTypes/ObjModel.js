import Model from './Model'

export default class ObjModel extends Model {
	constructor(modelInfos) {
		super(modelInfos)
	}

	createAsset() {
		const { name: modelName, model, material } = this.modelInfos
		const asset = document.createElement('a-assets')

		const modelAssetItem = document.createElement('a-asset-item')
		modelAssetItem.id = `${modelName}-model`
		modelAssetItem.setAttribute('src', model)
		asset.appendChild(modelAssetItem)

		const materialAssetItem = document.createElement('a-asset-item')
		materialAssetItem.id = `${modelName}-material`
		materialAssetItem.setAttribute('src', material)
		asset.appendChild(materialAssetItem)

		return asset
	}

	createEntity() {
		const { name: modelName } = this.modelInfos
		const entity = document.createElement('a-entity')

		entity.setAttribute('obj-model', `obj: #${modelName}-model; mtl: #${modelName}-mtl`)

		return entity
	}
}

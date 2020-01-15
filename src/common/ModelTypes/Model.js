export default class Model {
    constructor(modelInfos) {
        if (this.constructor === Model) {
            throw new TypeError("You cannot use the class Model directly")
        }
        this.modelInfos = modelInfos
    }

    createAsset() {
        throw new Error("The function createAsset is not implemented")
    }

    createEntity() {
        throw new Error("The function createEntity is not implemented")
    }

    createInFrame(frame) {
        frame.appendChild(this.createAsset())

        let entity = this.createEntity()
        if (this.modelInfos.parameters) entity = this.applyEntityParameters(entity)

        frame.appendChild(entity)
    }

    applyEntityParameters(entity) {
        const { parameters } = this.modelInfos

        Object.keys(parameters).forEach(key => {
            let value = parameters[key]
            entity.setAttribute(key, value)
        })
        
        return entity
    }
}
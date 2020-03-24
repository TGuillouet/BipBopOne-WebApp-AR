/**
 * Superclass for any kind of model
 */
export default class Model {

    /**
     * Create a model
     * @param modelInfos
     */
    constructor(modelInfos) {
        if (this.constructor === Model) {
            throw new TypeError("You cannot use the class Model directly");
        }
        this.modelInfos = modelInfos;
    }

    /**
     * Create an asset
     */
    createAsset() {
        throw new Error("The function createAsset is not implemented");
    }

    /**
     * Create an entity
     */
    createEntity() {
        throw new Error("The function createEntity is not implemented");
    }

    /**
     * Create the entity in the a-frame marker
     * @param frame
     */
    createInFrame(frame) {
        frame.appendChild(this.createAsset());
        
        let entity = this.createEntity();
        if (this.modelInfos.parameters) entity = this.applyEntityParameters(entity);

        frame.querySelector("#marker").appendChild(entity);
    }

    /**
     * Apply some parameters like the scaling or the position to the entity
     * @param entity
     * @returns {HTMLElement}
     */
    applyEntityParameters(entity) {
        const { parameters } = this.modelInfos;

        Object.keys(parameters).forEach(key => {
            let value = parameters[key];
            entity.setAttribute(key, value);
        });

        return entity;
    }
}

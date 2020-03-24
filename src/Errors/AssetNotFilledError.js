export default class AssetNotFilledError extends Error {
    constructor() {
        super();
        this.code = "AssetNotFilled";
    }
}

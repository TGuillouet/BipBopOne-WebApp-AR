export default class ProjectNotFilledError extends Error {
    constructor() {
        super();
        this.code = "ProjectNotFilled";
    }
}

export default class FirestoreSnapshotMock {
    constructor(documents) {
        this.empty = documents.length === 0;
        this.documents = documents;
        this.forEach = (func) => {
            this.documents.forEach(func);
        };
    }
}

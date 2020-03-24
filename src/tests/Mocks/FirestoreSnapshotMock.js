/**
 * Mock for the firestore snapshot
 */
export default class FirestoreSnapshotMock {
    /**
     * Create a firestore snapshot mock
     * @param documents The documents list
     */
    constructor(documents) {
        this.empty = documents.length === 0;
        this.documents = documents;
        this.forEach = (func) => {
            this.documents.forEach(func);
        };
    }
}

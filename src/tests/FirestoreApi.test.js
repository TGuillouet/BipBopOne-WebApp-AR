import {getDocumentsFromSnapshot} from "../api/FirestoreApi";
import {FirestoreSnapshotMock} from "./Mocks";


describe('FirestoreApi', function () {
    it('getDocumentsFromSnapshot when not empty', function () {
        const snapshot = new FirestoreSnapshotMock([
            {
                id: "testId1",
                data: () => ({ value: "testValue1" })
            },
            {
                id: "testId2",
                data: () => ({ value: "testValue2" })
            }
        ]);

        const expected = [
            { id: "testId1", value: "testValue1" },
            { id: "testId2", value: "testValue2" }
        ];

        expect(JSON.stringify(getDocumentsFromSnapshot(snapshot))).toBe(JSON.stringify(expected));
    });

    it('getDocumentsFromSnapshot when empty', function () {
        const snapshot = new FirestoreSnapshotMock( []);

        const expected = [];

        expect(JSON.stringify(getDocumentsFromSnapshot(snapshot))).toBe(JSON.stringify(expected));
    });
});

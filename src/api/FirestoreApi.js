export function getDocumentsFromSnapshot(snapshot) {
    if (snapshot.empty) {
        return [];
    }

    let documents = [];

    snapshot.forEach((document) => {
        documents.push({ id: document.id, ...document.data() });
    });

    return documents;
}

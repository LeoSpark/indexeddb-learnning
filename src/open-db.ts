export const openDB = (dbName: string, version = 1): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open(dbName, version);

        dbRequest.onsuccess = () => {
            console.log('open DB success', dbName);
            resolve(dbRequest.result);
        }

        dbRequest.onerror = () => {
            console.log('open DB error', dbName);
            reject(dbRequest.error);
        }

        // @todo 处理 dbRequest.onupgradeneeded
    });
}
console.log('---- start ----');

export const dbRequest = indexedDB.open('test', 1);

dbRequest.onsuccess = (event) => {
    console.log('success: ');
    // console.log((event.target as IDBOpenDBRequest).result);
    // console.log(dbRequest.result);
    const db = dbRequest.result;

    db.onversionchange = () => {
        db.close();
        console.warn('db version change');
    }

    const transaction = db.transaction('books', 'readwrite');

    const books = transaction.objectStore('books');

    const book = {
        id: 'js',
        price: 10,
        created: Date.now()
    };

    const request = books.add(book);

    request.onsuccess = () => {
        console.log('book added to the store', request.result);
    }

    request.onerror = () => {
        console.error('book added error', request.error);
    }
};

dbRequest.onerror = () => {
    console.error('数据库打开报错');
};

dbRequest.onupgradeneeded = () => {
    // const db = event?.target?.result;
    // console.log(db);
    console.log('onupgradeneeded');

    const db = dbRequest.result;

    if(!db.objectStoreNames.contains('books')) {
        db.createObjectStore('books', { keyPath: 'id' });
    }
}

/// the database receives from the server the following structure
import * as idb from './idb/index.js';
//import e from "express";

let db;

const Chatroom_DB_NAME= 'db_story';
const Chatroom_STORE_NAME= 'Story';
const Upload_IMAGE_NAME='Upload';

/**
 * it inits the database
 */
async function initDatabase(){
    if (!db) {
        db = await idb.openDB(Chatroom_DB_NAME, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(Chatroom_STORE_NAME)) {
                    let forecastDB = upgradeDb.createObjectStore(Chatroom_STORE_NAME, {
                        keyPath: 'Name',
                        autoIncrement: true
                    });
                    forecastDB.createIndex('userId', 'userId', {unique: false, multiEntry: true});
                }
                if (!upgradeDb.objectStoreNames.contains(Upload_IMAGE_NAME)) {
                    let forecastDB = upgradeDb.createObjectStore(Upload_IMAGE_NAME, {
                        keyPath: 'Title',
                        autoIncrement: true
                    });
                    forecastDB.createIndex('Title', 'Title', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase= initDatabase;

/**
 * it saves the chatroom
 */
async function storeCachedData(Object) {
    console.log('inserting: '+JSON.stringify(Object));
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(Chatroom_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(Chatroom_STORE_NAME);
            await store.put(Object);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(Object));
        } catch(error) {
            localStorage.setItem(Object, JSON.stringify(Object));
        };
    }
    else localStorage.setItem(Object, JSON.stringify(Object));
}
window.storeCachedData= storeCachedData;

/**
 * it saves the Upload
 * @param city
 * @param forecastObject
 */

async function storeImage(Object) {
    console.log('inserting: '+JSON.stringify(Object));
    if (!db)
        await (initDatabase());
    if (db) {
        try{
            let tx = await db.transaction(Upload_IMAGE_NAME, 'readwrite');
            let store = await tx.objectStore(Upload_IMAGE_NAME);
            await store.put(Object);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(Object));
        } catch(error) {
            localStorage.setItem(Object, JSON.stringify(Object));
        };
    }
    else localStorage.setItem(Object, JSON.stringify(Object));
}
window.storeImage= storeImage;


/**
 *
 * @param city
 * @param date
 * @returns {Promise<*[]>}
 */

async function getCachedData(a) {
    if (!db)
        await initDatabase();
    if (db) {
        try {
            console.log('fetching: ');
            let tx = await db.transaction(Chatroom_STORE_NAME, 'readonly');
            let store = await tx.objectStore(Chatroom_STORE_NAME);
            let index = await store.index('userId');
            let readingsList = await index.getAll(IDBKeyRange.only(a));
            await tx.complete;

            for (let elem of readingsList) {
                console.log(elem.chatText)
                writeOnHistory('<b>'+elem.userId+':'+'<b>'+elem.chatText)
            }
        } catch (error) {
            console.log(error);
        }

    }
}
window.getCachedData= getCachedData;

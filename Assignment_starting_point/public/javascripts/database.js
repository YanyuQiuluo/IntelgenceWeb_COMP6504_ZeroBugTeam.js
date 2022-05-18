/// the database receives from the server the following structure
import * as idb from './idb/index.js';
//import e from "express";

let db;

const Chatroom_DB_NAME= 'db_story';
const Chatroom_STORE_NAME= 'Chatroom';
const Upload_IMAGE_NAME='Story';
const Lecture_NAME='lecture';

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
                if (!upgradeDb.objectStoreNames.contains(Lecture_NAME)) {
                    let forecastDB = upgradeDb.createObjectStore(Lecture_NAME, {
                        keyPath: 'ID',
                        autoIncrement: true
                    });
                    forecastDB.createIndex('userId', 'userId', {unique: false, multiEntry: true});
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
 * Get history chatText
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


/**
 * store Lecture in indexDB
 * @param Object
 * @returns {Promise<void>}
 */
async function storeLecture(Object) {
    console.log('inserting: '+JSON.stringify(Object));
    if (!db)
        await (initDatabase());
    if (db) {
        //try{
            let tx = await db.transaction(Lecture_NAME, 'readwrite');
            let store = await tx.objectStore(Lecture_NAME);
            await store.put(Object);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(Object));
        //} catch(error) {
        //    localStorage.setItem(Object, JSON.stringify(Object));
      //  };
    }
    else localStorage.setItem(Object, JSON.stringify(Object));
}
window.storeLecture= storeLecture;


/**
 * get indexDB
 * @param a
 * @returns {Promise<void>}
 */
async function getLecture(a,imageUrl) {
    if (!db)
        await initDatabase();
    if (db) {
        //try {
            console.log('fetching: ');
            let tx = await db.transaction(Lecture_NAME, 'readonly');
            let store = await tx.objectStore(Lecture_NAME);
            let index = await store.index('userId');
            let readingsList = await index.getAll(IDBKeyRange.only(a));
            await tx.complete;

            //let cvx=document.getElementById('canvas')
           // let ctx=cvx.getContext('2d')
              let canvas = $('#canvas');
              let ctx = canvas[0].getContext('2d');
            for (let l of readingsList) {
                console.log(ctx,l.width,l.height,l.prevX,l.prevY,l.currX,l.currY,l.color,l.thickness,l.imageUrl)
                if(imageUrl===l.imageUrl){
                    drawOnCanvas(ctx,l.width,l.height,l.prevX,l.prevY,l.currX,l.currY,l.color,l.thickness)

                }
            }
       // } catch (error) {
        //    console.log(error);
        }


}
window.getLecture= getLecture;


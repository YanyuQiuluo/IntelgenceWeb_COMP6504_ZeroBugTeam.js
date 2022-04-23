// the database receives from the server the following structure
import * as idb from './idb/index.js';

let db;

const FORECAST_DB_NAME= 'db_story';
const FORECAST_STORE_NAME= 'signal_chat';

/**
 * it inits the database
 */
async function initDatabase(){
    if (!db) {
        db = await idb.openDB(FORECAST_DB_NAME, 2, {
            upgrade(upgradeDb, oldVersion, newVersion) {
                if (!upgradeDb.objectStoreNames.contains(FORECAST_STORE_NAME)) {
                    let forecastDB = upgradeDb.createObjectStore(FORECAST_STORE_NAME, {
                        keyPath: 'RoomID',
                        autoIncrement: true
                    });
                    forecastDB.createIndex('RoomID', 'RoomID', {unique: false, multiEntry: true});
                }
            }
        });
        console.log('db created');
    }
}
window.initDatabase= initDatabase;


/**
 * it saves the forecasts for a city in localStorage
 * @param city
 * @param forecastObject
 */
async function storeCachedData(city, forecastObject) {
    console.log('inserting: '+JSON.stringify(forecastObject));
    if (!db)
        await initDatabase();
    if (db) {
        try{
            let tx = await db.transaction(FORECAST_STORE_NAME, 'readwrite');
            let store = await tx.objectStore(FORECAST_STORE_NAME);
            await store.put(forecastObject);
            await  tx.complete;
            console.log('added item to the store! '+ JSON.stringify(forecastObject));
        } catch(error) {
            localStorage.setItem(city, JSON.stringify(forecastObject));
        };
    }
    else localStorage.setItem(city, JSON.stringify(forecastObject));
}
window.storeCachedData= storeCachedData;
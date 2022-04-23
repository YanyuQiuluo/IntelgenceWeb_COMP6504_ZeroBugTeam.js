const CLOUDY = 0;
const CLEAR = 1;
const RAINY = 2;
const OVERCAST = 3;
const SNOWY = 4;


/**
 * called by the HTML onload
 * showing any cached forecast data and declaring the service worker
 */
function initWeatherForecasts() {
    //check for support
    if ('indexedDB' in window) {
        initDatabase();
    }
    else {
        console.log('This browser doesn\'t support IndexedDB');
    }
    loadData(false);
}


/**
* given the list of cities created by the user, it will retrieve all the data from
* the server (or failing that) from the database
* @param forceReload true if the data is to be loaded from the server
*/
function loadData(forceReload){
    var cityList=JSON.parse(localStorage.getItem('cities'));
    cityList=removeDuplicates(cityList);
    retrieveAllCitiesData(cityList, new Date().getTime(), forceReload);
}
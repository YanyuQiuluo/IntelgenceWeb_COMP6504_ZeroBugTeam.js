const { default: axios } = require('axios');
const { get } = require('express/lib/response');


/**
 * Get the browser type and display the image
 * @param sourceId
 * @returns {string}
 */
function getFileUrl(sourceId) {
    var url;
    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
        url = document.getElementById(sourceId).value;
    } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
    }
    return url;
}

function preImg(sourceId, targetId) {
    var url = getFileUrl(sourceId);
    var imgPre = document.getElementById(targetId);
    imgPre.src = url;
}

/**
 * The story content that needs to be uploaded on the front page
 * is saved in the form of collection and stored in index using
 * storeImage
 */
function uploadindex(){
    console.log("Uploaded successfully");
    let formArray = $("form").serializeArray();
    var story={};
    for (let index in formArray){
        story[formArray[index].name] = formArray[index].value;
    }

    storeImage({title:story.title,author:story.author,intro:story.intro})
        .then(r =>console.log('Successful'))
        .catch();
    event.preventDefault();
}
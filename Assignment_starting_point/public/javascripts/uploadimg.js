const { default: axios } = require('axios');
const { get } = require('express/lib/response');

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
 upload in index
 */
function uploadindex(){
    console.log("生成报告123");
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
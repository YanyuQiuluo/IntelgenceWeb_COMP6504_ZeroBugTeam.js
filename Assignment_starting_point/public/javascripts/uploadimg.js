





// function uploadImage(input, target) {
//     if (typeof FileReader === 'undefined') {
//         alert('Your browser does not support FileReader.');
//         return;
//     }

//     var reader = new FileReader();

//     reader.onload = function(e) {
//         var img = document.getElementById(target);
//         img.src = this.result;
//     }

//     reader.readAsDataURL(document.getElementById(input).files[0]);
// }



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

function sendAxiosQuery(url, data) {
    axios.post(url, JSON.stringify(data),{headers:{"Content-Type": "application/json"}})
        .then (function (dataR) {
            alert ('success: ',JSON.stringify(dataR));
        })
        .catch( function (response) {
            alert (response.toJSON());
        })
}

function uploadreport(){
    console.log("生成报告123");
    const report = {title:document.getElementById('title').value,
        name:document.getElementById('name').value,
        intro:document.getElementById('intro').value,
        imgOne:document.getElementById('imgOne').value};
    console.log(report);


    axios.post('/uploadimg/upimage', report)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}


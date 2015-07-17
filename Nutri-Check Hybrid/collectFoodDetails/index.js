'use strict';

app.collectFoodDetails = kendo.observable({
    onShow: function () {
        
    }
});

    var xmlhttp = new XMLHttpRequest();
    var xmlhttp2 = new XMLHttpRequest();

app.search = function () {



    //var url = "https://api.nutritionix.com/v1_1/search/burger?results=0%3A5&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=63bf4be1&appKey=0a46e4d09a00eeb6d90909be80d96efa";
    var url = "https://api.nutritionix.com/v1_1/search/";


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }



    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-type", "application/json");
    xmlhttp.send('{"appId":"63bf4be1", "appKey":"0a46e4d09a00eeb6d90909be80d96efa", "query":"burger"}');

    function myFunction(response) {
        var arr = JSON.parse(response);
        console.log(arr);
        var i;
        var out = "<table>";

        out += "<tr><td>" +
            arr.hits[0].fields.item_name +
            "</td><td><a href='#' onClick='app.getItem()'>view </a></td></tr>";

        out += "</table>";

        document.getElementById("id01").innerHTML = out;
        app.getItem(arr.hits[0]._id);
    }

}



app.getItem = function (id) {
    var itemurl = 'https://api.nutritionix.com/v1_1/item?id=' + id + '&appId=63bf4be1&appKey=788b687f98ce2720e2fc7583c88d5d52';

    xmlhttp2.open("GET", itemurl, true);
    xmlhttp2.send();

}


xmlhttp2.onreadystatechange = function () {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {
        myFunction2(xmlhttp2.responseText);
    }
}

function myFunction2(response) {
    var arr2 = JSON.parse(response);
    console.log("got this object "+arr2);
    var i;
    var out = "<table>";

    out += "<tr><td>" +
        arr2.item_name +
        "</td><td>" +
        arr2.nf_calories +
        "</td></tr>";

    out += "</table>";
    document.getElementById("id03").innerHTML = out;
}



(function (parent) {
    var collectFoodDetailsModel = kendo.observable({
        fields: {
            quantity: '',
            foodItem: '',
            height: '',
            weight: '',
        },
        submit: function () {
            app.search();
        },
        cancel: function () {}
    });

    parent.set('collectFoodDetailsModel', collectFoodDetailsModel);
})(app.collectFoodDetails);
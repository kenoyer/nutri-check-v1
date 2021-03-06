'use strict';

app.collectFoodDetails = kendo.observable({
    onShow: function () {

    }
});

var xmlhttp = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();

app.search = function (query) {

    var url = 'https://api.nutritionix.com/v1_1/search/' + query + '?results=0%3A5&cal_min=0&cal_max=50000&fields=item_name%2Cbrand_name%2Citem_id%2Cbrand_id&appId=63bf4be1&appKey=0a46e4d09a00eeb6d90909be80d96efa';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }



    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    function myFunction(response) {
        var arr = JSON.parse(response);
        console.log(arr);
        var i;
        var out = "<table>";

        out += "<tr><td>" +
            arr.hits[0].fields.item_name +
            "</td><td><a href='#' onClick='app.getItem()'>view </a></td></tr>";

        out += "</table>";

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

var calo = '';
var foodName = '';

function myFunction2(response) {
    var arr2 = JSON.parse(response);
    console.log("got this object " + arr2);
    var i;
    foodName = arr2.item_name;
    calo = arr2.nf_calories;
    var out = "<li><label>You consumed " + foodName + " containing " + calo + " Calories</label></li>";
    document.getElementById("cal").innerHTML = out;
}

var bmi = '';

function getBMI(height, weight) {
    var h = height;
    var hm2 = Math.pow(h, 2);
    bmi = weight / hm2;
    bmi = bmi.toFixed(1);
    //var out = "<li><label>Your Body Mass Index (BMI) is " + bmi + "</label></li>";
    //document.getElementById("report").innerHTML = out;
}


(function (parent) {
    var collectFoodDetailsModel = kendo.observable({
        fields: {
            exerciseLevel: '',
            quantity: '',
            foodItem: '',
            height: '',
            weight: '',
        },
        submit: function () {
            var query = document.getElementById("foodItem").value;
            var weight = document.getElementById("weight").value;
            var height = document.getElementById("height").value;
            var exerciseLevel = document.getElementById("exerciseLevel").value;
            getBMI(height, weight);
            app.search(query);
            app.get_report(weight, height, exerciseLevel, calo);

        },
        cancel: function () {}
    });

    parent.set('collectFoodDetailsModel', collectFoodDetailsModel);
})(app.collectFoodDetails);
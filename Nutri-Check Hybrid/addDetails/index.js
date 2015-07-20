'use strict';

app.addDetails = kendo.observable({
    onShow: function () {

        //window.display();
        app.fillForm();


    }
});


(function (parent) {
    var addDetailsModel = kendo.observable({
        fields: {
            address: '',
            gptel: '',
            gpname: '',
            group: '',
            tel: '',
            sex: '',
            age: '',
            name: '',
        },
        submit: function () {
            console.log(document.getElementById("name").value);
            var name = document.getElementById("name").value;
            var age = document.getElementById("age").value;
            var sex = document.getElementById("sex").value;
            var tel = document.getElementById("tel").value;
            var address = document.getElementById("address").value;
            var gpname = document.getElementById("gpname").value;
            var gptel = document.getElementById("gptel").value;

            //app.createTable();
            app.insert(name, age, sex, tel, address, gpname, gptel);
            app.mobileApp.navigate('collectFoodDetails/view.html');
        },
        cancel: function () {}
    });

    parent.set('addDetailsModel', addDetailsModel);
})(app.addDetails);
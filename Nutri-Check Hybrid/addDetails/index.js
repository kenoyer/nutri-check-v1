'use strict';

app.addDetails = kendo.observable({
    onShow: function() {}
});
(function(parent) {
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
        submit: function() {},
        cancel: function() {}
    });

    parent.set('addDetailsModel', addDetailsModel);
})(app.addDetails);
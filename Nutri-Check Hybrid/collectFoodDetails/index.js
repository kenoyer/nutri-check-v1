'use strict';

app.collectFoodDetails = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var collectFoodDetailsModel = kendo.observable({
        fields: {
            quantity: '',
            foodItem: '',
            height: '',
            weight: '',
        },
        submit: function() {},
        cancel: function() {}
    });

    parent.set('collectFoodDetailsModel', collectFoodDetailsModel);
})(app.collectFoodDetails);
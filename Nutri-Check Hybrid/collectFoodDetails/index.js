'use strict';

app.collectFoodDetails = kendo.observable({
    onShow: function() {}
});
(function(parent) {
    var collectFoodDetailsModel = kendo.observable({
        fields: {
            exerciseLevel: '',
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
//'use strict';

app.home = kendo.observable({
    onShow: function () {

    }
});


        app.sendSms = function () {
            var number = document.getElementById('numberTxt').value;
            var message = document.getElementById('messageTxt').value;
            alert(number);
            alert(message);

            //CONFIGURATION
            var options = {
                android: {
                    intent: '' // send SMS with the native android SMS messaging
                        //intent: '' // send SMS without open any other app
                }
            };

            var success = function () {
                alert('Message sent successfully');
            };
            var error = function (e) {
                alert('Message Failed:' + e);
            };
            sms.send(number, message, options, success, error);
        }
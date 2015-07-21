'use strict';


app.viewDetails = kendo.observable({
    onShow: function () {

        //if table already exist then entry exist 
        //app.db = null;




        var db = app.db;
        if (app.checkOpenedDatabase()) {
            tableExists();
        } else {
            console.log("no open db");

        }


    }


});


function tableExists() {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql(
            "SELECT name FROM sqlite_master WHERE name = 'details' and type= 'table'", [],
            function (tx, res) {
                var dataLength = res.rows.length;
                console.log(dataLength);
                if (dataLength > 0) {

                    console.log("table exists");
                    app.readRecords();
                    console.log("read records");
                } else {
                    console.log("No no table found");
                    window.app.mobileApp.navigate('addDetails/view.html');
                }
            },
            function (tx, res) {
                console.log("some error retrieving data");
            }
        );
    });
}

function dropTable() {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql(
            'DROP TABLE details', [],
            function (tx, res) {
                alert('Table deleted');
            },
            // note: gets called when deleting table without having inserted rows,
            //       to avoid this error use: 'DROP TABLE IF EXISTS test'
            function (tx, res) {
                alert('error: ' + res.message);
            }
        );
    });
}


app.createTable = function () {
    var db = app.db;
    //db.openDb();
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS details(ID INTEGER PRIMARY KEY ASC, name TEXT, age TEXT, sex TEXT, tel TEXT, address TEXT, gpname TEXT, gptel TEXT)", [],
            app.onSuccess,
            app.onError);
    });
};

app.insert = function (name, age, sex, tel, address, gpname, gptel) {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS details(ID INTEGER PRIMARY KEY ASC, name TEXT, age TEXT, sex TEXT, tel TEXT, address TEXT, gpname TEXT, gptel TEXT)", []);
        tx.executeSql("INSERT INTO 'details'(name, age, sex, tel, address, gpname, gptel) VALUES (?,?,?,?,?,?,?)", [name, age, sex, tel, address, gpname, gptel],
            app.onSuccess,
            app.onError);
    });
};


var output;
app.readRecords = function () {

        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM 'details'", [],
                function (tx, res) {
                    for (var i = 0; i < res.rows.length; i++) {
                        var row = res.rows.item(i);
                        output = '<li><label>Name:</label><span>' + row.name + '</span></li><li><label> Age: </label><span>' + row.age + '</span> </li> <li> <label> Sex: </label><span>' + row.sex + '</span> </li> <li> <label> tel: </label><span>' + row.tel + '</span> </li> <li> <label> address: </label><span>' + row.address + '</span> </li> <li> <label> Doctor / Nurse: </label><span>' + row.gpname + '</span> </li> <li> <label> Tel: </label><span>' + row.gptel + '</span> </li>';
                    }

                    document.getElementById("listDetails").innerHTML = output;
                    return true;
                },
                function (tx, res) {
                    alert('error: ' + res.message);
                    return false;
                });
        });
    },

    app.get_report = function (we, he, el, calo) {
        var w = we;
        var h = he * 100;
        var el = el;
        var cal = calo;
        var ideal_cal;
        var BMR;

        var gptel;
        var gpname;
        var sex;
        var user_name;
        var age;
        var sms_msg = '';
        //var gptel
        var db = app.db;
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM 'details'", [],
                function (tx, res) {
                    for (var i = 0; i < res.rows.length; i++) {
                        var row = res.rows.item(i);
                        gptel = row.gptel;
                        gpname = row.gpname;
                        sex = row.sex;
                        user_name = row.name;
                        age = row.age;
                    }

                    if (sex == 'male') {
                        BMR = (10 * w + 6.25 * h - 5 * age + 5) * el;
                        ideal_cal = BMR / 3;
                        if (cal <= ideal_cal) {
                            console.log("It's okay to eat this but remember your daily cal need (BMR) is " + BMR);
                            alert("It's okay to eat this but remember your daily cal need (BMR) is " + BMR);
                        } else
                        if (cal > ideal_cal && cal < BMR) {
                            alert("You've had a bit more than you should be having at a go");
                            console.log("You've had a bit more than you should be having at a go");
                        } else
                        if (cal > BMR) {
                            sms_msg = 'Hello Dr. ' + gpname + ', ' + user_name + ' has just consumed an alarming ' + cal + 'Cal. Their BMR is ' + BMR + '| Ideal Cal is ' + ideal_cal + '.';
                            app.smsDr(gptel, sms_msg);
                            console.log(sms_msg);
                        }
                        console.log("BMR is " + BMR + " | Ideal Cal is " + ideal_cal + " | You consumed " + cal + "Cal");
                    } else
                    if (sex == 'female') {
                        BMR = (10 * w + 6.25 * h - 5 * age - 161) * el;
                        ideal_cal = BMR / 3;
                       if (cal <= ideal_cal) {
                            console.log("It's okay to eat this but remember your daily cal need (BMR) is " + BMR);
                            alert("It's okay to eat this but remember your daily cal need (BMR) is " + BMR);
                        } else
                        if (cal > ideal_cal && cal < BMR) {
                            alert("You've had a bit more than you should be having at a go");
                            console.log("You've had a bit more than you should be having at a go");
                        } else
                        if (cal > BMR) {
                            sms_msg = 'Hello Dr. ' + gpname + ', ' + user_name + ' has just consumed an alarming ' + cal + 'Cal. Their BMR is ' + BMR + ' and ideal calorie per meal is ' + ideal_cal + '.';
                            app.smsDr(gptel, sms_msg);
                            console.log(sms_msg);
                        }
                        console.log("BMR is " + BMR + " | Ideal Cal is " + ideal_cal + " | You consumed " + cal + "Cal");

                    }
                    //document.getElementById("listDetails").innerHTML = output;
                },

                function (tx, res) {
                    console.log('no gptel retrieved error: ');
                    //return false;
                });
        });

    }


app.smsDr = function (gptel, msg) {
    var number = gptel;
    var message = msg;
    alert("Sending message to your Doctor on " + number);
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

app.checkOpenedDatabase = function () {
    if (app.db == null) {
        // wrapping in a timeout so the button doesn't stay in 'pressed' state
        setTimeout(function () {
            alert("open the database first");
        });
        return false;
    }

    return true;
}

app.fillForm = function () {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM 'details'", [],
            function (tx, res) {
                for (var i = 0; i < res.rows.length; i++) {
                    var row = res.rows.item(i);
                    var name = row.name;
                    var age = row.age;
                    var sex = row.sex;
                    var tel = row.tel;
                    var address = row.address;
                    var gpname = row.gpname;
                    var gptel = row.gptel;
                }
                document.getElementById("name").value = name;
                document.getElementById("age").value = age;
                document.getElementById("sex").value = sex;
                document.getElementById("tel").value = tel;
                document.getElementById("address").value = address;
                document.getElementById("gpname").value = gpname;
                document.getElementById("gptel").value = gptel;

            },
            function (tx, res) {
                console.log('No details to fill form with. Error msg: ' + res.message);
            });
    });
}

app.onError = function (tx, e) {
    console.log("Error: " + e.message);
}

app.onSuccess = function (tx, r) {
    console.log("onSuccess");
}
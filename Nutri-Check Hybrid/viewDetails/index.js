'use strict';


app.viewDetails = kendo.observable({
    onShow: function () {

        //if table already exist then entry exist 
        //app.db = null;




        var db = app.db;
        if (app.checkOpenedDatabase()) {
            app.tableExists();
        } else {
            console.log("no open db");

        }


    }


});


var exists = "false";

app.tableExists = function () {
    var db = app.db;
    db.transaction(function (tx) {
        tx.executeSql(
            "SELECT name FROM sqlite_master WHERE name = 'details' and type= 'table'", [],
            function (tx, res) {
                var dataLength = res.rows.length;
                console.log(dataLength);
                if (dataLength > 0) {

                    console.log("table exists:" + exists);
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
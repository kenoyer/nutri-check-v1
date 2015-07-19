'use strict';


app.viewDetails = kendo.observable({
    onShow: function () {

        //if table already exist then entry exist 
        //app.db = null;




        var db = app.db;
        if (app.checkOpenedDatabase()) {
            var exists = app.tableExists();
            if (exists == true) {
                console.log("table exists:" + exists);
                app.readRecords();
                console.log("read records");
            } else {
                //console.log("table exists:" + app.tableExists);
                window.app.mobileApp.navigate('addDetails/view.html');
            }
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
                "SELECT * FROM sqlite_master WHERE name = 'details' and type= 'table'", [],
                function (tx, res) {
                    console.log("table found in db");
                    exists = "true";
                    return exists;
                },
                function (tx, res) {
                    console.log("table NOT found in db");
                    exists = "false";
                    return exists;
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

app.onError = function (tx, e) {
    console.log("Error: " + e.message);
}

app.onSuccess = function (tx, r) {
    console.log("onSuccess");
}

